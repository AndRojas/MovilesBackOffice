import React, { Component } from 'react';

import firebase from 'firebase';
import './estiloRestaurante.css';
import Modal from 'react-modal';
import * as database from "../BD/funciones";

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '10%',
        bottom                : 'auto',
        height                : '500px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto'
    }
};


class Restaurante extends Component {
    
    constructor(){
        super();
        this.state = {
            modalIsOpenH:false,
            modalIsOpen:false,
            horarios: [],
            comentarios : [],
            calificacion : 0,
            calificaciones : [],
            nombre:'',
            ubicacion:'',
            contacto:'',
            tipoComida:'',
            precios:'',
            //Horario
            domingo:'',
            lunes:'',
            marte:'',
            miercoles:'',
            jueves:'',
            viernes:'',
            sabado:''
            
        }
         this.cargarHorarios = this.cargarHorarios.bind(this);
         this.cargarComentarios = this.cargarComentarios.bind(this);
         this.cargaCalificacion = this.cargaCalificacion.bind(this);
         this.cargaDatos = this.cargaDatos.bind(this);
         this.eliminarRestaurante = this.eliminarRestaurante.bind(this);
         this.openModal = this.openModal.bind(this);
         this.closeModal = this.closeModal.bind(this);
         this.openModalHorario = this.openModalHorario.bind(this);
         this.closeModalHorario = this.closeModalHorario.bind(this);
         this.setField = this.setField.bind(this);
         this.editarRestaurante = this.editarRestaurante.bind(this);
    }
    
    componentDidMount(){
        this.cargarHorarios();
        this.cargarComentarios();
        this.cargaCalificacion();
        this.cargaDatos();
    }
    
    cargaDatos(){
        let nombre= this.props.nombre;
        let ubicacion= this.props.ubicacion;
        let contacto= this.props.contacto;
        let tipoComida= this.props.tipoComida;
        let precios= this.props.precios;
        
        this.setState({ nombre:nombre,
                        ubicacion:ubicacion,
                        contacto:contacto,
                        tipoComida:tipoComida,
                        precios:precios});
        
        
    }
    
    openModal() {
        this.setState({modalIsOpen: true});
    }

    /**
     * Cierra la ventana.
     */
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    
    openModalHorario() {
        this.setState({modalIsOpenH: true});
    }

    /**
     * Cierra la ventana.
     */
    closeModalHorario() {
        this.setState({modalIsOpenH: false});
    }
    
