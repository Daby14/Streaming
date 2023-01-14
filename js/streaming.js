//Declaramos la clase Person
class Person {

    //Declaramos las propiedades de Person
    #name;
    #lastname1;
    #lastname2;
    #born;
    #picture;

    //Declaramos el constructor de Person
    constructor(name, lastname1, lastname2 = "", born, picture = ""){
        
        this.#name = name;
        this.#lastname1 = lastname1;
        this.#lastname2 = lastname2;
        this.#born = born;
        this.#picture = picture;

    }

    //Declaramos los getters de Person
    get name(){
        return this.#name;
    }

    get lastname1(){
        return this.#lastname1;
    }

    get lastname2(){
        return this.#lastname2;
    }

    get born(){
        return this.#born;
    }

    get picture(){
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
    constructor(name, description = ""){
        
        this.#name = name;
        this.#description = description;

    }

    //Declaramos los getters de category
    get name(){
        return this.#name;
    }

    get description(){
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
    constructor(duration, link){
        
        this.#duration = duration;
        this.#link = link;

    }

    //Declaramos los getters de resource
    get duration(){
        return this.#duration;
    }

    get link(){
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
    constructor(title, nationality = "", publication, synopsis = "", image = ""){
        
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
    get title(){
        return this.#title;
    }

    get nationality(){
        return this.#nationality;
    }

    get publication(){
        return this.#publication;
    }

    get synopsis(){
        return this.#synopsis;
    }

    get image(){
        return this.#image;
    }

    //Método toString que muestra las propiedades de production
    toString() {
        return this.#title + "  " + this.#nationality + "  " + this.#publication + "  " + this.#synopsis + "  " + this.#image;
    }

}

//Declaramos la clase movie
class Movie extends Production{

    //Declaramos las propiedades de movie
    #resource;
    #locations;

    //Declaramos el constructor de movie
    constructor(title, nationality = "", publication, synopsis = "", image = "", resource = Resource, locations = []){
        
        super(title, nationality, publication, synopsis, image);
        this.#resource = resource;
        this.#locations = locations;

    }

    //Declaramos los getters de movie
    get resource(){
        return this.#resource;
    }

    get locations(){
        return this.#locations;
    }

    //Método toString que muestra las propiedades de movie
    toString() {
        return super.toString() + " " + this.#resource + " " + this.#locations;
    }

}

//Declaramos la clase serie
class Serie extends Production{

    //Declaramos las propiedades de serie
    #resources;
    #locations;
    #seasons;

    //Declaramos el constructor de serie
    constructor(title, nationality = "", publication, synopsis = "", image = "", resources = [], locations = [], seasons = 0){
        
        super(title, nationality, publication, synopsis, image);
        this.#resources = resources;
        this.#locations = locations;
        this.#seasons = seasons;

    }

    //Declaramos los getters de serie
    get resources(){
        return this.#resources;
    }

    get locations(){
        return this.#locations;
    }

    get seasons(){
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
    constructor(username, email, password){
        
        this.#username = username;
        this.#email = email;
        this.#password = password;

    }

    //Declaramos los getters de user
    get username(){
        return this.#username;
    }

    get email(){
        return this.#email;
    }

    get password(){
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
    constructor(latitude, longitude){
        
        this.#latitude = latitude;
        this.#longitude = longitude;

    }

    //Declaramos los getters de coordinate
    get latitude(){
        return this.#latitude;
    }

    get longitude(){
        return this.#longitude;
    }

    //Método toString que muestra las propiedades de coordinate
    toString() {
        return this.#latitude + " " + this.#longitude;
    }

}