import firebase from 'firebase';
import * as uid from "uid";


export function get_all_restaurantes() {
    
    return new Promise(resolve => {
        
        
        // Import Admin SDK
        const admin = firebase;
        // Get a database reference to our posts
        const db = admin.database();        
        const ref = db.ref("/Aplicacion/Restaurantes");
        
        
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            
            alert("Error en la lectura de los restaurantes: " + errorObject.code + "\n" + errorObject.message);
        });
    });
}

export function get_all_usuarios() {
    
    return new Promise(resolve => {
        
        
        // Import Admin SDK
        const admin = firebase;
        // Get a database reference to our posts
        const db = admin.database();        
        const ref = db.ref("/Aplicacion/Usuarios");
        
        
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            
            alert("Error en la lectura de los usuarios: " + errorObject.code + "\n" + errorObject.message);
        });
    });
}



export function insert_restaurante(pNombre, pContacto, pUbicacionGPS, pTipoComida, pPrecios, pDomingo, pLunes, pMartes, pMiercoles, pJueves, pViernes, pSabado){
    let id = pNombre;
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id).update({
        nombre:pNombre,
        contacto:pContacto,
        tipoComida:pTipoComida,
        precios:pPrecios
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/1').update({
        dia:"Domingo",
        horario:pDomingo
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/2').update({
        dia:"Lunes",
        horario:pLunes
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/3').update({
        dia:"Martes",
        horario:pMartes
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/4').update({
        dia:"Miercoles",
        horario:pMiercoles
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/5').update({
        dia:"Jueves",
        horario:pJueves
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/6').update({
        dia:"Viernes",
        horario:pViernes
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    firebase.database().ref('Aplicacion/Restaurantes/' + id+'/Horario/7').update({
        dia:"Sabado",
        horario:pSabado
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })
    
    
}

export function delete_usuario(pNick){

    
    firebase.database().ref('Aplicacion/Usuarios/' + pNick).remove().then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })

    
}

export function insert_usuario(pNombre, pNick, pCorreo, pTelefono, pContraseña){

    
    firebase.database().ref('Aplicacion/Usuarios/' + pNick).update({
        nombre:pNombre,
        nick:pNick,
        correo:pCorreo,
        telefono:pTelefono,
        contraseña:pContraseña
        
    }).then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })

    
}



export function delete_restaurante(pNombre){
    
    firebase.database().ref('Aplicacion/Restaurantes/' + pNombre).remove().then(function () {
    }).catch(function (error) {
        alert("Error al realizar el restaurante: \n" + error);
    })

}


export function get_usuario(user){
    return new Promise(resolve => {
        
        
        // Import Admin SDK
        const admin = firebase;
        // Get a database reference to our posts
        const db = admin.database();        
        const ref = db.ref('Administracion/Usuarios/'+user);
        
        
        ref.once('value', function (snapshot) {
            resolve(snapshot.val());
        }).catch(function (errorObject) {
            
            alert("Error en la lectura del usuario "+user+": " + errorObject.code + "\n" + errorObject.message);
        });
    });
}

