import React, { Component } from 'react';
import Usuario from './Usuario';
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





class UsuariosRegistrados extends Component {
    
    
     constructor(){
        super();
        this.state = {
            modalIsOpen: false,
            usuarios : [],
            nombre:'',
            nick:'',
            correo:'',
            telefono:'',
            contraseña:''
        }
        
        this.cargarUsuarios = this.cargarUsuarios.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.agregarUsuario = this.agregarUsuario.bind(this);
    }
    
    componentDidMount(){
        this.cargarUsuarios();
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
    
    agregarUsuario() {
        if (this.state.correo === "") { // Si es vacio no agrega nada
            alert("No hay nombre especificado...");
        } else { 
            if (!database.insert_usuario(this.state.nombre,this.state.nick,this.state.correo,this.state.telefono,this.state.contraseña)) {
                this.closeModal();
                alert("Agregado con exito...")
                this.setState({ nombre:'',
                                nick:'',
                                correo:'',
                                telefono:'',
                                contraseña:''});
            
            } else { // No se inserto el restaurante en la BD
                alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
            }
        }
        
        
    }
    
    
    cargarUsuarios(){
        database.get_all_usuarios().then(result => {
            let usuarios = result;
            let todosUsuarios = [];
            console.log(usuarios);
            for (let k in usuarios) {
                
                todosUsuarios.push(
                    
                    <Usuario
                        nombre={usuarios[k].nombre} 
                        nick={usuarios[k].nick} 
                        correo={usuarios[k].correo}
                        telefono={usuarios[k].telefono}
                        contraseña={usuarios[k].contraseña}
                                
                    />
                )
                
            }

            this.setState({
                usuarios: todosUsuarios
            });
        });
    }
    
    
  render() {
     
    return (

        <div className="App" >
            

            <div className="">
                <button
                    id="navigationButton"
                    className="btn btn-primary"
                    data-tip data-for='btn-tooltip-Si'
                    onClick={this.openModal}
                >
                    Agregar Usuario
                </button>
                
                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}>

                  <div>
                    
                    <div className = "principalAdd">
                        <h3  className="navlink">Nombre Usuario: </h3><input className="input_text_a" type="text" name="nombre" onChange={(e)=>this.setField(e)}/>
                    </div>
                    
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">NickName: </h3><input className="input_text_a" type="text" name="nick" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Contraseña: </h3><input className="input_text_a" type="text" name="contraseña" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Telefono: </h3><input className="input_text_a" type="text" name="telefono" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Correo: </h3><input className="input_text_a" type="text" name="correo" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    
                    <div>
                        <button size = "lg" type="button" class="btn btn-success" onClick={this.agregarUsuario}>Agregar</button>
                    </div>


                </div>

              </Modal>

                <div align="left">
                    {this.state.usuarios}
                </div>


            </div>
          </div>
    );
  }
}

export default UsuariosRegistrados;

        