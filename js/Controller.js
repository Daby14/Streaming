import {
    Person, Category, Resource,
    Production, Movie, Serie,
    User, Coordinate
} from "./model.js";

class Controller {
    //Campos privados
    #model;
    #view;

    #loadObjects() {
        //Declaramos los objetos con los que vamos a trabajar en nuestra web
        let categoria1 = new Category("Categoria1", "Acción");
        let categoria2 = new Category("Categoria2", "Deportes");
        let categoria3 = new Category("Categoria3", "Aventura");

        let resource1 = new Resource("94", "movies/movie.mp4");
        let coordinate1 = new Coordinate(-90, 90);

        let produccion1 = new Serie("El señor de los anillos", "Nueva Zelanda", "12/01/2022", "Encontrar el anillo", "images/image1.jpg", "Volcán", coordinate1, 3);
        let produccion2 = new Serie("La que se avecina", "España", "24/09/2008", "Historias de ficción", "images/image2.jpg", "Edificio Contubernio", coordinate1, 13);
        let produccion3 = new Serie("La casa de papel", "España", "05/06/2018", "Fabricar dinero", "images/image3.jpg", "Banco Nacional de Moneda y Timbre", coordinate1, 5);
        let produccion4 = new Serie("The Shooter", "California", "15/11/2016", "Evitar complot contra el presidente de los EEUU", "images/image4.jpg", "USA Network", coordinate1, 3);
        let produccion5 = new Serie("The Witcher", "Estados Unidos", "20/12/2019", "Leyenda de Geralt de Rivia y la princesa Ciri", "images/image5.jpg", "Mundo medieval", coordinate1, 2);
        let produccion6 = new Serie("Ni una palabra", "Estados Unidos", "22/04/2022", "Desaparición de una hija", "images/image6.jpg", "Volcán", coordinate1, 3);



        let produccion7 = new Movie("Movie_1", "España", "12/10/2022", "Conseguir la corona", "images/image7.jpg", resource1, coordinate1);
        let produccion8 = new Movie("Movie_2", "España", "12/10/2022", "Conseguir la corona", "images/image8.jpg", resource1, coordinate1);
        let produccion9 = new Movie("Movie_3", "España", "12/10/2022", "Conseguir la corona", "images/image9.jpg", resource1, coordinate1);
        let produccion10 = new Movie("Movie_4", "España", "12/10/2022", "Conseguir la corona", "images/image10.jpg", resource1, coordinate1);
        let produccion11 = new Movie("Movie_5", "España", "12/10/2022", "Conseguir la corona", "images/image11.jpg", resource1, coordinate1);
        let produccion12 = new Movie("Movie_6", "España", "12/10/2022", "Conseguir la corona", "images/image12.jpg", resource1, coordinate1);

        // try {
        //     this.#model.addCategorie(categoria1);
        // } catch (error) {
        //     console.error(error);
        // }

        // try {
        //     this.#model.addCategorie(categoria2);
        // } catch (error) {
        //     console.error(error);
        // }

        // try {
        //     this.#model.addCategorie(categoria3);
        // } catch (error) {
        //     console.error(error);
        // }

    }

    constructor(model, view) {
        this.#model = model;
        this.#view = view;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();
        // this.onNumberProductsInCartChanged();

        // Enlazamos handlers con la vista
        this.#view.bindInit(this.handleInit);
        //this.#shoppingCartView.bindInit(this.handleInit.bind(this));
        this.#view.bindShowMovies(this.handleShowShoppingCart);

    }

    onInit = () => {
        this.#view.showProductTypes();
    }

    handleInit = () => {
        this.onInit();
    }

    onLoad = () => {
        this.#loadObjects();
    }

    handleShowShoppingCart = () => {
        this.#view.showMovies();
    }

}

export default Controller;