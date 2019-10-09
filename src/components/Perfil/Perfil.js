import React, { Component } from 'react';

class Perfil extends Component {
    
    
  render() {
     
    return (

        <div className="margenesSingUp">
            <h2 >Perfil de Usuario</h2>

            <div className="card">
              <div>
                    <h1>Nombre del Usuario: {this.props.appState.nombre}</h1>
                    <h2>Nick del Usuario: {this.props.appState.userName}</h2>
                    <h2>Telefono: {this.props.appState.telefono}</h2>
             </div>
            </div>
        </div>
    );
  }
}

export default Perfil;

        