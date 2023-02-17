import {
    Person, Category, Resource,
    Production, Movie, Serie,
    User, Coordinate
} from "./Model.js";

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

        let produccion1 = new Serie("El señor de los anillos", "Nueva Zelanda", "12/01/2022", "Destruir el anillo", "images/image1.jpg", "Volcán", coordinate1, 3);
        let produccion2 = new Serie("La que se avecina", "España", "24/09/2008", "Historias de ficción", "images/image2.jpg", "Edificio Contubernio", coordinate1, 13);
        let produccion3 = new Serie("La casa de papel", "España", "05/06/2018", "Fabricar dinero", "images/image3.jpg", "Banco Nacional de Moneda y Timbre", coordinate1, 5);
        let produccion4 = new Serie("The Shooter", "California", "15/11/2016", "Evitar complot contra el presidente de los EEUU", "images/image4.jpg", "USA Network", coordinate1, 3);
        let produccion5 = new Serie("The Witcher", "Estados Unidos", "20/12/2019", "Leyenda de Geralt de Rivia y la princesa Ciri", "images/image5.jpg", "Mundo medieval", coordinate1, 2);
        let produccion6 = new Serie("Ni una palabra", "Estados Unidos", "22/04/2022", "Desaparición de una hija", "images/image6.jpg", "Volcán", coordinate1, 3);



        let produccion7 = new Movie("El Hobbit", "Nueva Zelanda", "28/11/2012", "Recuperar el territorio de Erebor", "images/image7.jpg", resource1, coordinate1);
        let produccion8 = new Movie("Jaula", "España", "09/09/2022", "Descifrar los extraños comportamientos de la niña para desvelar su identidad y su oscuro pasado", "images/image8.jpg", resource1, coordinate1);
        let produccion9 = new Movie("Objetos", "España", "30/09/2022", "Investigación sobre una red que trata a las personas como objetos", "images/image9.jpg", resource1, coordinate1);
        let produccion10 = new Movie("Smile", "Estados Unidos", "30/09/2022", "La Dra. Cotter investiga unos hechos aterradores sin explicación aparente sobre su persona", "images/image10.jpg", resource1, coordinate1);
        let produccion11 = new Movie("Movie_5", "España", "12/10/2022", "Conseguir la corona", "images/image11.jpg", resource1, coordinate1);
        let produccion12 = new Movie("Movie_6", "España", "12/10/2022", "Conseguir la corona", "images/image12.jpg", resource1, coordinate1);

        this.#model.addCategorie(categoria1);
        this.#model.addCategorie(categoria2);
        this.#model.addCategorie(categoria3);

        this.#model.assignCategory(produccion1, categoria1);
        this.#model.assignCategory(produccion2, categoria1);
        this.#model.assignCategory(produccion3, categoria1);
        this.#model.assignCategory(produccion4, categoria1);

        this.#model.assignCategory(produccion5, categoria2);
        this.#model.assignCategory(produccion6, categoria2);
        this.#model.assignCategory(produccion7, categoria2);
        this.#model.assignCategory(produccion8, categoria2);

        this.#model.assignCategory(produccion9, categoria3);
        this.#model.assignCategory(produccion10, categoria3);
        this.#model.assignCategory(produccion11, categoria3);
        this.#model.assignCategory(produccion12, categoria3);

    }

    constructor(model, view) {
        this.#model = model;
        this.#view = view;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();

        // Enlazamos handlers con la vista
        this.#view.bindInit(this.handleInit);

        this.#view.bindShowMovies(this.handleShowShoppingCart);

    }

    onInit = () => {

        let pros;

        pros = this.#model.randomProduction(3);

        this.#view.showProductTypes(pros);
        this.#view.bindShowMovies(this.handleShowShoppingCart);
        this.#view.bindShowProducts(this.handleShowProduct);
    }

    handleInit = () => {
        this.onInit();
    }

    onLoad = () => {
        this.#loadObjects();
        this.onAddCategory();
    }

    handleShowShoppingCart = (type) => {

        let title = "";

        let category = this.#model.getCategory(type);

        const iterator = category.producs[Symbol.iterator]();

        if (type === "Categoria1") title = "Categoria 1";

        if (type === "Categoria2") title = "Categoria 2";

        if (type === "Categoria3") title = "Categoria 3";

        this.#view.showMovies(iterator, title);
        this.#view.bindShowProduct(this.handleShowProduct);

    }

    handleShowProduct = (serial) => {
        let pro = this.#model.getProduction(serial);

        this.#view.showProduct(pro, "hola");
    }

    onAddCategory = () => {

        this.#view.showCategoriesInMenu(this.#model.categories);
        this.#view.bindProductsCategoryListInMenu(
            this.handleProductsCategoryList
        );
    }

    handleProductsCategoryList = (type) => {
        this.handleShowShoppingCart(type);
    }

}

export default Controller;