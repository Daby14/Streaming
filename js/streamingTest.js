"use strict";

//Importamos las clases y el objeto VideoSystem que hemos declarado en el archivo streaming.js
import {
    Person,
    Category,
    Resource,
    Production,
    Movie,
    Serie,
    User,
    Coordinate,
    VideoSystem
} from '/js/streaming.js';

//Comprobamos que todos las funciones implementadas funcionan correctamente
function testStreaming() {

    //!Clase Person
    let p = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "www.google.com");
    let p2 = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "www.google.com");

    console.log(p.toString());

    //!Clase Category
    let c = new Category("DAW", "Excelente");
    let c1 = new Category("1", "2");

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

    let m1 = new Movie("Prueba", "España", "12/10/2022", "Destruir el anillo", "images/anillo.jpg", r, "Nueva Zelanda");

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

    //Comprobamos que se asignan las producciones a las categorías correspondientes
    try {
        v.addProductions(m, c1);
        v.addProductions(m1, c1);
        v.addProductions(s, c);
        console.log(v.addProductions(m, c));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se eliminan las producciones de las categorías correspondientes
    try {
        v.removeProductionInCategory(m1, c1);
        console.log(v.removeProductionInCategory(m, c));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es category
    try {
        console.log(v.addProductions(m, r));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es production
    try {
        console.log(v.addProductions(r, c));
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
        console.log(v.removeActor(p2));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se asigna una producción al actor correspondiente
    try {
        v.addProductions(s, c, p);
        console.log(v.addProductions(m, c, p));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Actors");

    //TODO: DIRECTORS

    console.info("Testeo Directors");

    let p1 = new Person("Miguel", "Sanchez", "Caminero", "05/09/1968", "www.google.com");

    //Comprobamos que se añade el director sin problema
    try {
        console.log(v.addDirector(p1));
    } catch (error) {
        console.error(error);
    }

    //Recuperamos los directores a través de un iterador
    try {

        //Con un for of vamos recuperando los directores para mostrarlos por consola
        for (const iterator of v.directors) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Person
    try {
        let r = new Resource("101", "movies/movie.mp4");
        v.addDirector(r);
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción ya que se intenta añadir un director que ya existe
    try {
        console.log(v.addDirector(p1));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se elimina el director
    try {
        console.log(v.removeDirector(p1));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un director que no es una instancia de Person
    try {
        let r = new Resource("102", "movies/movie.mp4");
        console.log(v.removeDirector(r));
    } catch (error) {
        console.error(error);
    }

    //Comprobamos que se lanza una excepción al intentar borrar un director que no existe
    try {
        console.log(v.removeDirector(p1));
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Directors");

    // try {
    //     console.log(v.assignCategory(c,m));
    // } catch (error) {
    //     console.error(error);
    // }

    // try {
    //     console.log(v.assignCategory(c,m));
    // } catch (error) {
    //     console.error(error);
    // }

    // try {

    //     //Con un for of vamos recuperando los directores para mostrarlos por consola
    //     for (const iterator of v.asCategories) {
    //         console.log(iterator);
    //     }
    // } catch (error) {
    //     console.error(error);
    // }



    // //Comprobamos que se asigna una producción a la categoría correspondiente
    // try {
    //     console.log(v.addProductions(m1, c1));
    // } catch (error) {
    //     console.error(error);
    // }

}

window.onload = testStreaming;