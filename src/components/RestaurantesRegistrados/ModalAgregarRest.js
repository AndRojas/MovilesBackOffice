
import React, { Component } from 'react';
import Modal from 'react-modal';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        height                : '500px',
        transform             : 'translate(-50%, -50%)',
        overflow              : 'auto'
    }
};

export default class ModalAgregarRest extends Component{
    constructor(props) {
        super(props);
        this.state = {
            nombre:'',
            contacto:'',
            ubicacion:'',
            Horario:'',
            tipoComida:'',
            precios:''
        
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    /**
     * Muestra la ventana.
     */
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
        this.setState({[e.target.name]: e.target.value})
    }
    
     agregarRestaurante() {
        
        if (this.state.nombre === "") { // Si es vacio no agrega nada
            alert("No hay nombre especificado...");
        } else { 
            if (!database.insert_restaurante(this.state.nombre,this.state.contacto,this.state.ubicacion,this.state.Horario,this.state.tipoComida,this.state.precios)) {
                
                this.setState({ nombre:'',
                                contacto:'',
                                ubicacion:'',
                                Horario:'',
                                tipoComida:'',
                                precios:''});
                alert("Agregado con exito...")
            
            } else { // No se inserto el restaurante en la BD
                alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
            }
        }
        
        
    }
    
    /**
	 * Muestra los componentes deseados. 
	 * Actualiza la interfaz dependiendo de lo que pase en la aplicación.
	 */
	render(){
        return (
            <div className="container_button">

              
              <div className="flex-item">

                <button
                    id="navigationButton"
                    className="btn btn-primary"
                    data-tip data-for='btn-tooltip-Si'
                    onClick={this.openModal}
                >
                    Si
                </button>
                

              </div>

              <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                  style={customStyles}>

                  <div>
                    
                    <div className = "principalAdd">
                        <h3  className="navlink">Nombre Restaurante: </h3><input className="input_text_a" type="text" name="nombre" onChange={(e)=>this.setField(e)}/>
                    </div>
                    
                    
                    
                    <div className = "principalAdd">
                        <h3 className="navlink">Contacto: </h3><input className="input_text_a" type="text" name="contacto" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Ubicación: </h3><input className="input_text_a" type="text" name="ubicacion" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Horario: </h3><input className="input_text_a" type="text" name="horario" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Tipo de Comida: </h3><input className="input_text_a" type="text" name="tipoComida" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    <div className = "principalAdd">
                        <h3 className="navlink">Precios: </h3><input className="input_text_a" type="text" name="precios" onChange={(e)=>this.setField(e)}/>
                        <br></br>
                    </div>
                    
                    <div>
                        <button size = "lg" type="button" class="btn btn-success" onClick={this.agregarRestaurante}>Agregar</button>
                    </div>


                </div>

              </Modal>

            </div>
        );
    }
}
