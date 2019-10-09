import React, { Component } from 'react';

import NavBar from './components/NavBar/NavBar';
import Perfil from './components/Perfil/Perfil';
import Administracion from './components/Administracion/Administracion';
import RestaurantesRegistrados from './components/RestaurantesRegistrados/RestaurantesRegistrados';
import UsuariosRegistrados from './components/UsuariosRegistrados/UsuariosRegistrados';

import * as database from "./components/BD/funciones.js";
import firebase from 'firebase';

//import * as database from "./components/BD/LogicaBD.js";



import './App.css';




class App extends Component {
    
    constructor(){
		super();
		this.state ={
			link:1, 
            usuarioRegistrado: false,
            userName: "",
            nombre: "Anonimo",
            telefono:"",
            foto:"http://www.extrum.com/wp-content/uploads/2017/07/Foto-perfil-anonimo.jpg",
            password:""
		};
		this.ir=this.ir.bind(this);
        
        this.updateUserName = this.updateUserName.bind(this);
        this.updatePassword = this.updatePassword.bind(this);
        this.ingresar_sistema = this.ingresar_sistema.bind(this);
        
	}
    
    
    componentDidMount() {
        
        localStorage.getItem('usuarioRegistrado') && this.setState({
            usuarioRegistrado: JSON.parse(localStorage.getItem('usuarioRegistrado'))
        })
        localStorage.getItem('userName') && this.setState({
            userName: JSON.parse(localStorage.getItem('userName'))
        })
        localStorage.getItem('nombre') && this.setState({
            nombre: JSON.parse(localStorage.getItem('nombre'))
        })
        localStorage.getItem('telefono') && this.setState({
            telefono: JSON.parse(localStorage.getItem('telefono'))
        })
        localStorage.getItem('password') && this.setState({
            password:JSON.parse(localStorage.getItem('password'))
        })
        
    }
    
    componentWillUpdate(nextProps,nextState){
        localStorage.setItem('usuarioRegistrado',JSON.stringify(nextState.usuarioRegistrado));
        localStorage.setItem('userName',JSON.stringify(nextState.userName));
        localStorage.setItem('nombre',JSON.stringify(nextState.nombre));
        localStorage.setItem('password',JSON.stringify(nextState.password));
        localStorage.setItem('telefono',JSON.stringify(nextState.telefono));
    }
    
    
    ingresar_sistema() { 
        
        
        database.get_usuario(this.state.userName).then(result => {
            
            if(this.state.password===result.contraseña){
                this.setState({
                    nombre: result.nombre,
                    usuarioRegistrado: true,
                    nick: result.nick,
                    telefono: result.telefono
                    
                    
                });
                
            }

        })
        
        
    }
    
    
    
    ir(nlink){
		this.setState({
			link:nlink
		});
	}
    
       
    updateUserName(event) {
      this.setState({userName: event.target.value});
    }
    updatePassword(event) {
      this.setState({password: event.target.value});
    }
    
    
    
    
   
    
  render() {
      
        const url=window.location.href.split("/");
		const len=url.length-1;
		
		//Los componentes que no ocupan información del url.
		switch (url[len]) {
		case "":
                
			return (
			<div className="App">
				<NavBar ir={this.ir} appState={this.state}/>
				<Administracion/>
			</div>
            );
		
		case "perfil":
			return (
			<div className="App">
				<NavBar ir={this.ir} appState={this.state}/>
				<Perfil appState={this.state} />
			</div>
			);
        case "index":
			return (
			<div className="App">
				<NavBar ir={this.ir} appState={this.state}/>
				<Administracion appState={this.state} />
			</div>
			);
        case "restaurantes":
            if(this.state.usuarioRegistrado){
                return (
                    <div className="App">
                        <NavBar ir={this.ir} appState={this.state}/>
                        <RestaurantesRegistrados appState={this.state} />
                    </div>
                );
            }else{
                return (
                    <div className="App">
                        <NavBar ir={this.ir} appState={this.state}/>
                             <div className="margenesSingUp">

                                <h2>UserName: </h2>
                                <input 
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    value={this.state.userName}
                                    onChange={this.updateUserName}>
                                </input>
                                <h2>Contraseña: </h2>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña"
                                    value={this.state.password}
                                    onChange={this.updatePassword}>
                                </input>


                            </div>

                            <div>
                                <button className="btn btn-info" aria-label="Close" onClick={this.ingresar_sistema}>

                                        <span aria-hidden="true">Ingresar</span>

                                </button>
                            </div>




                        </div>
                    );
            }
			
                
        case "usuarios":
            if(this.state.usuarioRegistrado){
                return (
                    <div className="App">
                        <NavBar ir={this.ir} appState={this.state}/>
                        <UsuariosRegistrados appState={this.state} />
                    </div>
                );
            }else{
                return (
                    <div className="App">
                        <NavBar ir={this.ir} appState={this.state}/>
                             <div className="margenesSingUp">

                                <h2>UserName: </h2>
                                <input 
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    value={this.state.userName}
                                    onChange={this.updateUserName}>
                                </input>
                                <h2>Contraseña: </h2>
                                <input 
                                    type="password" 
                                    placeholder="Contraseña"
                                    value={this.state.password}
                                    onChange={this.updatePassword}>
                                </input>


                            </div>

                            <div>
                                <button className="btn btn-info" aria-label="Close" onClick={this.ingresar_sistema}>

                                        <span aria-hidden="true">Ingresar</span>

                                </button>
                            </div>




                        </div>
                    );
            }
			
        case "logIn":
			return (
			<div className="App">
				<NavBar ir={this.ir} appState={this.state}/>
                     <div className="margenesSingUp">

                        <h2>UserName: </h2>
                        <input 
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={this.state.userName}
                            onChange={this.updateUserName}>
                        </input>
                        <h2>Contraseña: </h2>
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            value={this.state.password}
                            onChange={this.updatePassword}>
                        </input>


                    </div>
                    
                    <div>
                        <button className="btn btn-info" aria-label="Close" onClick={this.ingresar_sistema}>
                            
                                <span aria-hidden="true">Ingresar</span>
                            
                        </button>
                    </div>



                    
                </div>
			);
       
        
                
        default:
			return (
			<div className="App">
				<NavBar ir={this.ir} appState={this.state}/>
                     <div className="margenesSingUp">

                        <h2>UserName: </h2>
                        <input 
                            type="text"
                            placeholder="Nombre de Usuario"
                            value={this.state.userName}
                            onChange={this.updateUserName}>
                        </input>
                        <h2>Contraseña: </h2>
                        <input 
                            type="password" 
                            placeholder="Contraseña"
                            value={this.state.password}
                            onChange={this.updatePassword}>
                        </input>


                    </div>
                    
                    <div>
                        <button className="btn btn-info" aria-label="Close" onClick={this.ingresar_sistema}>
                            
                                <span aria-hidden="true">Ingresar</span>
                            
                        </button>
                    </div>



                    
                </div>
            );
		
		}
  }
}

export default App;
