import React, { Component } from 'react';

import './usuariosCSS.css';
import firebase from 'firebase';
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
            nombre: '',
            nick : '',
            telefono : 0,
            correo : '',
            contraseña:''
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.editarUsuario = this.editarUsuario.bind(this);
        this.eliminarUsuario = this.eliminarUsuario.bind(this);
    }
    
    
    componentDidMount(){
        this.cargaDatos();
    }

    cargaDatos(){
        let nombre= this.props.nombre;
        let nick= this.props.nick;
        let correo= this.props.correo;
        let telefono= this.props.telefono;
        let contraseña= this.props.contraseña;
        
        this.setState({ nombre:nombre,
                        nick:nick,
                        correo:correo,
                        telefono:telefono,
                        contraseña:contraseña});
        
        
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
    
    setField (e) {
        this.setState({[e.target.name]: e.target.value});
    }
    
    

    editarUsuario() {
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
    
    
    eliminarUsuario() {
        if (!database.delete_usuario(this.state.nick)) {
            alert("Eliminado con exito...")


        } else { // No se inserto el restaurante en la BD
            alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
        }
        
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
                <button onClick={this.eliminarUsuario} className="botonDelete">Eliminar</button>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div>
                <div>
                    <h3>NickName:</h3>
                    <h4>
                        {this.state.nick}
                    </h4>
                </div>
                <div>
                    <h3>Correo:</h3>
                    <h4>
                        {this.state.correo}
                    </h4>

                </div>
                <div>
                    <h3>Telefono:</h3>
                    <h4>
                        {this.state.telefono}                    
                    </h4>
            
                </div>
                
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}>

                  <div>
                    
                    <div className = "principalAdd">
                        <h3  className="navlink">Nombre Usuario: </h3><input className="input_text_a" type="text" name="nombre" value={this.state.nombre} onChange={(e)=>this.setField(e)}/>
                    </div>
                    
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Contraseña: </h3><input className="input_text_a" type="password" name="contraseña" value={this.state.contraseña} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Telefono: </h3><input className="input_text_a" type="text" name="telefono" value={this.state.telefono} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Correo: </h3><input className="input_text_a" type="text" name="correo" value={this.state.correo} onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    
                    <div>
                        <button size = "lg" type="button" class="btn btn-success" onClick={this.editarUsuario}>Editar</button>
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
