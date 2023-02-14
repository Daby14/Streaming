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
} from './streaming.js';

//Comprobamos que todos las funciones implementadas funcionan correctamente
function testStreaming() {

    //!Clase Person
    let p = new Person("David", "Letrado", "Gonzalez", "28/09/2003", "images/image.jpg");
    let p2 = new Person("Antonio", "Diaz", "Fernandez", "16/03/1996", "images/image.jpg");

    console.log("--- Datos Person ---");
    console.log("Mostramos los datos del actor 1");
    console.log(p.toString());

    console.log("Mostramos los datos del actor 2");
    console.log(p2.toString());
    console.log("--- Fin Datos Person ---");

    //!Clase Category
    let c = new Category("Categoria 1", "Excelente");
    let c1 = new Category("Categoria 2", "Regular");

    console.log("--- Datos Category ---");
    console.log("Mostramos los datos de la categoria 1");
    console.log(c.toString());

    console.log("Mostramos los datos de la categoria 2");
    console.log(c1.toString());
    console.log("--- Fin Datos Category ---");

    //!Clase Resource
    let r = new Resource("93", "movies/movie.mp4");

    console.log("--- Datos Resource ---");
    console.log("Mostramos los datos del resource 1");
    console.log(r.toString());
    console.log("--- Fin Datos Resource ---");

    //!Clase Coordinate
    let co = new Coordinate(-90, 90);

    console.log("--- Datos Coordinate ---");
    console.log("Se lanza excepción ya que el valor de la latitud es incorrecto");
    try {
        let co1 = new Coordinate(-91, 90);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza excepción ya que el valor de la longitud es incorrecto");
    try {
        let co2 = new Coordinate(-90, 185);
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos los datos de coordinate 1");
    console.log(co.toString());
    console.log("--- Fin Datos Coordinate ---");

    //!Clase Production
    console.log("--- Excepción Clase Production ---");
    console.log("Se lanza una excepción al intentar instanciar la clase abstracta Production");

    //Comprobamos que se lanza una excepción al intentar instaciar la clase Production
    try {
        let pr = new Production("Production 1", "España", "06/01/2023", "Destruir el anillo", "images/image.jpg");
    } catch (error) {
        console.error(error);
    }
    console.log("--- Fin Excepción Clase Production ---");

    //!Clase Movie

    let m = new Movie("Movie 1", "España", "12/10/2022", "Conseguir la corona", "images/image.jpg", r, co);

    let m1 = new Movie("Movie 2", "Inglaterra", "23/03/2021", "Destruir el anillo", "images/image2.jpg", r, co);

    console.log("--- Datos Movies ---");
    console.log("Mostramos los datos de la movie 1");
    console.log(m.toString());

    console.log("Mostramos los datos de la movie 2");
    console.log(m1.toString());
    console.log("--- Fin Datos Movies ---");

    //!Clase Serie

    let s = new Serie("Serie 1", "Inglaterra", "12/01/2023", "Encontrar el anillo", "images/image3.jpg", "Volcán", co, 3);

    console.log("--- Datos Serie ---");
    console.log("Mostramos los datos de la serie 1");
    console.log(s.toString());
    console.log("--- Fin Datos Serie ---");

    //!Clase User
    let u = new User("User 1", "user1@gmail.com", "contraSeÑa");

    console.log("--- Datos User ---");
    console.log("Mostramos los datos del user 1");
    console.log(u.toString());
    console.log("--- Fin Datos User ---");

    //!Objeto VideoSystem

    console.log("------------------------------");
    console.log("Testeo Objeto VideoSystem");

    console.log("Se lanza una excepción debido a que el name no puede ser vacío");
    //Comprobamos que se lanza una excepción ya que el name de VideoSystem no puede estar vacío
    try {
        let v = VideoSystem.getInstance("");
    } catch (error) {
        console.error(error);
    }

    //Instanciamos VideoSystem
    let v = VideoSystem.getInstance("Maestre");
    let v2 = VideoSystem.getInstance("Atenea");

    console.log("Comparamos las 2 instancias del objeto VideoSystem y el resultado es true por lo que es único");
    //Comprobamos que el objeto VideoSystem es único
    try {
        console.log(v === v2);  //true, por lo que el objeto es único
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos el nombre del sistema");
    //Mostramos el name por consola
    console.log(v.name);

    console.log("Fin Testeo Objeto VideoSystem");

    //TODO: CATEGORIES

    console.log("------------------------------");
    console.log("Testeo Categories");

    console.log("Añadimos la categoría 1 al sistema");
    //Comprobamos que se añade la categoria sin problema
    try {
        console.log(v.addCategorie(c));     //c es la categoría declarada anteriormente
    } catch (error) {
        console.error(error);
    }

    console.log("Borramos la categoría 1 del sistema");
    //Comprobamos que se borra la categoria sin problema
    try {
        console.log(v.removeCategorie(c));
    } catch (error) {
        console.error(error);
    }

    console.log("Volvemos a añadir la categoría 1 al sistema");
    //Comprobamos que se añade la categoria sin problema
    try {
        console.log(v.addCategorie(c));
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos las categorías registradas en el sistema");
    //Recuperamos las categorias a través de un iterador
    try {

        //Con un for of vamos recuperando las categorías para mostrarlas por consola
        for (const iterator of v.categories) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción ya que se intenta añadir un objeto que no es Category");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Category
    try {
        let r = new Resource("97", "movies/movie.mp4");
        v.addCategorie(r);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción ya que se intenta añadir una categoría que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir una categoria que ya existe
    try {
        console.log(v.addCategorie(c));
    } catch (error) {
        console.error(error);
    }

    console.log("Asignamos la serie 1 y la movie 1 a la categoria 1");
    //Comprobamos que se asignan las producciones a las categorías correspondientes
    try {
        v.assignCategory(s, c);
        console.log(v.assignCategory(m, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos la movie 1 de la categoria 1");
    //Comprobamos que se eliminan las producciones de las categorías correspondientes
    try {
        console.log(v.deassignCategory(m, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es Category");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es category
    try {
        console.log(v.assignCategory(m, r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar asignar un objeto que no es production");
    //Comprobamos que se lanza una excepción ya que se intenta asignar un objeto que no es production
    try {
        console.log(v.assignCategory(r, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción que no existe
    try {
        console.log(v.deassignCategory(m1, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción de una categoría que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción de una categoría que no existe
    try {
        console.log(v.deassignCategory(m, c1));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de una categoría que no es instancia de Category");
    //Se lanza una excepción al intentar mostrar las producciones de una categoría que no es instancia de Category
    try {
        for (let pro of v.getProductionsCategory(p)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de una categoría que no existe");
    //Se lanza una excepción al intentar mostrar las producciones de una categoría que no existe
    try {
        for (let pro of v.getProductionsCategory(c1)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos todas las producciones de la categoría 1");
    //Recuperamos todas las producciones de una categoría
    try {
        for (let pro of v.getProductionsCategory(c)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.info("Fin Testeo Categories");

    //TODO: USERS

    console.log("------------------------------");
    console.log("Testeo Users");

    let u1 = new User("User 2", "user2@gmail.com", "contraSeÑa");
    let u2 = new User("User 3", "user2@gmail.com", "contraSeÑa");

    console.log("Añadimos el user 1 y el user 2 al sistema");
    //Comprobamos que se añade el usuario sin problema
    try {
        v.addUser(u);     //u es el user declarado anteriormente
        console.log(v.addUser(u1));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es User");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es User
    try {
        let r = new Resource("98", "movies/movie.mp4");
        v.addUser(r);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un usuario con un username que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un user con un username que ya existe
    try {
        console.log(v.addUser(u));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un usuario con un email que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un user con un email que ya existe
    try {
        console.log(v.addUser(u2));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos el user 1 del sistema");
    //Comprobamos que se elimina el user
    try {
        console.log(v.removeUser(u));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un user que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar un user que no existe
    try {
        console.log(v.removeUser(u));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un user que no es instancia de User");
    //Comprobamos que se lanza una excepción al intentar borrar un user que no es una instancia de User
    try {
        let r = new Resource("99", "movies/movie.mp4");
        console.log(v.removeUser(r));
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos los usuarios del sistema");
    //Recuperamos los users a través de un iterador
    try {

        //Con un for of vamos recuperando los users para mostrarlas por consola
        for (const iterator of v.users) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Fin Testeo Users");

    //TODO: PRODUCTIONS

    console.log("------------------------------");
    console.log("Testeo Productions");

    console.log("Añadimos la movie 1 y la serie 1 al sistema");
    //Comprobamos que se añaden las producciones sin problema
    try {
        v.addProduction(m);   //m es una pelicula declarada anteriormente
        console.log(v.addProduction(s));      //s es una serie declarada anteriormente
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es Production");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Production
    try {
        let r = new Resource("97", "movies/movie.mp4");
        v.addProduction(r);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir una producción que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir una producción que ya existe
    try {
        console.log(v.addProduction(s));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos la serie 1 del sistema");
    //Comprobamos que se elimina la producción
    try {
        console.log(v.removeProduction(s));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción que no es una instancia de Production");
    //Comprobamos que se lanza una excepción al intentar borrar una producción que no es una instancia de Production
    try {
        let r = new Resource("100", "movies/movie.mp4");
        console.log(v.removeProduction(r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción que no existe
    try {
        console.log(v.removeProduction(s));
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos las producciones del sistema");
    //Recuperamos las producciones a través de un iterador
    try {

        //Con un for of vamos recuperando las producciones para mostrarlas por consola
        for (const iterator of v.productions) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Fin Testeo Productions");

    //TODO: ACTORS

    console.log("------------------------------");
    console.log("Testeo Actors");

    console.log("Añadimos el actor 1 y el actor 2 al sistema");
    //Comprobamos que se añade el actor sin problema
    try {
        v.addActor(p);
        console.log(v.addActor(p2));      //p y p2 son person declaradas anteriormente
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos los actores del sistema");
    //Recuperamos los actores a través de un iterador
    try {

        //Con un for of vamos recuperando los actores para mostrarlos por consola
        for (const iterator of v.actors) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es Person");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Person
    try {
        let r = new Resource("101", "movies/movie.mp4");
        v.addActor(r);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un actor que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un actor que ya existe
    try {
        console.log(v.addActor(p));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos el actor 1");
    //Comprobamos que se elimina el actor
    try {
        console.log(v.removeActor(p));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un actor que no es una instancia de Person");
    //Comprobamos que se lanza una excepción al intentar borrar un actor que no es una instancia de Person
    try {
        let r = new Resource("102", "movies/movie.mp4");
        console.log(v.removeActor(r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un actor que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar un actor que no existe
    try {
        console.log(v.removeActor(p));
    } catch (error) {
        console.error(error);
    }

    console.log("Asignamos la serie 1 y la movie 1 al actor 1");
    //Comprobamos que se asignan las producciones a los actores correspondientes
    try {
        v.assignActor(s, p);
        console.log(v.assignActor(m, p));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos la serie 1 del actor 1");
    //Comprobamos que se eliminan las producciones de los actores correspondientes
    try {
        console.log(v.deassignActor(s, p));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es Actor");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es actor
    try {
        console.log(v.assignActor(m, r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar asignar un objeto que no es Production");
    //Comprobamos que se lanza una excepción ya que se intenta asignar un objeto que no es production
    try {
        console.log(v.assignActor(r, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción que no existe
    try {
        console.log(v.deassignActor(m1, p));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción de un actor que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción de un actor que no existe
    try {
        let p3 = new Person("Pepito", "Alvarez", "Zupi", "19/08/1992", "images/image.jpg");
        console.log(v.deassignActor(m, p3));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de un actor que no es instancia de Person");
    //Se lanza una excepción al intentar mostrar las producciones de un actor que no es instancia de Person
    try {
        for (let pro of v.getProductionsActor(c)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de un actor que no existe");
    //Se lanza una excepción al intentar mostrar las producciones de un actor que no existe
    try {
        let p3 = new Person("Pepito", "Alvarez", "Zupi", "19/08/1992", "images/image.jpg");
        for (let pro of v.getProductionsActor(p3)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos las producciones del actor 1");
    //Recuperamos todas las producciones de un actor
    try {
        for (let pro of v.getProductionsActor(p)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar todos los actores de una producción que no es instancia de Production");
    //Se lanza una excepción al intentar mostrar todos los actores de una producción que no es instancia de Production
    try {
        for (let pro of v.getCast(p)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos todos los actores de una producción");
    //Recuperamos todos las actores de una producción
    try {
        for (let pro of v.getCast(m)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Fin Testeo Actors");

    //TODO: DIRECTORS

    console.log("------------------------------");
    console.info("Testeo Directors");

    let p1 = new Person("Miguel", "Sanchez", "Caminero", "05/09/1968", "www.google.com");

    console.log("Añadimos el director 1 al sistema");
    //Comprobamos que se añade el director sin problema
    try {
        console.log(v.addDirector(p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos los directores del sistema");
    //Recuperamos los directores a través de un iterador
    try {

        //Con un for of vamos recuperando los directores para mostrarlos por consola
        for (const iterator of v.directors) {
            console.log(iterator);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es Person");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es Person
    try {
        let r = new Resource("101", "movies/movie.mp4");
        v.addDirector(r);
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un director que ya existe");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un director que ya existe
    try {
        console.log(v.addDirector(p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos el director 1 del sistema");
    //Comprobamos que se elimina el director
    try {
        console.log(v.removeDirector(p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un director que no es una instancia de Person");
    //Comprobamos que se lanza una excepción al intentar borrar un director que no es una instancia de Person
    try {
        let r = new Resource("102", "movies/movie.mp4");
        console.log(v.removeDirector(r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar un director que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar un director que no existe
    try {
        console.log(v.removeDirector(p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Asignamos la serie 1 y la movie 1 al director 1 (como el director 1 lo hemos borrado, a la hora de asignarle producciones se añade al sistema)");
    //Comprobamos que se asignan las producciones a los directores correspondientes
    try {
        v.assignDirector(s, p1);
        console.log(v.assignDirector(m, p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Eliminamos la movie 1 del director 1");
    //Comprobamos que se eliminan las producciones de los directores correspondientes
    try {
        console.log(v.deassignDirector(m, p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar añadir un objeto que no es director");
    //Comprobamos que se lanza una excepción ya que se intenta añadir un objeto que no es director
    try {
        console.log(v.assignDirector(m, r));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar asignar un objeto que no es production");
    //Comprobamos que se lanza una excepción ya que se intenta asignar un objeto que no es production
    try {
        console.log(v.assignDirector(r, c));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción que no existe
    try {
        console.log(v.deassignDirector(m1, p1));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar borrar una producción de un director que no existe");
    //Comprobamos que se lanza una excepción al intentar borrar una producción de un director que no existe
    try {
        let p3 = new Person("Pepito", "Alvarez", "Zupi", "19/08/1992", "images/image.jpg");
        console.log(v.deassignDirector(m, p3));
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de un director que no es instancia de Person");
    //Se lanza una excepción al intentar mostrar las producciones de un director que no es instancia de Person
    try {
        for (let pro of v.getProductionsDirector(c)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Se lanza una excepción al intentar mostrar las producciones de un director que no existe");
    //Se lanza una excepción al intentar mostrar las producciones de un director que no existe
    try {
        let p3 = new Person("Pepito", "Alvarez", "Zupi", "19/08/1992", "images/image.jpg");
        for (let pro of v.getProductionsDirector(p3)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Mostramos todas las producciones de un director");
    //Recuperamos todas las producciones de un director
    try {
        for (let pro of v.getProductionsDirector(p1)) {
            console.log(pro);
        }
    } catch (error) {
        console.error(error);
    }

    console.log("Fin Testeo Directors");

}

window.onload = testStreaming;

// //Declaramos los objetos con los que vamos a trabajar en nuestra web
// let categoria1 = new Category("Categoria1", "Acción");
// let categoria2 = new Category("Categoria2", "Deportes");
// let categoria3 = new Category("Categoria3", "Aventura");

// let resource1 = new Resource("94", "movies/movie.mp4");
// let coordinate1 = new Coordinate(-90, 90);

// let produccion1 = new Serie("El señor de los anillos", "Nueva Zelanda", "12/01/2022", "Encontrar el anillo", "images/image1.jpg", "Volcán", coordinate1, 3);
// let produccion2 = new Serie("La que se avecina", "España", "24/09/2008", "Historias de ficción", "images/image2.jpg", "Edificio Contubernio", coordinate1, 13);
// let produccion3 = new Serie("La casa de papel", "España", "05/06/2018", "Fabricar dinero", "images/image3.jpg", "Banco Nacional de Moneda y Timbre", coordinate1, 5);
// let produccion4 = new Serie("The Shooter", "California", "15/11/2016", "Evitar complot contra el presidente de los EEUU", "images/image4.jpg", "USA Network", coordinate1, 3);
// let produccion5 = new Serie("The Witcher", "Estados Unidos", "20/12/2019", "Leyenda de Geralt de Rivia y la princesa Ciri", "images/image5.jpg", "Mundo medieval", coordinate1, 2);
// let produccion6 = new Serie("Ni una palabra", "Estados Unidos", "22/04/2022", "Desaparición de una hija", "images/image6.jpg", "Volcán", coordinate1, 3);



// let produccion7 = new Movie("Movie_1", "España", "12/10/2022", "Conseguir la corona", "images/image7.jpg", resource1, coordinate1);
// let produccion8 = new Movie("Movie_2", "España", "12/10/2022", "Conseguir la corona", "images/image8.jpg", resource1, coordinate1);
// let produccion9 = new Movie("Movie_3", "España", "12/10/2022", "Conseguir la corona", "images/image9.jpg", resource1, coordinate1);
// let produccion10 = new Movie("Movie_4", "España", "12/10/2022", "Conseguir la corona", "images/image10.jpg", resource1, coordinate1);
// let produccion11 = new Movie("Movie_5", "España", "12/10/2022", "Conseguir la corona", "images/image11.jpg", resource1, coordinate1);
// let produccion12 = new Movie("Movie_6", "España", "12/10/2022", "Conseguir la corona", "images/image12.jpg", resource1, coordinate1);



// //Exportamos dichos objetos para poder trabajar con ellos
// export {
//     categoria1,
//     categoria2,
//     categoria3,
//     resource1,
//     coordinate1,
//     produccion1,
//     produccion2,
//     produccion3,
//     produccion4,
//     produccion5,
//     produccion6,
//     produccion7,
//     produccion8,
//     produccion9,
//     produccion10,
//     produccion11,
//     produccion12,
//     VideoSystem
// };