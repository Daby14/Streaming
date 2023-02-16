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
    InvalidLongitudeException
} from './exceptions.js';

//Declaramos la clase Person
class Person {

    //Declaramos las propiedades de Person
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    //Declaramos el constructor de Person
    constructor(name, lastname1, lastname2 = "", born, picture = "") {

        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;

    }

    //Declaramos los getters de Person
    get name() {
        return this.#name;
    }

    get lastname1() {
        return this.#lastname1;
    }

    get lastname2() {
        return this.#lastname2;
    }

    get born() {
        return this.#born;
    }

    get picture() {
        return this.#picture;
    }

    //Método toString que muestra las propiedades de Person
    toString() {
        return this.#name + " " + this.#lastname1 + " " + this.#lastname2 + " " + this.#born + " " + this.#picture;
    }

}

//Declaramos la clase Category
class Category {

    //Declaramos las propiedades de category
    #name;
    #description;

    //Declaramos el constructor de category
    constructor(name, description = "") {

        this.#name = name;
        this.#description = description;

    }

    //Declaramos los getters de category
    get name() {
        return this.#name;
    }

    get description() {
        return this.#description;
    }

    //Método toString que muestra las propiedades de category
    toString() {
        return this.#name + " " + this.#description;
    }

}

//Declaramos la clase resource
class Resource {

    //Declaramos las propiedades de resource
    #duration;
    #link;

    //Declaramos el constructor de resource
    constructor(duration, link) {

        this.#duration = duration;
        this.#link = link;

    }

    //Declaramos los getters de resource
    get duration() {
        return this.#duration;
    }

    get link() {
        return this.#link;
    }

    //Método toString que muestra las propiedades de resource
    toString() {
        return this.#duration + " " + this.#link;
    }

}

//Declaramos la clase abstracta production
class Production {

    //Declaramos las propiedades de production
    #title;
    #nationality;
    #publication;
    #synopsis;
    #image;

    //Declaramos el constructor de production
    constructor(title, nationality = "", publication, synopsis = "", image = "") {

        this.#title = title;
        this.#nationality = nationality;
        this.#publication = publication;
        this.#synopsis = synopsis;
        this.#image = image;

        //Si se intenta instanciar la clase production se lanza una excepción
        if (new.target === Production) {
            throw new AbstractException();
        }

    }

    //Declaramos los getters de production
    get title() {
        return this.#title;
    }

    get nationality() {
        return this.#nationality;
    }

    get publication() {
        return this.#publication;
    }

    get synopsis() {
        return this.#synopsis;
    }

    get image() {
        return this.#image;
    }

    //Método toString que muestra las propiedades de production
    toString() {
        return this.#title + "  " + this.#nationality + "  " + this.#publication + "  " + this.#synopsis + "  " + this.#image;
    }

}

//Declaramos la clase movie
class Movie extends Production {

    //Declaramos las propiedades de movie
    #resource;
    #locations;

    //Declaramos el constructor de movie
    constructor(title, nationality = "", publication, synopsis = "", image = "", resource = Resource, locations = Coordinate) {

        super(title, nationality, publication, synopsis, image);
        this.#resource = resource;
        this.#locations = locations;

    }

    //Declaramos los getters de movie
    get resource() {
        return this.#resource;
    }

    get locations() {
        return this.#locations;
    }

    //Método toString que muestra las propiedades de movie
    toString() {
        return super.toString() + " " + this.#resource + " " + this.#locations;
    }

}

//Declaramos la clase serie
class Serie extends Production {

    //Declaramos las propiedades de serie
    #resources;
    #locations;
    #seasons;

    //Declaramos el constructor de serie
    constructor(title, nationality = "", publication, synopsis = "", image = "", resources = [], locations = Coordinate, seasons = 0) {

        super(title, nationality, publication, synopsis, image);
        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;

    }

    //Declaramos los getters de serie
    get resources() {
        return this.#resources;
    }

    get locations() {
        return this.#locations;
    }

    get seasons() {
        return this.#seasons;
    }

    //Método toString que muestra las propiedades de serie
    toString() {
        return super.toString() + " " + this.#resources + " " + this.#locations + " " + this.#seasons;
    }

}

//Declaramos la clase user
class User {

    //Declaramos las propiedades de user
    #username;
    #email;
    #password;

    //Declaramos el constructor de user
    constructor(username, email, password) {

        this.#username = username;
        this.#email = email;
        this.#password = password;

    }

