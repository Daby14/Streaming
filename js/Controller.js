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

        //!CATEGORIAS
        let categoria1 = new Category("Categoria1", "Acción");
        let categoria2 = new Category("Categoria2", "Deportes");
        let categoria3 = new Category("Categoria3", "Aventura");

        //!RESOURCE
        let resource1 = new Resource("94", "movies/movie.mp4");

        //!COORDINATE
        let coordinate1 = new Coordinate(-90, 90);

        //!SERIES
        let produccion1 = new Serie("El señor de los anillos", "Nueva Zelanda", "12/01/2022", "Los héroes se enfrentan al temido resurgimiento del mal en la Tierra Media, forjando legados que perdurarán mucho tiempo después de su desaparición", "images/image1.jpg", "Volcán", coordinate1, 3);
        let produccion2 = new Serie("La que se avecina", "España", "24/09/2008", "Bruno propone a Enrique que se hagan veganos. Por otro lado, Berta propone un viaje a Antonio, pero éste, que sospecha que su mujer le está engañando, rechaza el plan y empieza a seguirla para descubrir al amante.", "images/image2.jpg", "Edificio Contubernio", coordinate1, 13);
        let produccion3 = new Serie("La casa de papel", "España", "05/06/2018", "Una banda organizada de ladrones tiene el objetivo de cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe", "images/image3.jpg", "Banco Nacional de Moneda y Timbre", coordinate1, 5);
        let produccion4 = new Serie("The Shooter", "California", "15/11/2016", "El francotirador Bob Lee Swagger debe evitar un complot contra el presidente de los Estados Unidos. Isaac Johnson, un exmarine y ahora agente del Servicio Secreto, convence a Swagger para investigar dicho complot", "images/image4.jpg", "USA Network", coordinate1, 3);
        let produccion5 = new Serie("The Witcher", "Estados Unidos", "20/12/2019", "El brujo Geralt, un cazador de monstruos, trata de encontrar su lugar en un mundo en el que las personas suelen ser más malvadas que las bestias", "images/image5.jpg", "Mundo medieval", coordinate1, 2);
        let produccion6 = new Serie("Ni una palabra", "Estados Unidos", "22/04/2022", "Los residentes de una urbanización rica cerca de Varsovia están conmocionados por la desaparición de Adam, de 18 años. A medida que surgen más secretos, los padres preocupados hacen todo lo posible para proteger a sus hijos", "images/image6.jpg", "Volcán", coordinate1, 3);

        //!PELÍCULAS
        let produccion7 = new Movie("El Hobbit", "Nueva Zelanda", "28/11/2012", "La trilogía de El hobbit, adaptación cinematográfica basada en la novela homónima, comprende tres películas épicas de fantasía, acción y aventuras: El hobbit: un viaje inesperado, El hobbit: la desolación de Smaug y El hobbit: la batalla de los Cinco Ejércitos", "images/image7.jpg", resource1, coordinate1);
        let produccion8 = new Movie("Jaula", "España", "09/09/2022", "Cuando una pareja encuentra a una niña traumatizada de origen desconocido, la esposa, Paula, debe descifrar los extraños comportamientos de la niña para desvelar su identidad y su oscuro pasado", "images/image8.jpg", resource1, coordinate1);
        let produccion9 = new Movie("Objetos", "España", "30/09/2022", "Objetos es una película de suspenso de 2022 dirigida por Jorge Dorado con guion de Natxo López y protagonizada por Álvaro Morte, China Suárez y Verónica Echegui. Es una coproducción hispano-argentina-alemana", "images/image9.jpg", resource1, coordinate1);
        let produccion10 = new Movie("Smile", "Estados Unidos", "30/09/2022", "Tras presenciar el dramático incidente sufrido por un paciente, la Dra. Cotter experimenta hechos aterradores sin explicación aparente. A medida que el horror se adueña de su vida, comprende que la respuesta está en su propio pasado", "images/image10.jpg", resource1, coordinate1);
        let produccion11 = new Movie("The Invitation", "Estados Unidos", "26/08/2022", "Tras morir su hermana, Evie queda sin familiares, pero un análisis de ADN le revela la existencia de un primo distante. La nueva familia la invita a una boda en Inglaterra, y lo que empieza como un cuento de hadas se transforma en una pesadilla", "images/image11.jpg", resource1, coordinate1);
        let produccion12 = new Movie("Hacia la libertad", "Estados Unidos", "12/10/2022", "Peter, un esclavo, huye de una plantación en Luisiana después de haber sido azotado. Ahora, tiene que burlar a los cazadores de sangre fría y a los implacables pantanos de Luisiana en un tortuoso viaje hacia el norte", "images/image12.jpg", resource1, coordinate1);

        //!DIRECTORES
        let director1 = new Person("Alvaro", "Sanchez", "Caminero", "05/09/1968", "images/image1.jpg");
        let director2 = new Person("Pedro", "Sanchez", "Diaz", "01/01/1969", "images/image2.jpg");
        let director3 = new Person("Victor", "Diaz", "Sanchez", "02/02/1970", "images/image3.jpg");
        let director4 = new Person("Jose", "Diaz", "Caminero", "03/03/1971", "images/image4.jpg");
        let director5 = new Person("Angel", "Perez", "Gonzalez", "04/04/1972", "images/image5.jpg");
        let director6 = new Person("Tomás", "Sanchez", "Gonzalez", "05/05/1973", "images/image6.jpg");
        let director7 = new Person("David", "Caminero", "Gonzalez", "06/06/1974", "images/image7.jpg");
        let director8 = new Person("Javier", "Perez", "Diaz", "07/07/1975", "images/image8.jpg");
        let director9 = new Person("Alejandro", "Rodriguez", "Diaz", "08/08/1976", "images/image9.jpg");
        let director10 = new Person("Claudia", "Blanco", "Viso", "09/09/1977", "images/image10.jpg");
        let director11 = new Person("Sonia", "Fernandez", "Diaz", "10/10/1978", "images/image11.jpg");
        let director12 = new Person("Laura", "Vidal", "Roldán", "11/11/1979", "images/image12.jpg");

        //!ACTORES
        let actor1 = new Person("Jose Carlos", "Gonzalez", "Tirado", "01/01/2003", "images/image1.jpg");
        let actor2 = new Person("Carmen", "Becerra", "Martín", "02/01/2003", "images/image1.jpg");
        let actor3 = new Person("Cristian", "Sanchez", "Diaz", "03/01/2003", "images/image2.jpg");
        let actor4 = new Person("Ana", "Vargas", "Ramírez", "04/01/2003", "images/image2.jpg");
        let actor5 = new Person("Victor", "Vallez", "Manzanares", "05/01/2003", "images/image3.jpg");
        let actor6 = new Person("Marta", "Bautista", "Diaz", "06/01/2003", "images/image3.jpg");
        let actor7 = new Person("Jose Angel", "Vargas", "Sanchez", "07/01/2003", "images/image4.jpg");
        let actor8 = new Person("Judit", "Diaz", "Sanchez", "08/01/2003", "images/image4.jpg");
        let actor9 = new Person("Alvaro", "Sanchez", "Redondo", "09/01/2003", "images/image5.jpg");
        let actor10 = new Person("Clara", "Diaz", "Lopez", "10/01/2003", "images/image5.jpg");
        let actor11 = new Person("Jose", "Romero", "Monforte", "11/01/2003", "images/image6.jpg");
        let actor12 = new Person("Marta", "Sanchez", "Lopez", "12/01/2003", "images/image6.jpg");
        let actor13 = new Person("Pedro", "Romero", "Lopez", "13/01/2003", "images/image7.jpg");
        let actor14 = new Person("Beatriz", "Diaz", "Romero", "14/01/2003", "images/image7.jpg");
        let actor15 = new Person("Leonardo", "Vargas", "Diaz", "15/01/2003", "images/image8.jpg");
        let actor16 = new Person("Rebeca", "Lopez", "Sanchez", "16/01/2003", "images/image8.jpg");
        let actor17 = new Person("Francisco", "Naranjo", "Martinez", "17/01/2003", "images/image9.jpg");
        let actor18 = new Person("Daniela", "Martín", "Lopez", "18/01/2003", "images/image9.jpg");
        let actor19 = new Person("Alejandro", "Martinez", "Nieto", "19/01/2003", "images/image10.jpg");
        let actor20 = new Person("Amalia", "Romero", "Martinez", "20/01/2003", "images/image10.jpg");
        let actor21 = new Person("Diego", "Martín", "Blanco", "21/01/2003", "images/image11.jpg");
        let actor22 = new Person("Eva", "Ureña", "Sanchez", "22/01/2003", "images/image11.jpg");
        let actor23 = new Person("Javier", "Romero", "Barba", "23/01/2003", "images/image12.jpg");
        let actor24 = new Person("Ainhoa", "Serrano", "Montero", "24/01/2003", "images/image12.jpg");

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

        this.#model.assignDirector(produccion1, director1);
        this.#model.assignDirector(produccion2, director2);
        this.#model.assignDirector(produccion3, director3);
        this.#model.assignDirector(produccion4, director4);
        this.#model.assignDirector(produccion5, director5);
        this.#model.assignDirector(produccion6, director6);
        this.#model.assignDirector(produccion7, director7);
        this.#model.assignDirector(produccion8, director8);
        this.#model.assignDirector(produccion9, director9);
        this.#model.assignDirector(produccion10, director10);
        this.#model.assignDirector(produccion11, director11);
        this.#model.assignDirector(produccion12, director12);

        this.#model.assignActor(produccion1, actor1);
        this.#model.assignActor(produccion1, actor2);
        this.#model.assignActor(produccion2, actor3);
        this.#model.assignActor(produccion2, actor4);
        this.#model.assignActor(produccion3, actor5);
        this.#model.assignActor(produccion3, actor6);
        this.#model.assignActor(produccion4, actor7);
        this.#model.assignActor(produccion4, actor8);
        this.#model.assignActor(produccion5, actor9);
        this.#model.assignActor(produccion5, actor10);
        this.#model.assignActor(produccion6, actor11);
        this.#model.assignActor(produccion6, actor12);
        this.#model.assignActor(produccion7, actor13);
        this.#model.assignActor(produccion7, actor14);
        this.#model.assignActor(produccion8, actor15);
        this.#model.assignActor(produccion8, actor16);
        this.#model.assignActor(produccion9, actor17);
        this.#model.assignActor(produccion9, actor18);
        this.#model.assignActor(produccion10, actor19);
        this.#model.assignActor(produccion10, actor20);
        this.#model.assignActor(produccion11, actor21);
        this.#model.assignActor(produccion11, actor22);
        this.#model.assignActor(produccion12, actor23);
        this.#model.assignActor(produccion12, actor24);

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

        let pros = this.#model.randomProduction(3);

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

        let director;
        let actors = [];
        let pos = 0;

        let pro = this.#model.getProduction(serial);

        for (let pros of this.#model.getCast2(pro)) {
            director = pros;
        }

        for (let actor of this.#model.getCast(pro)) {
            actors[pos] = actor;
            pos++;
        }

        // for(let i = 0; i < actors.length; i++) {
        //     console.log(actors[i]);
        // }

        this.#view.showProduct(pro, director, actors);
    }

    onAddCategory = () => {

        this.#view.showCategoriesInMenu(this.#model.categories);
        this.#view.bindProductsCategoryListInMenu(
            this.handleProductsCategoryList
        );
    }

    onAddDirector = () => {

    }

    handleProductsCategoryList = (type) => {
        this.handleShowShoppingCart(type);
    }

}

export default Controller;