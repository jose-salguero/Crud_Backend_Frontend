import React,{Component} from "react";
import { variables } from "./Variables.js";

export class Empleado extends Component{

constructor(props){
    super(props);

    this.state={
        departamentos:[],
        empleados:[],
        modalTitle:"",
        EmpleadoNombre:"",
        EmpleadoId:0,
        Departamento:"",
        DiaDeIngreso:"",
        FotoDePerfil:"toy.jpg",
        FotoPatch:variables.FOTO_URL
    }
}

    refreshList(){
        fetch(variables.API_URL+'Empleado')
        .then(response=>response.json())
        .then(data=>{
            this.setState({empleados:data});
        }); 

        fetch(variables.API_URL+'Departamento')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departamentos:data});
        }); 
    }

    componentDidMount(){
        this.refreshList();
    }


    changeEmpleadoNombre =(e)=>{
        this.setState({EmpleadoNombre:e.target.value});
    }

    changeDepartamentoNombre =(e)=>{
        this.setState({DepartamentoNombre:e.target.value});
    }

    changeDiaDeIngreso =(e)=>{
        this.setState({DiaDeIngreso:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Añadir empleado",
            EmpleadoId:0,
            EmpleadoNombre:"",
            Departamento:"",
            DiaDeIngreso:"",
            FotoDePerfil:"toy.jpg"
        });
    }

    editClick(emp){
        this.setState({
            modalTitle:"Editar empleado",
            EmpleadoId:emp.EmpleadoId,
            EmpleadoNombre:emp.EmpleadoNombre,
            Departamento:emp.Departamento,
            DiaDeIngreso:emp.DiaDeIngreso,
            FotoDePerfil:emp.FotoDePerfil
        });
    }

    createClick(){
        fetch(variables.API_URL+'Empleado',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmpleadoNombre:this.state.EmpleadoNombre,
                Departamento:this.state.Departamento,
                DiaDeIngreso:this.state.DiaDeIngreso,
                FotoDePerfil:this.state.FotoDePerfil
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallo');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Empleado',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmpleadoId:this.state.EmpleadoId,
                EmpleadoNombre:this.state.EmpleadoNombre,
                Departamento:this.state.Departamento,
                DiaDeIngreso:this.state.DiaDeIngreso,
                FotoDePerfil:this.state.FotoDePerfil
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallo');
        })
    }

    deleteClick(id){
        if(window.confirm('Esta seguro que quiere eliminar este elemento?')){
        fetch(variables.API_URL+'Empleado/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Fallo');
        })
    }
    }

    imageUpload=(e)=>{
        e.preventDefault();

        const formData=new FormData();
        formData.append("file",e.target.files[0],e.target.files[0].name);

        fetch(variables.API_URL+'Empleado/Fotos',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            this.setState({FotoDePerfil:data});
        })
    }
    render(){
        const{
            departamentos,
            empleados,
            modalTitle,
            EmpleadoId,
            EmpleadoNombre,
            Departamento,
            DiaDeIngreso,
            FotoPatch,
            FotoDePerfil
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-prymary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Añadir Empleado
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                EmpleadoId
                            </th>
                            <th>
                                EmpleadoNombre
                            </th>
                            <th>
                                Departamento
                            </th>
                            <th>
                                Doj
                            </th>
                            <th>
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map(emp=>
                            <tr key={emp.EmpleadoId}>
                                <td>{emp.EmpleadoId}</td>
                                <td>{emp.EmpleadoNombre}</td>
                                <td>{emp.Departamento}</td>
                                <td>{emp.DiaDeIngreso}</td>
                                <td>
                                <button type="button"
                                className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(emp)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                <button type="button"
                                className="btn btn-light mr-1"
                                onClick={()=>this.deleteClick(emp.EmpleadoId)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash2-fill" viewBox="0 0 16 16">
                                    <path d="M2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225zm9.89-.69C10.966 2.214 9.578 2 8 2c-1.58 0-2.968.215-3.926.534-.477.16-.795.327-.975.466.18.14.498.307.975.466C5.032 3.786 6.42 4 8 4s2.967-.215 3.926-.534c.477-.16.795-.327.975-.466-.18-.14-.498-.307-.975-.466z"/>
                                    </svg>
                                </button>
                                </td>
                            </tr>
                            )}
                    </tbody>
                </table>


<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
    <div className="modal-header">
            <h5 className="modal-title">{modalTitle}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">
            </button>
    </div>

<div className="modal-body">
    <div className="d-flex flex-row bd-highlight mb-3">

    <div className="p-2 w-50 bd-highlight">

    <div className="input-group mb-3">
        <span className="input-group-text">EmpleadoNombre</span>
        <input type="text" className="form-control"
        value={EmpleadoNombre}
        onChange={this.changeEmpleadoNombre}/>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">Departamento</span>
        <select className="form-select"
        onChange={this.changeDepartamentoNombre}
        value={Departamento}>
            {departamentos.map(dep=><option key={dep.DepartamentoId}>
                {dep.DepartamentoNombre}
                </option>)}
        </select>
    </div>
    <div className="input-group mb-3">
        <span className="input-group-text">Dia De Ingreso</span>
        <input type="date" className="form-control"
        value={DiaDeIngreso}
        onChange={this.changeDiaDeIngreso}/>
    </div>
</div>

<div className="p-2 w-50 bd-highlight">
    <img width="250px" height="250px"
    src={FotoPatch+FotoDePerfil}/>
    <input className="m-2" type="file" onChange={this.imageUpload}/>
</div>
{EmpleadoId==0?
    <button type="button"
    className="btn btn-primary float-start"
    onClick={()=>this.createClick()}
    >Create</button>
    :null}

    {EmpleadoId!==0?
    <button type="button"
    className="btn btn-primary float-start"
    onClick={()=>this.updateClick()}
    >Update</button>
    :null}
</div>

</div>

</div>

</div>
</div>


            </div>
        )
    }
}