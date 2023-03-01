"use strict";

//Importamos las excepciones que hemos declarado en el archivo exceptions.js
import {
    BaseException,
    AbstractException,
    EmptyNameException,
    ExistedException,
    UsernameExistedException,
    EmailExistedException,
    CategorieTypeException,
    UserTypeException,
    ProductionTypeException,
    PersonTypeException,
    IndexOutException,
    NullException,
    DefaultCategoryProductionManagerException,
    CategoryNotExistsProductionManagerException,
    ActorNotExistsProductionManagerException,
    DirectorNotExistsProductionManagerException,
    ProductionNotExistsProductionManagerException,
    InvalidLatitudeException,
    InvalidLongitudeException,
} from './exceptions.js';

import {
    Person,
    Category,
    Resource,
    Production,
    Movie,
    Serie,
    User,
    Coordinate
} from '../entities/products.js';



//Objecto VideoSystem único
let VideoSystem = (function () {

    let instatiated;

    function init(name) { //Inicialización del Singleton

        class VideoSystem {

            //Declaramos el nombre del sistema
            #name;

            //Declaramos la lista de producciones
            #producs = [];

            //Declaramos la lista categories donde vamos a ir almacenando las categorias del sistema
            #categories = [];

            //Declaramos la lista actors donde vamos a ir almacenando los actores del sistema
            #actors = [];

            //Declaramos la lista directors donde vamos a ir almacenando los directores del sistema
            #directors = [];

            //Declaramos la lista users donde vamos a ir almacenando los usuarios del sistema
            #users = [];

            //Declaramos la lista productions donde vamos a ir almacenando las producciones del sistema
            #productions = [];

            //Declaramos la lista ventanas donde vamos a almacenar todas las ventanas que se vayan abriendo
            #ventanas = [];

            constructor(name) {

                this.#name = name;

                //Comprobamos si el name está vacío
                if (this.#name === "") {
                    throw new EmptyNameException();
                }

            }

            //Getter de name
            get name() {
                return this.#name;
            }

            //Setter de name
            set name(name) {
                this.#name = name;
            }

            //Método que obtiene la posición de una producción
            #getProductionPosition(production, producs = this.#producs) {

                //Comprobamos si la producción es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comparamos por title
                function compareElements(element) {
                    return (element.title === production.title)
                }

                return producs.findIndex(compareElements);
            }

            //!CATEGORY

            //Método que comprueba si existe una categoria
            #getCategoryPosition(categorie) {

                //Comprobamos si la categoria es una instancia de Category
                if (!(categorie instanceof Category)) {
                    throw new ProductionTypeException();
                }

                //Comparamos por name
                function compareElements(element) {
                    return (element.category.name === categorie.name)
                }

                return this.#categories.findIndex(compareElements);
            }

            //Método que añade categorías
            addCategorie(categorys) {

                for (let i = 0; i < categorys.length; i++) {

                    //Comprobamos si la categoria es un objeto Category
                    if ((categorys[i] === null) || !(categorys[i] instanceof Category)) {
                        throw new CategorieTypeException();
                    }

                    //Almacenamos la posición de la categoría
                    let position = this.#getCategoryPosition(categorys[i]);

                    //Si esa categoría no está registrada, la registramos
                    if (position === -1) {

                        this.#categories.push(
                            {
                                category: categorys[i],
                                producs: []
                            }
                        );

                    } else {
                        throw new ExistedException();
                    }

                }

                return this.#categories;

            }

            //Método que dado un objeto Category lo elimina del sistema
            removeCategorie(categorie) {

                //Almacenamos la posición de la categoría
                let index = this.#getCategoryPosition(categorie);

                //Si la categoría está registrada pues la borramos
                if ((index !== -1)) {
                    this.#categories.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                return this.#categories.length;

            }

            //Método que asigna una producción a una categoría
            assignCategory(production, categorie) {

                //Comprobamos que production sea una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comprobamos que categorie sea una instancia de Category
                if (!(categorie instanceof Category)) {
                    throw new CategorieTypeException();
                }

                //Almacenamos la posición de la categoría
                let categoryPosition = this.#getCategoryPosition(categorie);

                //Si no existe la categoría, la añadimos y asignamos la última posición a categoryPosition
                if (categoryPosition === -1) {
                    this.addCategorie(categorie);
                    categoryPosition = this.#categories.length - 1;
                }

                //Almacenamos la posición de la producción
                let productionPosition = this.#getProductionPosition(production);

                //Si no existe la producción la añadimos y asignamos la última posición a productionPosition
                if (productionPosition === -1) {
                    this.#producs.push(production);
                    productionPosition = this.#producs.length - 1;
                }

                //Si la producción no está asignada a la categoría correspondiente, la asignamos
                if (this.#getProductionPosition(production, this.#categories[categoryPosition].producs) === -1) {
                    this.#categories[categoryPosition].producs.push(this.#producs[productionPosition]);
                }

                //Devolvemos el total de producciones asignadas a la categoría
                return this.#categories[categoryPosition].producs.length;

            }

            //Método que elimina una producción de una categoría específica 
            deassignCategory(production, categorie) {

                //Comprobamos que production sea una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comprobamos que categorie sea una instancia de Category
                if (!(categorie instanceof Category)) {
                    throw new CategorieTypeException();
                }

                //Almacenamos la posición de la categoría
                let categoryPosition = this.#getCategoryPosition(categorie);

                //Si existe la categoría, pasamos a comprobar si existe la producción
                if (categoryPosition !== -1) {

                    //Almacenamos la posición de la producción
                    let productionPosition = this.#getProductionPosition(production, this.#categories[categoryPosition].producs);

                    //Si existe la producción, eliminamos dicha producción de dicha categoría
                    if (productionPosition !== -1) {
                        this.#categories[categoryPosition].producs.splice(productionPosition, 1);
                    } else {
                        throw new ProductionNotExistsProductionManagerException(categorie);
                    }
                } else {
                    throw new CategoryNotExistsProductionManagerException();
                }

                //Devolvemos el total de producciones asignadas a la categoría
                return this.#categories[categoryPosition].producs.length;
            }

            //Devuelve el objeto iterador que permite recuperar las categorias del sistema
            get categories() {

                //Guardamos la referencia de la lista
                let array = this.#categories;

                return {
                    *[Symbol.iterator]() {
                        for (let cat of array) {
                            yield cat;
                        }
                    }
                }
            }

            //!USER

            //Método que añade usuarios
            addUser(user) {

                //Comprobamos si el usuario es un objeto User
                if ((user === null) || !(user instanceof User)) {
                    throw new UserTypeException();
                }

                //Comprobamos si el username del user existe
                if ((this.#users.findIndex((us) => us.username === user.username) !== -1)) {
                    throw new UsernameExistedException();
                }

                //Comprobamos si el email del user existe
                if ((this.#users.findIndex((us) => us.email === user.email) !== -1)) {
                    throw new EmailExistedException();
                }

                //Si el usuario no existe se añade
                this.#users.push(user);

                //Devolvemos el total de usuarios del sistema
                return this.#users.length;

            }

            //Método que dado un objeto user lo elimina del sistema
            removeUser(user) {

                //Comprobamos si el usuario es un objeto User
                if ((user === null) || !(user instanceof User)) {
                    throw new UserTypeException();
                }

                //Almacenamos la posición del usuario
                let index = this.#users.findIndex((us) => us.username === user.username);

                //Si el usuario existe lo borramos
                if ((index !== -1)) {
                    this.#users.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                //Devolvemos el total de usuarios del sistema
                return this.#users.length;

            }

            //Devuelve el objeto iterador que permite recuperar los usuarios del sistema
            get users() {

                //Guardamos la referencia de la lista
                let array = this.#users;

                return {
                    *[Symbol.iterator]() {
                        for (let us of array) {
                            yield us;
                        }
                    }
                }
            }

            //!PRODUCTION

            //Método que añade producciones 
            addProduction(production) {

                //Comprobamos si la production es un objeto Production
                if ((production === null) || !(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comprobamos si la producción existe
                if ((this.#productions.findIndex((pro) => pro.title === production.title) !== -1)) {
                    throw new ExistedException();
                }

                //Si la producción no existe la añadimos
                this.#productions.push(production);

                //Devolvemos el total de producciones del sistema
                return this.#productions.length;

            }

            //Método que dado un objeto production lo elimina del sistema
            removeProduction(production) {

                //Comprobamos si la producción es un objeto Production
                if ((production === null) || !(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Almacenamos la posición de la producción
                let index = this.#producs.findIndex((pro) => pro.title === production.title);

                //Si la producción existe la borramos
                if ((index !== -1)) {
                    this.#producs.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                //Devolvemos el total de producciones del sistema
                return this.#producs.length;

            }

            //Devuelve el objeto iterador que permite recuperar las producciones del sistema
            get productions() {

                //Guardamos la referencia de la lista
                let array = this.#productions;

                return {
                    *[Symbol.iterator]() {
                        for (let pro of array) {
                            yield pro;
                        }
                    }
                }
            }

            //!ACTOR

            //Método que comprueba si existe un actor
            #getActorPosition(actor) {

                //Comparamos por nombre
                function compareElements(element) {
                    return (element.actor.name === actor.name)
                }

                return this.#actors.findIndex(compareElements);
            }

            //Método que añade actores
            addActor(actor) {

                //Comprobamos si el actor es un objeto Person
                if ((actor === null) || !(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del actor
                let position = this.#getActorPosition(actor);

                //Si el actor no existe lo añadimos
                if (position === -1) {

                    this.#actors.push(
                        {
                            actor: actor,
                            producs: []
                        }
                    );

                } else {
                    throw new ExistedException();
                }

                //Devolvemos el total de actores del sistema
                return this.#actors.length;

            }

            //Método que dado un objeto actor lo elimina del sistema
            removeActor(actor) {

                //Comprobamos si el actor es un objeto Person
                if ((actor === null) || !(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del actor
                let index = this.#getActorPosition(actor);

                //Si existe el actor lo borramos
                if ((index !== -1)) {
                    this.#actors.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                //Devolvemos el total de actores del sistema
                return this.#actors.length;

            }

            //Método que asigna una producción a un actor
            assignActor(production, actors) {

                //Comprobamos que production es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                for (let i = 0; i < actors.length; i++) {

                    //Comprobamos que actor es una instancia de Person
                    if (!(actors[i] instanceof Person)) {
                        throw new PersonTypeException();
                    }

                    //Almacenamos la posición del actor
                    let actorPosition = this.#getActorPosition(actors[i]);

                    //Si no existe el autor lo añadimos y asignamos la última posición a actorPosition
                    if (actorPosition === -1) {
                        this.addActor(actors[i]);
                        actorPosition = this.#actors.length - 1;
                    }

                    //Almacenamos la posición de la producción
                    let productionPosition = this.#getProductionPosition(production);

                    //Si no existe la producción la añadimos y asignamos la última posición a productionPosition
                    if (productionPosition === -1) {
                        this.#producs.push(production);
                        productionPosition = this.#producs.length - 1;
                    }

                    //Si la producción no está asignada al actor correspondiente, la asignamos
                    if (this.#getProductionPosition(production, this.#actors[actorPosition].producs) === -1) {
                        this.#actors[actorPosition].producs.push(this.#producs[productionPosition]);
                    }
                }

                return this.#actors.length;

            }

            //Elimina una producción de un actor del gestor
            deassignActor(production, actor) {

                //Comprobamos que production es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comprobamos que actor es una instancia de Person
                if (!(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del actor
                let actorPosition = this.#getActorPosition(actor);

                //Si el actor existe, comprobamos si existe la producción
                if (actorPosition !== -1) {

                    //Almacenamos la posición de la producción en el actor
                    let productionPosition = this.#getProductionPosition(production, this.#actors[actorPosition].producs);

                    //Si existe la producción la eliminamos del actor correspondiente
                    if (productionPosition !== -1) {
                        this.#actors[actorPosition].producs.splice(productionPosition, 1);
                    } else {
                        throw new ProductionNotExistsProductionManagerException(actor);
                    }
                } else {
                    throw new ActorNotExistsProductionManagerException();
                }

                //Devolvemos el total de producciones asignadas al actor
                return this.#actors[actorPosition].producs.length;
            }

            //Devuelve el objeto iterador que permite recuperar los actores del sistema
            get actors() {

                //Guardamos la referencia de la lista
                let array = this.#actors;

                return {
                    *[Symbol.iterator]() {
                        for (let act of array) {
                            yield act;
                        }
                    }
                }
            }

            //!DIRECTOR

            //Método que comprueba si existe un director
            #getDirectorPosition(director) {

                //Comprobamos que director es una instancia de Person
                if (!(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Comparamos por name
                function compareElements(element) {
                    return (element.director.name === director.name)
                }

                return this.#directors.findIndex(compareElements);
            }

            //Método que añade directores
            addDirector(director) {

                //Comprobamos si el director es un objeto Person
                if ((director === null) || !(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del director
                let position = this.#getDirectorPosition(director);

                //Si no existe el director lo añadimos
                if (position === -1) {

                    this.#directors.push(
                        {
                            director: director,
                            producs: []
                        }
                    );

                } else {
                    throw new ExistedException();
                }

                //Devolvemos el total de directores del sistema
                return this.#directors.length;

            }

            //Método que dado un objeto director lo elimina del sistema
            removeDirector(director) {

                //Comprobamos si el director es un objeto Person
                if ((director === null) || !(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del director
                let index = this.#getDirectorPosition(director);

                //Si existe el director lo borramos
                if ((index !== -1)) {
                    this.#directors.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                //Devolvemos el total de directores del sistema
                return this.#directors.length;

            }

            //Método que asigna una producción a un director
            assignDirector(production, directors) {

                //Comprobamos si la producción es un objeto Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                for (let i = 0; i < directors.length; i++) {
                    //Comprobamos si el director es un objeto Person
                    if (!(directors[i] instanceof Person)) {
                        throw new PersonTypeException();
                    }

                    //Almacenamos la posición del director
                    let directorPosition = this.#getDirectorPosition(directors[i]);

                    //Si no existe el director lo añadimos y asignamos la última posición a directorPosition
                    if (directorPosition === -1) {
                        this.addDirector(directors[i]);
                        directorPosition = this.#directors.length - 1;
                    }

                    //Si no existe la producción la añadimos y asignamos la última posición a productionPosition
                    let productionPosition = this.#getProductionPosition(production);
                    if (productionPosition === -1) {
                        this.#producs.push(production);
                        productionPosition = this.#producs.length - 1;
                    }

                    //Si la producción no está asignada al director correspondiente, la asignamos
                    if (this.#getProductionPosition(production, this.#directors[directorPosition].producs) === -1) {
                        this.#directors[directorPosition].producs.push(this.#producs[productionPosition]);
                    }
                }



                //Devolvemos el total de producciones asignadas al director
                return this.#directors.length;

            }

            //Elimina una producción de un director del gestor
            deassignDirector(production, director) {

                //Comprobamos si la producción es un objeto Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Comprobamos si el director es un objeto Person
                if (!(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del director
                let directorPosition = this.#getDirectorPosition(director);

                //Si existe el director, comprobamos si existe la producción
                if (directorPosition !== -1) {

                    //Almacenamos la posición del director
                    let productionPosition = this.#getProductionPosition(production, this.#directors[directorPosition].producs);

                    //Si existe la producción la borramos
                    if (productionPosition !== -1) {
                        this.#directors[directorPosition].producs.splice(productionPosition, 1);
                    } else {
                        throw new ProductionNotExistsProductionManagerException(director);
                    }
                } else {
                    throw new DirectorNotExistsProductionManagerException();
                }

                //Devolvemos el total de producciones asignadas al director
                return this.#directors[directorPosition].producs.length;
            }

            //Devuelve el objeto iterador que permite recuperar los directores del sistema
            get directors() {

                //Guardamos la referencia de la lista
                let array = this.#directors;

                return {
                    *[Symbol.iterator]() {
                        for (let dir of array) {
                            yield dir;
                        }
                    }
                }
            }

            //!ITERATORS

            //Devuelve el objeto iterador que permite recuperar las producciones de un director
            * getProductionsDirector(director) {

                //Comprobamos que el director es una instancia de Person
                if (!(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del director
                let directorPosition = this.#getDirectorPosition(director);

                //Si el director no existe se lanza una excepción
                if (directorPosition === -1) {
                    throw new DirectorNotExistsProductionManagerException();
                }

                //Iteramos sobre producs del director correspondiente
                for (let pro of this.#directors[directorPosition].producs) {
                    yield pro;
                }
            }

            //Devuelve el objeto iterador que permite recuperar las producciones de un actor
            * getProductionsActor(actor) {

                //Comprobamos que el actor es una instancia de Person
                if (!(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Almacenamos la posición del director
                let actorPosition = this.#getActorPosition(actor);

                //Si el director no existe se lanza una excepción
                if (actorPosition === -1) {
                    throw new ActorNotExistsProductionManagerException();
                }

                //Iteramos sobre producs del actor correspondiente
                for (let pro of this.#actors[actorPosition].producs) {
                    yield pro;
                }
            }

            //Devuelve el objeto iterador que permite recuperar las producciones de una categoria
            * getProductionsCategory(category) {

                //Comprobamos que la categoria es una instancia de Category
                if (!(category instanceof Category)) {
                    throw new CategorieTypeException();
                }

                //Almacenamos la posición de la categoría
                let categoryPosition = this.#getCategoryPosition(category);

                //Si la categoría no existe se lanza una excepción
                if (categoryPosition === -1) {
                    throw new CategoryNotExistsProductionManagerException();
                }

                //Iteramos sobre producs de la categoría correspondiente
                for (let pro of this.#categories[categoryPosition].producs) {
                    yield pro;
                }
            }

            //Método getCategory que obtiene la categoría correspondiente a un título
            getCategory(title) {

                let cat;

                for (let i = 0; i < this.#categories.length; i++) {
                    if (this.#categories[i].category.name === title) {
                        cat = this.#categories[i];
                    }

                }

                return cat;
            }

            //Método getProduction que obtiene la producción correspondiente a un título
            getProduction(title) {

                let pro;

                for (let i = 0; i < this.#producs.length; i++) {
                    if (this.#producs[i].title === title) {
                        pro = this.#producs[i];
                    }

                }

                return pro;
            }

            get producciones() {

                //Guardamos la referencia de la lista
                let array = this.#producs;

                return {
                    *[Symbol.iterator]() {
                        for (let pro of array) {
                            yield pro;
                        }
                    }
                }
            }

            //Método getDirector que obtiene el director correspondiente a un título
            getDirector(title) {

                let dir;

                for (let i = 0; i < this.#directors.length; i++) {
                    if (this.#directors[i].director.name === title) {
                        dir = this.#directors[i];
                    }


                }

                return dir;
            }

            //Método getActor que obtiene el actor correspondiente a un título
            getActor(title) {

                let act;

                for (let i = 0; i < this.#actors.length; i++) {
                    if (this.#actors[i].actor.name === title) {
                        act = this.#actors[i];
                    }


                }

                return act;
            }

            //Método randomProduction que devuelve las producciones aleatorias que le indiques por parámetro
            randomProduction(cantidad) {

                // Crear un nuevo array para almacenar los números aleatorios
                let numerosAleatorios = [];

                // Generar números aleatorios únicos
                while (numerosAleatorios.length < cantidad) {
                    let indiceAleatorio = Math.floor(Math.random() * this.#producs.length);
                    let numeroAleatorio = this.#producs[indiceAleatorio];

                    if (!numerosAleatorios.includes(numeroAleatorio)) {
                        numerosAleatorios.push(numeroAleatorio);
                    }
                }

                return numerosAleatorios;
            }

            //Método que añade las ventanas que se van abriendo
            pushWindows(production) {

                let indice = this.#ventanas.findIndex((elemento) => elemento.title === production.title);

                if (indice === -1) this.#ventanas.push(production);

            }

            //Método que devuelve las ventanas que están abiertas en ese momento
            getWindows() {
                return this.#ventanas;
            }

            //Método que vacía la lista una vez cerradas todas las ventanas
            cleanWindows() {
                this.#ventanas = [];
            }

            //Devuelve los actores correspondientes a una producción
            * getCast(production) {

                //Comprobamos que la producción es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Iteramos sobre los actores
                for (let pros of this.#actors) {

                    for (let i = 0; i < pros.producs.length; i++) {

                        if (pros.producs[i].title === production.title) yield (pros.actor);

                    }

                }
            }

            //Devuelve los actores correspondientes a una producción
            * getCast2(production) {

                //Comprobamos que la producción es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Iteramos sobre los directores
                for (let pros of this.#directors) {

                    for (let i = 0; i < pros.producs.length; i++) {

                        if (pros.producs[i].title === production.title) yield (pros.director);

                    }
                    
                }
            }

        }

        let sc = new VideoSystem(name);//Devolvemos el objeto VideoSystem para que sea una instancia única.
        Object.freeze(sc);
        return sc;
    }

    return {
        getInstance: function (name) {
            if (!instatiated) { //Si instantiated es undefined llama a init.
                instatiated = init(name); //instantiated contiene el objeto único
            }
            return instatiated; //Devuelve el campo privado
        }
    }
})();

export default VideoSystem;