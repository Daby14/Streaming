"use strict";

//Comprobamos que todos las funciones implementadas funcionan correctamente
function testStreaming() {

    //!Clase Person
    let p = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "www.google.com");

    console.log(p.toString());

    //!Clase Category
    let c = new Category("DAW", "Excelente");

    console.log(c.toString());

    //!Clase Resource
    let r = new Resource("93", "movies/movie.mp4");

    console.log(r.toString());

    //!Clase Production
    //Comprobamos que se lanza una excepción al intentar instaciar la clase Production
    try {
        let pr = new Production("El Señor de los Anillos", "España", "06/01/2023", "Destruir el anillo", "images/image.jpg");
    } catch (error) {
        console.error(error);
    }

    //!Clase Movie
    let m = new Movie("El Señor de los Anillos", "España", "12/10/2022", "Destruir el anillo", "images/anillo.jpg", r, "Nueva Zelanda");

    console.log(m.toString());

    //!Clase Serie
    let s = new Serie("El Hobbit", "España", "12/01/2023", "Encontrar el anillo", "images/hobbit.jpg", "Volcán", "Nueva Zelanda", 3);

    console.log(s.toString());

    //!Clase User
    let u = new User("David", "davidletrado03@gmail.com", "contraSeÑa");

    console.log(u.toString());

    //!Clase Coordinate
    let co = new Coordinate(123, 178);

    console.log(co.toString());

    //!Objeto VideoSystem

    console.info("Testeo Objeto VideoSystem");

    //Comprobamos que se lanza una excepción ya que el name de VideoSystem no puede estar vacío
    try {
        let v = VideoSystem.getInstance("");
    } catch (error) {
        console.error(error);
    }

    //Instanciamos VideoSystem
    let v = VideoSystem.getInstance("Maestre");
    let v2 = VideoSystem.getInstance("Atenea");

    //Comprobamos que el objeto VideoSystem es único
    try {
        console.log(v === v2);  //true, por lo que el objeto es único
    } catch (error) {
        console.error(error);
    }

    //Mostramos el name por consola
    console.log(v.name);

    console.info("Fin Testeo Objeto VideoSystem");

    //TODO: CATEGORIES

    console.info("Testeo Categories");

    //Comprobamos que se añade la categoria sin problema
    try {
        console.log(v.addCategorie(c));     //c es la categoría declarada anteriormente
    } catch (error) {
        console.error(error);
    }

    //Recuperamos las categorias a través de un iterador
    try {

        //Con un for of vamos recuperando las categorías para mostrarlas por consola
        for (const iterator of v.categories) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Category
    try {
        let r = new Resource("97", "movies/movie.mp4");
        v.addCategorie(r);
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir una categoria que ya existe
    try {
        console.log(v.addCategorie(c));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se elimina la categoria
    try {
        console.log(v.removeCategorie(c));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar una categoria que no existe
    try {
        console.log(v.removeCategorie(c));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Categories");

    //TODO: USERS

    console.info("Testeo Users");

    let u1 = new User("Jesus", "pepito123@gmail.com", "contraSeÑa");
    let u2 = new User("Antonio", "pepito123@gmail.com", "contraSeÑa");

    //Comprobamos que se añade el usuario sin problema
    try {
        v.addUser(u);     //u es el user declarado anteriormente
        console.log(v.addUser(u1));
    } catch (error) {
        console.error(error);
    }

    //Recuperamos los users a través de un iterador
    try {

        //Con un for of vamos recuperando los users para mostrarlas por consola
        for (const iterator of v.users) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es User
    try {
        let r = new Resource("98", "movies/movie.mp4");
        v.addUser(r);
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un user con un username que ya existe
    try {
        console.log(v.addUser(u));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un user con un email que ya existe
    try {
        console.log(v.addUser(u2));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se elimina el user
    try {
        console.log(v.removeUser(u));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un user que no existe
    try {
        console.log(v.removeUser(u));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un user que no es una instancia de User
    try {
        let r = new Resource("99", "movies/movie.mp4");
        console.log(v.removeUser(r));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Users");

    //TODO: PRODUCTIONS

    console.info("Testeo Productions");

    //Comprobamos que se añaden las producciones sin problema
    try {
        v.addProduction(m);   //m es una pelicula declarada anteriormente
        console.log(v.addProduction(s));      //s es una serie declarada anteriormente
    } catch (error) {
        console.error(error);
    }

    //Recuperamos las producciones a través de un iterador
    try {

        //Con un for of vamos recuperando las producciones para mostrarlas por consola
        for (const iterator of v.productions) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Production
    try {
        let r = new Resource("97", "movies/movie.mp4");
        v.addProduction(r);
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir una producción que ya existe
    try {
        console.log(v.addProduction(s));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se elimina la producción
    try {
        console.log(v.removeProduction(s));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar una producción que no es una instancia de Production
    try {
        let r = new Resource("100", "movies/movie.mp4");
        console.log(v.removeProduction(r));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar una producción que no existe
    try {
        console.log(v.removeProduction(s));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Productions");

    //TODO: ACTORS

    console.info("Testeo Actors");

    //Comprobamos que se añade el actor sin problema
    try {
        console.log(v.addActor(p));      //p es una person declarada anteriormente
    } catch (error) {
        console.error(error);
    }

    //Recuperamos los actores a través de un iterador
    try {

        //Con un for of vamos recuperando los actores para mostrarlos por consola
        for (const iterator of v.actors) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Person
    try {
        let r = new Resource("101", "movies/movie.mp4");
        v.addActor(r);
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un actor que ya existe
    try {
        console.log(v.addActor(p));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se elimina el actor
    try {
        console.log(v.removeActor(p));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un actor que no es una instancia de Person
    try {
        let r = new Resource("102", "movies/movie.mp4");
        console.log(v.removeActor(r));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un actor que no existe
    try {
        console.log(v.removeActor(s));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Actors");

}

window.onload = testStreaming;