using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.Extensions.FileProviders;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmpleadoController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        public EmpleadoController(IConfiguration configuration, IWebHostEnvironment env)
        {
            _configuration = configuration;
            _env = env;

        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        select EmpleadoId, EmpleadoNombre,Departamento,convert(varchar(10),DiaDeIngreso,120) as DiaDeIngreso, FotoDePerfil from
                        dbo.Empleado
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult(table);
        }

        [HttpPost]
        public JsonResult Post(Empleado emp)
        {
            string query = @"
                        insert into dbo.Empleado
                        (EmpleadoNombre,Departamento,DiaDeIngreso,FotoDePerfil)
                        values(@EmpleadoNombre,@Departamento,@DiaDeIngreso,@FotoDePerfil)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using SqlCommand myCommand = new SqlCommand(query, myCon);
                myCommand.Parameters.AddWithValue("@EmpleadoNombre", emp.EmpleadoNombre);
                myCommand.Parameters.AddWithValue("@Departamento", emp.Departamento);
                myCommand.Parameters.AddWithValue("@DiaDeIngreso", emp.DiaDeIngreso);
                myCommand.Parameters.AddWithValue("@FotoDePerfil", emp.FotoDePerfil);
                myReader = myCommand.ExecuteReader();
                table.Load(myReader);
                myReader.Close();
                myCon.Close();
            }

            return new JsonResult("Registro Exitoso");
        }

        [HttpPut]
        public JsonResult Put(Empleado emp)
        {
            string query = @"
                        update dbo.Empleado
                        set EmpleadoNombre= @EmpleadoNombre,
                        Departamento=@Departamento,
                        DiaDeIngreso=@DiaDeIngreso,
                        FotoDePerfil=@FotoDePerfil
                        where EmpleadoId=@EmpleadoId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmpleadoId", emp.EmpleadoId);
                    myCommand.Parameters.AddWithValue("@EmpleadoNombre", emp.EmpleadoNombre);
                    myCommand.Parameters.AddWithValue("@Departamento", emp.Departamento);
                    myCommand.Parameters.AddWithValue("@DiaDeIngreso", emp.DiaDeIngreso);
                    myCommand.Parameters.AddWithValue("@FotoDePerfil", emp.FotoDePerfil);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Modificacion exitosa");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @"
                        delete from dbo.Empleado
                        where EmpleadoId=@EmpleadoId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@EmpleadoId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Eliminacion Exitosa");
        }

        [Route("SaveFile")]
        [HttpPost]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var PostedFile = httpRequest.Files[0];
                string filename = PostedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Fotos/" + filename;

                using (var stream=new FileStream(physicalPath, FileMode.Create))
                {
                    PostedFile.CopyTo(stream);

                }
                return new JsonResult(filename);
            }
            catch(Exception)
            {
                return new JsonResult("toy.jpg");
            }
        }

    }
}
