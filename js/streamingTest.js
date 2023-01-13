"use strict";

//Comprobamos que todos las funciones implementadas funcionan correctamente
function testStreaming() {

    let p = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "www.google.com");

    console.log(p.toString());

}

window.onload = testStreaming;