    //Declaramos los getters de user
    get username() {
        return this.#username;
    }

    get email() {
        return this.#email;
    }

    get password() {
        return this.#password;
    }

    //Método toString que muestra las propiedades de user
    toString() {
        return this.#username + " " + this.#email + " " + this.#password;
    }

}

//Declaramos la clase coordinate
class Coordinate {

    //Declaramos las propiedades de coordinate
    #latitude;
    #longitude;

    //Declaramos el constructor de coordinate
    constructor(latitude, longitude) {

        this.#latitude = latitude;
        this.#longitude = longitude;

        if (latitude < -90 || latitude > 90) {
            throw new InvalidLatitudeException();
        }

        if (longitude < -180 || longitude > 180) {
            throw new InvalidLongitudeException();
        }

    }

    //Declaramos los getters de coordinate
    get latitude() {
        return this.#latitude;
    }

    get longitude() {
        return this.#longitude;
    }

    //Método toString que muestra las propiedades de coordinate
    toString() {
        return this.#latitude + "°" + " " + this.#longitude + "°";
    }

}

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
            addCategorie(categorie) {

                //Comprobamos si la categoria es un objeto Category
                if ((categorie === null) || !(categorie instanceof Category)) {
                    throw new CategorieTypeException();
                }

                //Almacenamos la posición de la categoría
                let position = this.#getCategoryPosition(categorie);

                //Si esa categoría no está registrada, la registramos
                if (position === -1) {

                    this.#categories.push(
                        {
                            category: categorie,
                            producs: []
                        }
                    );

                } else {
                    throw new ExistedException();
                }

                return this.#categories.length;

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
                let index = this.#productions.findIndex((pro) => pro.title === production.title);

                //Si la producción existe la borramos
                if ((index !== -1)) {
                    this.#productions.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                //Devolvemos el total de producciones del sistema
                return this.#productions.length;

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
            assignActor(production, actor) {

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

                //Si no existe el autor lo añadimos y asignamos la última posición a actorPosition
                if (actorPosition === -1) {
                    this.addActor(actor);
                    actorPosition = this.#actors.length - 1;
                }

                //Almacenamos la posición del actor
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

                //Devolvemos el total de producciones asignadas al actor
                return this.#actors[actorPosition].producs.length;

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
            assignDirector(production, director) {

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

                //Si no existe el director lo añadimos y asignamos la última posición a directorPosition
                if (directorPosition === -1) {
                    this.addDirector(director);
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

                //Devolvemos el total de producciones asignadas al director
                return this.#directors[directorPosition].producs.length;

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

            getCategory(title) {

                let cat;

                for (let i = 0; i < this.#categories.length; i++) {
                    if (this.#categories[i].category.name === title) {
                        cat = this.#categories[i];
                    }

                }

                return cat;
            }

            getProduction(title) {

                let pro;

                for (let i = 0; i < this.#producs.length; i++) {
                    if (this.#producs[i].title === title) {
                        pro = this.#producs[i];
                    }

                }

                return pro;
            }

            randomProduction() {

                let pros = [];
                let pos = 0;

                for (let i = 0; i < 3; i++) {

                    pos = Math.floor(Math.random() * 11) + 1;

                    pros[i] = this.#producs[pos];

                    if (pros.includes(pos)) {
                        pos = Math.floor(Math.random() * 11) + 1;
                        pros[i] = this.#producs[pos];
                    } else {
                        pros[i] = this.#producs[pos];
                    }

                }

                return pros;

            }


            //Devuelve los actores correspondientes a una producción
            * getCast(production) {

                //Comprobamos que la producción es una instancia de Production
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                //Iteramos sobre los actores
                for (let pro of this.#actors) {

                    //Iteramos sobre producs de cada actor
                    let actor = null;
                    let i = 0;

                    //Mientras no se encuentre el actor se sigue recorriendo el array
                    while (i < pro.producs.length && !actor) {

                        //Comparamos por url
                        if (pro.producs[i].url === production.url) {
                            actor = pro.actor;
                        }
                        i++;
                    }

                    //Si encuentra el actor lo devuelve
                    if (actor) {
                        yield actor;
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

//Exportamos las clases y el objeto VideoSystem para utilizarlas en un archivo externo
export {
    Person,
    Category,
    Resource,
    Production,
    Movie,
    Serie,
    User,
    Coordinate
};