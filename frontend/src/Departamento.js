import React,{Component} from "react";
import { variables } from "./Variables.js";

export class Departamento extends Component{

constructor(props){
    super(props);

    this.state={
        departamentos:[],
        modalTitle:"",
        DepartamentoNombre:"",
        DepartamentoId:0
    }
}

    refreshList(){
        fetch(variables.API_URL+'Departamento')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departamentos:data});
        }); 
    }

    componentDidMount(){
        this.refreshList();
    }


    changeDepartamentoNombre =(e)=>{
        this.setState({DepartamentoNombre:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Añadir departamento",
            DepartamentoId:0,
            DepartamentoNombre:""
        });
    }

    editClick(dep){
        this.setState({
            modalTitle:"Editar departamento",
            DepartamentoId:dep.DepartamentoId,
            DepartamentoNombre:dep.DepartamentoNombre
        });
    }

    createClick(dep){
        fetch(variables.API_URL+'Departamento',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartamentoNombre:this.state.DepartamentoNombre
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

    updateClick(dep){
        fetch(variables.API_URL+'Departamento',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                DepartamentoId:this.state.DepartamentoId,
                DepartamentoNombre:this.state.DepartamentoNombre
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
        fetch(variables.API_URL+'Departamento/'+id,{
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


    render(){
        const{
            departamentos,
            modalTitle,
            DepartamentoId,
            DepartamentoNombre
        }=this.state;

        return(
            <div>
                <button type="button"
                className="btn btn-prymary m-2 float-end"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Añadir Departamento
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                DepartamentoId
                            </th>
                            <th>
                                DepartamentoNombre
                            </th>
                            <th>
                                Opciones
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {departamentos.map(dep=>
                            <tr key={dep.DepartamentoId}>
                                <td>{dep.DepartamentoId}</td>
                                <td>{dep.DepartamentoNombre}</td>
                                <td>
                                <button type="button"
                                className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(dep)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                    </svg>
                                </button>

                                <button type="button"
                                className="btn btn-light mr-1"
                                onClick={()=>this.deleteClick(dep.DepartamentoId)}>
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
    <div className="input-group mb-3">
    <span className="input-group-text">DepartamentoNombre</span>
    <input type="text" className="form-control"
    value={DepartamentoNombre}
    onChange={this.changeDepartamentoNombre}/>
    </div>

    {DepartamentoId==0?
    <button type="button"
    className="btn btn-primary float-start"
    onClick={()=>this.createClick()}
    >Create</button>
    :null}

    {DepartamentoId!==0?
    <button type="button"
    className="btn btn-primary float-start"
    onClick={()=>this.updateClick()}
    >Update</button>
    :null}

</div>

</div>

</div>"
</div>


            </div>
        )
    }
}