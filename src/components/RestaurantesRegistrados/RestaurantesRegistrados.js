import React, { Component } from 'react';
import Restaurante from './Restaurante';
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


class RestaurantesRegistrados extends Component {
    
     constructor(props){
        super(props);
        this.state = {
            modalIsOpen: false,
            modalIsOpenH: false,
            //Estados del Horario
            domingo:'',
            lunes:'',
            martes:'',
            miercoles:'',
            jueves:'',
            viernes:'',
            sabado:'',
            //termina estados del horario
            restaurantes : [],
            nombre:'',
            contacto:'',
            ubicacion:'',
            tipoComida:'',
            precios:''
        }
        
        this.cargarRestaurantes = this.cargarRestaurantes.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.agregarRestaurante = this.agregarRestaurante.bind(this);
        this.openModalHorario = this.openModalHorario.bind(this);
        this.closeModalHorario = this.closeModalHorario.bind(this);
    }
    
    componentDidMount(){
        this.cargarRestaurantes();
    }
    
    cargarRestaurantes(){
        database.get_all_restaurantes().then(result => {
            let restaurantes = result;
            let todosRestarantes = [];
            for (let k in restaurantes) {
                
                todosRestarantes.push(
                    
                    <Restaurante
                        nombre={restaurantes[k].nombre} 
                        calificaciones={restaurantes[k].calificaciones} 
                        contacto={restaurantes[k].contacto}
                        comentarios={restaurantes[k].comentarios}
                        ubicacion={restaurantes[k].ubicacion}
                        horarios={restaurantes[k].Horario}
                        tipoComida={restaurantes[k].tipoComida}
                        precios={restaurantes[k].precios}
                                
                    />
                )
                
            }

            this.setState({
                restaurantes: todosRestarantes
            });
        });
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
    
     agregarRestaurante() {
        if (this.state.nombre === "") { // Si es vacio no agrega nada
            alert("No hay nombre especificado...");
        } else { 
            if (!database.insert_restaurante(this.state.nombre,this.state.contacto,this.state.ubicacion,this.state.tipoComida,this.state.precios,this.state.domingo,this.state.lunes,this.state.martes,this.state.miercoles,this.state.jueves,this.state.viernes,this.state.sabado)) {
                
                this.setState({ domingo:'',
                                lunes:'',
                                martes:'',
                                miercoles:'',
                                jueves:'',
                                viernes:'',
                                sabado:'',
                                nombre:'',
                                contacto:'',
                                ubicacion:'',
                                tipoComida:'',
                                precios:''});
                alert("Agregado con exito...")
            
            } else { // No se inserto el restaurante en la BD
                alert("No se pudo agregar " + this.state.nombre + " a la base de datos.");
            }
        }
        
        
    }
    
  render() {
      
        return (
          <div className="App" >
                
                <div className="flex-item">

                <button
                    id="navigationButton"
                    className="btn btn-primary"
                    data-tip data-for='btn-tooltip-Si'
                    onClick={this.openModal}
                >
                    Agregar Restaurante
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
                        <h3 className="navlink">Horario: </h3>
                        <button
                            id="navigationButton"
                            className="btn btn-primary"
                            data-tip data-for='btn-tooltip-Si'
                            onClick={this.openModalHorario}
                        >
                            Agregar Horario
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
                                    <h3 className="navlink">Domingo: </h3><input className="input_text_a" type="text" name="domingo" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Lunes: </h3><input className="input_text_a" type="text" name="lunes" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Martes: </h3><input className="input_text_a" type="text" name="martes" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Miercoles: </h3><input className="input_text_a" type="text" name="miercoles" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Jueves: </h3><input className="input_text_a" type="text" name="jueves" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Viernes: </h3><input className="input_text_a" type="text" name="viernes" onChange={(e)=>this.setField(e)}/>
                                    <br></br>
                                </div>
                                 <div>
                                    <h3 className="navlink">Sabado: </h3><input className="input_text_a" type="text" name="sabado" onChange={(e)=>this.setField(e)}/>
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


            <div className="">


                <div align="left">
                    {this.state.restaurantes}
                </div>


            </div>
          </div>

        );
  }
}

export default RestaurantesRegistrados;

        