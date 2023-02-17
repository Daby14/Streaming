//Importamos las clases del products.js
import {
    Person, Category, Resource,
    Production, Movie, Serie,
    User, Coordinate
} from "../entities/products.js";

//Clase Controller
class Controller {

    //Declaramos los campos privados
    #model;
    #view;

    //Método que carga los objetos con los que vamos a trabajar en nuestra web
    #loadObjects() {

        //Declaramos dichos objetos

        //!CATEGORIAS
        let categoria1 = new Category("Categoria1", "Acción");
        let categoria2 = new Category("Categoria2", "Ficción");
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
        let actor1 = new Person("Morfydd", "Clark", "(Galadriel)", "01/01/2003", "images/actor1.jpg");
        let actor2 = new Person("Robert", "Aramayo", "(Elrond)", "02/01/2003", "images/actor2.jpg");
        let actor3 = new Person("Pablo", "Chiapella", "(Amador)", "03/01/2003", "images/actor3.jpg");
        let actor4 = new Person("Jordi", "Sanchez", "(Antonio)", "04/01/2003", "images/actor4.jpg");
        let actor5 = new Person("Jaime", "Llorente", "(Denver)", "05/01/2003", "images/actor5.jpg");
        let actor6 = new Person("Pedro", "Alonso", "(Berlín)", "06/01/2003", "images/actor6.jpg");
        let actor7 = new Person("Jose Angel", "Vargas", "Sanchez", "07/01/2003", "images/image4.jpg");
        let actor8 = new Person("Judit", "Diaz", "Sanchez", "08/01/2003", "images/image4.jpg");
        let actor9 = new Person("Alvaro", "Sanchez", "Redondo", "09/01/2003", "images/image5.jpg");
        let actor10 = new Person("Clara", "Diaz", "Lopez", "10/01/2003", "images/image5.jpg");
        let actor11 = new Person("Jose", "Romero", "Monforte", "11/01/2003", "images/image6.jpg");
        let actor12 = new Person("Elena", "Sanchez", "Lopez", "12/01/2003", "images/image6.jpg");
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

        //!ADD CATEGORIE
        this.#model.addCategorie([categoria1, categoria2, categoria3]);

        //!ASSIGN CATEGORY
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

        //!ASSIGN DIRECTOR
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

        //!ASSIGN ACTOR

        this.#model.assignActor(produccion1, [actor1, actor2]);
        this.#model.assignActor(produccion2, [actor3, actor4]);
        this.#model.assignActor(produccion3, [actor5, actor6]);
        this.#model.assignActor(produccion4, [actor7, actor8]);
        this.#model.assignActor(produccion5, [actor9, actor10]);
        this.#model.assignActor(produccion6, [actor11, actor12]);
        this.#model.assignActor(produccion7, [actor13, actor14]);
        this.#model.assignActor(produccion8, [actor15, actor16]);
        this.#model.assignActor(produccion9, [actor17, actor18]);
        this.#model.assignActor(produccion10, [actor19, actor20]);
        this.#model.assignActor(produccion11, [actor21, actor22]);
        this.#model.assignActor(produccion12, [actor23, actor24]);

    }

    //Constructor
    constructor(model, view) {
        this.#model = model;
        this.#view = view;

        // Eventos iniciales del Controlador
        this.onLoad();
        this.onInit();

        // Enlazamos handlers con la vista
        this.#view.bindInit(this.handleInit);
        this.#view.bindShowCategory(this.handleShowCategory);

    }

    //Método onInit
    onInit = () => {

        //Obtenemos 3 producciones aleatorias
        let pros = this.#model.randomProduction(3);

        //Llamamos al método para mostrar esas producciones aleatorias y a los eventos
        this.#view.showPrincipalElements(pros);
        this.#view.bindShowCategory(this.handleShowCategory);
        this.#view.bindShowProduction(this.handleShowProduct);
    }

    //Método hHandle que llama al onInit
    handleInit = () => {
        this.onInit();
    }

    //Método onLoad que carga los objetos con los que vamos a trabajar
    onLoad = () => {
        this.#loadObjects();
        this.onAddCategory();
        this.onAddDirector();
        this.onAddActor();
    }

    //Método handle que muestra las producciones correspondientes a una categoría
    handleShowCategory = (type) => {

        let title = "";

        //Obtenemos la categoría correspondiente
        let category = this.#model.getCategory(type);

        const iterator = category.producs[Symbol.iterator]();

        if (type === "Categoria1") title = "Categoria 1";

        if (type === "Categoria2") title = "Categoria 2";

        if (type === "Categoria3") title = "Categoria 3";

        //Llamamos al método para mostrar las producciones correspondientes a dicha categoría y llamamos al evento
        this.#view.showProductions(iterator, title);
        this.#view.bindShowCardProduct(this.handleShowProduct);

    }

    //Método handle que muestra la carta de una producción con sus actores y sus directores correspondientes
    handleShowProduct = (serial) => {

        let director;
        let actors = [];
        let pos = 0;

        //Obtenemos la producción según su serial
        let pro = this.#model.getProduction(serial);

        //Obtenemos el director correspondiente a la producción
        for (let pros of this.#model.getCast2(pro)) {
            director = pros;
        }

        //Obtenemos los actores correspondiente a la producción
        for (let actor of this.#model.getCast(pro)) {
            actors[pos] = actor;
            pos++;
        }

        //Llamamos al método para mostrar la información de la producción con sus actores y directores correspondientes
        this.#view.showCardProduction(pro, director, actors);
    }

    //Método onAddCategory que muestra las categorías en el menú
    onAddCategory = () => {
        this.#view.showCategoriesInMenu(this.#model.categories);
        this.#view.bindProductsCategoryListInMenu(
            this.handleProductsCategoryList
        );
    }

    //Método handle que llama al handleShowCategory
    handleProductsCategoryList = (type) => {
        this.handleShowCategory(type);
    }

    //Método onAddDirector que muestra los directores en el menú
    onAddDirector = () => {
        this.#view.showDirectorInMenu(this.#model.directors);
        this.#view.bindProductsDirectorListInMenu(
            this.handleProductsDirectorList
        );
    }

    //Método handle que llama al handleShowCategory
    handleProductsDirectorList = (type) => {
        this.handleShowDirector(type);
    }

    //Método handle que muestra la carta de una producción con sus actores y sus directores correspondientes
    handleShowDirector = (serial) => {

        let dir = this.#model.getDirector(serial);

        let produccion;

        for (let pro of dir.producs) {
            produccion = pro;
        }

        this.#view.showCardDirector(produccion, dir)

    }

    //Método onAddActor que muestra los actores en el menú
    onAddActor = () => {
        this.#view.showActorInMenu(this.#model.actors);
        this.#view.bindProductsActorListInMenu(
            this.handleProductsActorList
        );
    }

    //Método handle que llama al handleShowCategory
    handleProductsActorList = (type) => {
        this.handleShowActor(type);
    }

    //Método handle que muestra la carta de una producción con sus actores y sus directores correspondientes
    handleShowActor = (serial) => {

        let act = this.#model.getActor(serial);

        let produccion;

        for (let pro of act.producs) {
            produccion = pro;
        }

        this.#view.showCardActor(produccion, act)

    }

}

export default Controller;