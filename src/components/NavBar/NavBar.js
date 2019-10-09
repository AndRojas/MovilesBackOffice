import React, { Component } from 'react';



class NavBar extends Component {
 
deleteItems(e) {       

  localStorage.clear();
}
    
  render() {
      
   let sesion = [];
      
    if(this.props.appState.usuarioRegistrado){
        sesion = <ul className="nav navbar-nav navbar-right">
                    <li><a href="/informacion" onClick={this.deleteItems}><span className="glyphicon glyphicon-log-out"></span> Salir</a></li>
                </ul>
    }else{
        sesion = <ul className="nav navbar-nav navbar-right">
                    <img alt ="" align="left" width="50" height="50" src={this.props.appState.foto} className="profile-image img-circle"/>
                    
                    <li><a href="/logIn"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                </ul>
    }
      return (
          <nav className="navbar navbar-inverse">
            <div className="container-fluid">
              <div className="navbar-header">
                <a className="navbar-brand" href="index">Restaurant Info</a>
              </div>
              <ul className="nav navbar-nav">
                <li  className="nav-link"><a href='restaurantes'>Listado de Restaurantes</a></li>
                <li className="nav-link"><a href='usuarios'>Listado de Usuarios</a></li>
                <li><a href="/perfil">Perfil</a></li>

              </ul>
                
                {sesion}
                
            </div>
          </nav>
        );
      
   
  }
}

export default NavBar;