    setField (e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    

    editarRestaurante() {
        if (this.state.correo === "") { // Si es vacio no agrega nada
            alert("No hay nombre especificado...");
        } else { 
            if (!database.insert_usuario(this.state.nombre,this.state.nick,this.state.correo,this.state.telefono,this.state.contraseña)) {
                this.closeModal();
                alert("Editado con exito...")
                
            
            } else { // No se inserto el restaurante en la BD
                alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
            }
        }
        
        
    }
    
    
    eliminarRestaurante() {
        if (!database.delete_restaurante(this.state.nombre)) {
            alert("Eliminado con exito...")


        } else { // No se inserto el restaurante en la BD
            alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
        }
        
    }

    cargarHorarios(){
        let horarios = this.props.horarios;
        let todosHorarios = [];
        console.log(horarios);
        for(let k in horarios){
            todosHorarios.push(
                <div className="caja">
                    <h4>
                        {horarios[k].dia}
                    </h4>
                    <h5>
                        {horarios[k].horario}
                    </h5>
                </div>
            )
            
            if(horarios[k].dia === "Domingo"){
                
                let horario = horarios[k].horario;
                this.setState({
                    domingo: horario
                }); 
            }
            else if(horarios[k].dia === "Lunes"){
                let horario = horarios[k].horario;
                this.setState({
                    lunes: horario
                }); 
            }
            else if(horarios[k].dia === "Martes"){
                let horario = horarios[k].horario;
                this.setState({
                    martes: horario
                }); 
            }
            else if(horarios[k].dia === "Miercoles"){
                let horario = horarios[k].horario;
                this.setState({
                    miercoles: horario
                }); 
            }
            if(horarios[k].dia === "Jueves"){
                let horario = horarios[k].horario;
                this.setState({
                    jueves: horario
                }); 
            }
            else if(horarios[k].dia === "Viernes"){
                let horario = horarios[k].horario;
                this.setState({
                    viernes: horario
                }); 
            }
            else if(horarios[k].dia === "Sabado"){
                let horario = horarios[k].horario;
                this.setState({
                    sabado: horario
                }); 
            }
            
        }
        this.setState({
            horarios: todosHorarios
        });   
    }
    
    cargarComentarios(){
        let comentarios = this.props.comentarios;
        let todosComentarios = [];
        
        for(let k in comentarios){
            todosComentarios.push(
                <div>
                    <h4>
                        {comentarios[k].nombre}
                    </h4>
                    <h5>
                        {comentarios[k].comenta}
                    </h5>
                    
                    <br></br>
                    
                </div>
            )
        }
        this.setState({
            comentarios: todosComentarios
        });   
    }
    
    cargaCalificacion(){
        let calificaciones = this.props.calificaciones;
        let laCalificacion = 0;
        let cantidad = 0
        for(let k in calificaciones){
            laCalificacion = laCalificacion + calificaciones[k].califica
            cantidad = cantidad + 1
            
        }
        
        laCalificacion = laCalificacion/cantidad
        this.setState({
            calificacion: laCalificacion
        });   
    }
    
    
    
  render() {
    return (
        <div>
            <div className="caja">
                
                <h2>
                    {this.state.nombre}
                </h2>
                    
            </div>
            <div>
                <button onClick={this.openModal} className="botonEdit">Editar</button>
                <button onClick={this.eliminarRestaurante} className="botonDelete">Eliminar</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            
            <div>
                <div>
                    <h3>Calificacion:</h3>
                    <h4>
                        {this.state.calificacion}
                    </h4>
                </div>
                <div>
                    <h3>Contacto:</h3>
                    <h4>
                        {this.state.contacto}
                    </h4>

                </div>
                <div>
                    <h3>Comentarios:</h3>
                    {this.state.comentarios}
            
                </div>
                <div>
                    <h3>Ubicacion GPS:</h3>
                    <h4>
                        {this.state.ubicacion}
                    </h4>

                </div>
                <div>
                    <h3>Horarios</h3>
                    {this.state.horarios}
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div>
                    <h3>Tipo de Comida</h3>
                    <h4>
                        {this.state.tipoComida}
                    </h4>
                </div>
                <div>
                    <h3>Precios:</h3>
                    <h4>
                        {this.state.precios}
                    </h4>

                </div>
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}>

                  <div>
                    
                    <div className = "principalAdd">
                        <h3  className="navlink">Nombre de Restaurante: </h3><input className="input_text_a" type="text" name="nombre" value={this.state.nombre} onChange={(e)=>this.setField(e)}/>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Horario: </h3>
                        
                        <button
                            id="navigationButton"
                            className="btn btn-primary"
                            data-tip data-for='btn-tooltip-Si'
                            onClick={this.openModalHorario}
                        >
                            Cambiar Horario
                        </button>
                        
                        <Modal
                              isOpen={this.state.modalIsOpenH}
                              onRequestClose={this.closeModalHorario}
                              style={customStyles}>
                            
                            <div>
                                <h2>
                                    Ingrese el Horario del Restaurante
                                </h2>
                                <div>
                                    <h3 className="navlink">Domingo: </h3><input className="input_text_a" type="text" value={this.state.domingo} name="domingo" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Lunes: </h3><input className="input_text_a" type="text" name="lunes" value={this.state.lunes} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Martes: </h3><input className="input_text_a" type="text" name="martes" value={this.state.martes} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Miercoles: </h3><input className="input_text_a" type="text" name="miercoles" value={this.state.miercoles} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Jueves: </h3><input className="input_text_a" type="text" name="jueves" value={this.state.jueves} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Viernes: </h3><input className="input_text_a" type="text" name="viernes" value={this.state.viernes} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Sabado: </h3><input className="input_text_a" type="text" name="sabado" value={this.state.sabado} onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                <div>
                                    <button size = "lg" type="button" class="btn btn-success" onClick={this.closeModalHorario}>Agregar</button>
                                </div>
                                
                                
                            </div>
                        </Modal>
                        <br></br>
                    </div>
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Contacto: </h3><input className="input_text_a" type="password" name="contacto" value={this.state.contacto} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Ubicacion: </h3><input className="input_text_a" type="text" name="ubicacion" value={this.state.ubicacion} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Tipo de Comida: </h3><input className="input_text_a" type="text" name="tipoComida" value={this.state.tipoComida} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Precios: </h3><input className="input_text_a" type="text" name="precios" value={this.state.precios} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    
                    <div>
                        <button size = "lg" type="button" class="btn btn-success" onClick={this.editarRestaurante}>Editar</button>
                    </div>


                </div>

              </Modal>
                
            </div>
                            
            <br></br>
            <br></br>
        </div>
      
    );
  }
}

export default Restaurante;
