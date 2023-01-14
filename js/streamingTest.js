"use strict";

//Comprobamos que todos las funciones implementadas funcionan correctamente
function testStreaming() {

    //Instanciamos las clases
    let p = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "www.google.com");
    let c = new Category("DAW", "Excelente");
    let r = new Resource("93", "movies/movie.mp4");

    //Comprobamos que se lanza una excepción al intentar instaciar la clase Production
    try{
        let pr = new Production("El Señor de los Anillos", "España", "06/01/2023", "Destruir el anillo", "images/image.jpg");
    }catch(error){
        console.error(error);
    }

    let m = new Movie(r, "Nueva Zelanda", "El Señor de los Anillos", "España", "06/01/2023", "Destruir el anillo", "images/image.jpg");
    let s = new Serie("Volcán", "Nueva Zelanda", 3 , "El Señor de los Anillos", "España", "06/01/2023", "Destruir el anillo", "images/image.jpg");
    let u = new User("David", "davidletrado03@gmail.com", "contraSeÑa" );
    let co = new Coordinate(123, 178);

    //Mostramos los datos de los objetos por consola
    console.log(p.toString());
    console.log(c.toString());
    console.log(r.toString());
    console.log(m.toString());
    console.log(s.toString());
    console.log(u.toString());
    console.log(co.toString());

}

window.onload = testStreaming;