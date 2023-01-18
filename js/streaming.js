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
    DefaultCategoryImageManagerException,
    CategoryNotExistsImageManagerException
} from '/js/exceptions.js';

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
    constructor(title, nationality = "", publication, synopsis = "", image = "", resource = Resource, locations = []) {

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
    constructor(title, nationality = "", publication, synopsis = "", image = "", resources = [], locations = [], seasons = 0) {

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
        return this.#latitude + " " + this.#longitude;
    }

}

//Objecto VideoSystem único
let VideoSystem = (function () {

    let instatiated;

    function init(name) { //Inicialización del Singleton

        class VideoSystem {

            #name;

            //Declaramos la lista de producciones
            #producs = [];

            //Categoría por defecto
            #defaultCategory = new Category("Anonymous category");

            #defaultCategoryImages;

            //Declaramos la lista categories donde vamos a ir almacenando las categorias del sistema
            #categories = [];

            //Devuelve un iterator de los autores del gestor
            get defaultCategory() {
                return this.#defaultCategory;
            }

            constructor(name) {

                this.#name = name;

                //Comprobamos si el name está vacío
                if (this.#name === "") {
                    throw new EmptyNameException();
                }

                //Añadimos category por defecto.
				this.addCategorie(this.#defaultCategory);
				this.#defaultCategoryImages = this.#categories[0].producs;

            }

            //Getter de name
            get name() {
                return this.#name;
            }

            //Setter de name
            set name(name) {
                this.#name = name;
            }

            #getCategoryPosition(categorie) {

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

                //Si la categoria no está previamente en la lista la añadimos
                // if ((this.#categories.findIndex((cat) => cat.name === categorie.name) !== -1)) {
                //     throw new ExistedException();
                // }

                let position = this.#getCategoryPosition(categorie);

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

                let index = this.#getCategoryPosition(categorie);

                if ((index !== -1)) {
                    this.#categories.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                return this.#categories.length;

            }

            //Elimina una categoría del gestor
			// removeCategory(categorie) {
			// 	if (!(categorie instanceof Category)) {
			// 		throw new CategorieTypeException();
			// 	}
			// 	let position = this.#getCategoryPosition(categorie);
			// 	if (position !== -1) {
			// 		if (categorie.title !== this.#defaultCategory.title) {

			// 			// Recogemos todas los índices de las categorías menos las de por defecto y la que estamos borrando
			// 			let restPositions = Array.from(Array(this.#categories.length), (el, i) => i);
			// 			restPositions.splice(position, 1);
			// 			restPositions.splice(0, 1);
			// 			// Recorremos todas las imágenes de la categoría que estamos borrando 
			// 			for (let pro of this.#categories[position].producs) {
			// 				let insertInDefault = true;
			// 				for (let index of restPositions) { // Chequeamos si cada imagen pertenece a otra categoría que no sea la de por defecto
			// 					if (this.#getProductionPosition(pro, this.#categories[index].producs) > -1) {
			// 						insertInDefault = false;
			// 						break;
			// 					}
			// 				}
			// 				if (insertInDefault) this.#categories[0].producs.push(pro);
			// 			}
			// 			this.#categories.splice(position, 1);
			// 		} else {
			// 			throw new DefaultCategoryImageManagerException();  //DefaultCategoryImageManagerException
			// 		}
			// 	} else {
			// 		throw new CategoryNotExistsImageManagerException();  //CategoryNotExistsImageManagerException
			// 	}
			// 	return this;
			// }

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

            //Declaramos la lista users donde vamos a ir almacenando los usuarios del sistema
            #users = [];

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

                this.#users.push(user);

                return this.#users.length;

            }

            //Método que dado un objeto user lo elimina del sistema
            removeUser(user) {

                let index = this.#users.findIndex((us) => us.username === user.username);

                //Comprobamos si el usuario es un objeto User
                if ((user === null) || !(user instanceof User)) {
                    throw new UserTypeException();
                }

                if ((index !== -1)) {
                    this.#users.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

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

            //Declaramos la lista productions donde vamos a ir almacenando las producciones del sistema
            #productions = [];

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

                this.#productions.push(production);

                return this.#productions.length;

            }

            //Método que dado un objeto production lo elimina del sistema
            removeProduction(production) {

                let index = this.#productions.findIndex((pro) => pro.title === production.title);

                //Comprobamos si la producción es un objeto Production
                if ((production === null) || !(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                if ((index !== -1)) {
                    this.#productions.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                return this.#productions.length;

            }

            //Devuelve el objeto iterador que permite recuperar los usuarios del sistema
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

            //Declaramos la lista actors donde vamos a ir almacenando los actores del sistema
            #actors = [];

            //Método que añade actores
            addActor(actor) {

                //Comprobamos si el actor es un objeto Person
                if ((actor === null) || !(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Comprobamos si el actor existe
                if ((this.#actors.findIndex((act) => act.name === actor.name) !== -1)) {
                    throw new ExistedException();
                }

                this.#actors.push(actor);

                return this.#actors.length;

            }

            //Método que dado un objeto actor lo elimina del sistema
            removeActor(actor) {

                let index = this.#actors.findIndex((act) => act.name === actor.name);

                //Comprobamos si el actor es un objeto Person
                if ((actor === null) || !(actor instanceof Person)) {
                    throw new PersonTypeException();
                }

                if ((index !== -1)) {
                    this.#actors.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                return this.#actors.length;

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

            //Declaramos la lista directors donde vamos a ir almacenando los directores del sistema
            #directors = [];

            //Método que añade directores
            addDirector(director) {

                //Comprobamos si el director es un objeto Person
                if ((director === null) || !(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                //Comprobamos si el director existe
                if ((this.#directors.findIndex((dir) => dir.name === director.name) !== -1)) {
                    throw new ExistedException();
                }

                this.#directors.push(director);

                return this.#directors.length;

            }

            //Método que dado un objeto director lo elimina del sistema
            removeDirector(director) {

                let index = this.#directors.findIndex((dir) => dir.name === director.name);

                //Comprobamos si el director es un objeto Person
                if ((director === null) || !(director instanceof Person)) {
                    throw new PersonTypeException();
                }

                if ((index !== -1)) {
                    this.#directors.splice(index, 1);
                } else {
                    throw new IndexOutException();
                }

                return this.#directors.length;

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

            #getProductionPosition(production, producs = this.#producs) {
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }

                function compareElements(element) {
                    return (element.title === production.title)
                }

                return producs.findIndex(compareElements);
            }

            addProductions(production, categorie = this.defaultCategory) {
                if (!(production instanceof Production)) {
                    throw new ProductionTypeException();
                }
                if (!(categorie instanceof Category)) {
                    throw new CategorieTypeException();
                }
                // if (!(actor instanceof Person)) {
                // 	throw new PersonTypeException();
                // }

                // if (!(director instanceof Person)) {
                // 	throw new PersonTypeException();
                // }

                //Obtenemos posición de la categoría. Si no existe se añade.
                let categoryPosition = this.#getCategoryPosition(categorie);
                if (categoryPosition === -1) {
                    this.addCategorie(categorie);
                    categoryPosition = this.#categories.length - 1;
                }

                // //Obtenemos posición del autor. Si no existe se añade.
                // let authorPosition = this.#getAuthorPosition(author);
                // if (authorPosition === -1) {
                // 	this.addAuthor(author);
                // 	authorPosition = this.#authors.length - 1;
                // }

                //Obtenemos posición de la imagen. Si no existe se añade.
                let productionPosition = this.#getProductionPosition(production);
                if (productionPosition === -1) {
                    this.#producs.push(production);
                    productionPosition = this.#producs.length - 1;
                }

                // // Verificamos que la imagen no pertenece a otro autor.
                // let owner = this.getImageAuthor(image);
                // if (owner !== null && owner.nickname !== author.nickname) {
                // 	throw new ImageBelongsDifferentAuthorManagerException();
                // }

                // Asiganamos la imagen al autor si no existe
                // if (this.#getImagePosition(image, this.#authors[authorPosition].images) === -1) {
                // 	this.#authors[authorPosition].images.push(this.#images[imagePosition]);
                // }

                // Asiganamos la producción a la categoría si no existe
                if (this.#getProductionPosition(production, this.#categories[categoryPosition].producs) === -1) {
                    this.#categories[categoryPosition].producs.push(this.#producs[productionPosition]);
                }

                return this;
            }

        }

        let sc = new VideoSystem(name);//Devolvemos el objeto HighSchool para que sea una instancia única.
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

//Exportamos las clases y el objeto VideoSystem para utilizarlas en un archivo externo
export {
    Person,
    Category,
    Resource,
    Production,
    Movie,
    Serie,
    User,
    Coordinate,
    VideoSystem
};