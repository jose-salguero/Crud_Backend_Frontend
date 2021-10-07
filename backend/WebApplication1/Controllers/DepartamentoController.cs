using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using WebApplication1.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartamentoController : ControllerBase
    {

        private readonly IConfiguration _configuration;
        public DepartamentoController(IConfiguration configuration)
        {
            _configuration = configuration;

        }


        [HttpGet]
        public JsonResult Get()
        {
            string query = @"
                        select DepartamentoId, DepartamentoNombre from
                        dbo.Departamento
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using(SqlConnection myCon=new SqlConnection(sqlDataSource))
            {
                myCon.Open();
                using(SqlCommand myCommand=new SqlCommand(query, myCon))
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
        public JsonResult Post(Departamento dep)
        {
            string query = @"
                        insert into dbo.Departamento
                        values(@DepartamentoNombre)
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                
                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentoNombre", dep.DepartamentoNombre);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Registro Exitoso");
        }

        [HttpPut]
        public JsonResult Put(Departamento dep)
        {
            string query = @"
                        update dbo.Departamento
                        set DepartamentoNombre= @DepartamentoNombre
                        where DepartamentoId=@DepartamentoId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentoId", dep.DepartamentoId);
                    myCommand.Parameters.AddWithValue("@DepartamentoNombre", dep.DepartamentoNombre);
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
                        delete from dbo.Departamento
                        where DepartamentoId=@DepartamentoId
            ";

            DataTable table = new DataTable();
            string sqlDataSource = _configuration.GetConnectionString("EmpleadoAppCon"); ;
            SqlDataReader myReader;
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {

                myCon.Open();
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCommand.Parameters.AddWithValue("@DepartamentoId", id);
                    myReader = myCommand.ExecuteReader();
                    table.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }

            return new JsonResult("Eliminacion Exitosa");
        }
    }
}
