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