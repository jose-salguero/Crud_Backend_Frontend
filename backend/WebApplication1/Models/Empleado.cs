using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1.Models
{
    public class Empleado
    {
        public int EmpleadoId { get; set; }
        public string EmpleadoNombre { get; set; }
        public string Departamento { get; set; }
        public string DiaDeIngreso { get; set; }
        public string FotoDePerfil { get; set; }

    }
}
