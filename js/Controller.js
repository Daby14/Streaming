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
        let categoria1 = new Category("Acción", "Acción", "Acción");
        let categoria2 = new Category("Ficción", "Ficción", "Ficción");
        let categoria3 = new Category("Aventura", "Aventura", "Aventura");

        //!RESOURCE
        let resource1 = new Resource("169", "movies/movie1.mp4");
        let resource2 = new Resource("106", "movies/movie2.mp4");
        let resource3 = new Resource("100", "movies/movie3.mp4");
        let resource4 = new Resource("115", "movies/movie4.mp4");
        let resource5 = new Resource("104", "movies/movie5.mp4");
        let resource6 = new Resource("132", "movies/movie6.mp4");

        //!COORDINATE
        let coordinate1 = new Coordinate(-41.28664, 174.77557);
        let coordinate2 = new Coordinate(40.4165, -3.70256 );
        let coordinate3 = new Coordinate(39.09973, -94.57857);
        let coordinate4 = new Coordinate(35.1258000, -117.9859000);

        //!SERIES
        let produccion1 = new Serie("El señor de los anillos", "Nueva Zelanda", "12/01/2022", "Los héroes se enfrentan al temido resurgimiento del mal en la Tierra Media, forjando legados que perdurarán mucho tiempo después de su desaparición", "images/image1.jpg", "Volcán", coordinate1, 3);
        let produccion2 = new Serie("La que se avecina", "España", "24/09/2008", "Bruno propone a Enrique que se hagan veganos. Por otro lado, Berta propone un viaje a Antonio, pero éste, que sospecha que su mujer le está engañando, rechaza el plan y empieza a seguirla para descubrir al amante.", "images/image2.jpg", "Edificio Contubernio", coordinate2, 13);
        let produccion3 = new Serie("La casa de papel", "España", "05/06/2018", "Una banda organizada de ladrones tiene el objetivo de cometer el atraco del siglo en la Fábrica Nacional de Moneda y Timbre. Cinco meses de preparación quedarán reducidos a once días para poder llevar a cabo con éxito el gran golpe", "images/image3.jpg", "Banco Nacional de Moneda y Timbre", coordinate2, 5);
        let produccion4 = new Serie("The Shooter", "California", "15/11/2016", "El francotirador Bob Lee Swagger debe evitar un complot contra el presidente de los Estados Unidos. Isaac Johnson, un exmarine y ahora agente del Servicio Secreto, convence a Swagger para investigar dicho complot", "images/image4.jpg", "USA Network", coordinate4, 3);
        let produccion5 = new Serie("The Witcher", "Estados Unidos", "20/12/2019", "El brujo Geralt, un cazador de monstruos, trata de encontrar su lugar en un mundo en el que las personas suelen ser más malvadas que las bestias", "images/image5.jpg", "Mundo medieval", coordinate3, 2);
        let produccion6 = new Serie("Ni una palabra", "Estados Unidos", "22/04/2022", "Los residentes de una urbanización rica cerca de Varsovia están conmocionados por la desaparición de Adam, de 18 años. A medida que surgen más secretos, los padres preocupados hacen todo lo posible para proteger a sus hijos", "images/image6.jpg", "Desaparición de Adam", coordinate3, 3);

        //!PELÍCULAS
        let produccion7 = new Movie("El Hobbit", "Nueva Zelanda", "28/11/2012", "La trilogía de El hobbit, adaptación cinematográfica basada en la novela homónima, comprende tres películas épicas de fantasía, acción y aventuras: El hobbit: un viaje inesperado, El hobbit: la desolación de Smaug y El hobbit: la batalla de los Cinco Ejércitos", "images/image7.jpg", resource1, coordinate1);
        let produccion8 = new Movie("Jaula", "España", "09/09/2022", "Cuando una pareja encuentra a una niña traumatizada de origen desconocido, la esposa, Paula, debe descifrar los extraños comportamientos de la niña para desvelar su identidad y su oscuro pasado", "images/image8.jpg", resource2, coordinate2);
        let produccion9 = new Movie("Objetos", "España", "30/09/2022", "Objetos es una película de suspenso de 2022 dirigida por Jorge  con guion de Natxo López y protagonizada por Álvaro Morte, China Suárez y Verónica Echegui. Es una coproducción hispano-argentina-alemana", "images/image9.jpg", resource3, coordinate2);
        let produccion10 = new Movie("Smile", "Estados Unidos", "30/09/2022", "Tras presenciar el dramático incidente sufrido por un paciente, la Dra. Cotter experimenta hechos aterradores sin explicación aparente. A medida que el horror se adueña de su vida, comprende que la respuesta está en su propio pasado", "images/image10.jpg", resource4, coordinate3);
        let produccion11 = new Movie("The Invitation", "Estados Unidos", "26/08/2022", "Tras morir su hermana, Evie queda sin familiares, pero un análisis de ADN le revela la existencia de un primo distante. La nueva familia la invita a una boda en Inglaterra, y lo que empieza como un cuento de hadas se transforma en una pesadilla", "images/image11.jpg", resource5, coordinate3);
        let produccion12 = new Movie("Hacia la libertad", "Estados Unidos", "12/10/2022", "Peter, un esclavo, huye de una plantación en Luisiana después de haber sido azotado. Ahora, tiene que burlar a los cazadores de sangre fría y a los implacables pantanos de Luisiana en un tortuoso viaje hacia el norte", "images/image12.jpg", resource6, coordinate3);

        //!DIRECTORES
        let director1 = new Person("Juan", "Antonio", "Bayona", "05/09/1968", "images/director1.jpg");
        let director2 = new Person("Laura", "Caballero", "", "01/01/1969", "images/director2.jpg");
        let director3 = new Person("Álex", "Rodrigo", "", "02/02/1970", "images/director3.jpg");
        let director4 = new Person("Ryan", "Phillippe", "", "03/03/1971", "images/director4.jpg");
        let director5 = new Person("Alex", "García", "López", "04/04/1972", "images/director5.jpg");
        let director6 = new Person("Michal", "Gazda", "", "05/05/1973", "images/director6.jpg");
        let director7 = new Person("Peter", "Jakson", "", "06/06/1974", "images/director7.jpg");
        let director8 = new Person("Ignacio", "Tatay", "", "07/07/1975", "images/director8.jpg");
        let director9 = new Person("Jorge", "Dorado", "", "08/08/1976", "images/director9.jpg");
        let director10 = new Person("Parker", "Finn", "Viso", "09/09/1977", "images/director10.jpg");
        let director11 = new Person("Jessica", "Thompson", "", "10/10/1978", "images/director11.jpg");
        let director12 = new Person("Antoine", "Fuqua", "", "11/11/1979", "images/director12.jpg");

        //!ACTORES
        let actor1 = new Person("Morfydd", "Clark", "(Galadriel)", "01/01/2003", "images/actor1.jpg");
        let actor2 = new Person("Robert", "Aramayo", "(Elrond)", "02/01/2003", "images/actor2.jpg");
        let actor3 = new Person("Pablo", "Chiapella", "(Amador)", "03/01/2003", "images/actor3.jpg");
        let actor4 = new Person("Jordi", "Sanchez", "(Antonio)", "04/01/2003", "images/actor4.jpg");
        let actor5 = new Person("Jaime", "Llorente", "(Denver)", "05/01/2003", "images/actor5.jpg");
        let actor6 = new Person("Pedro", "Alonso", "(Berlín)", "06/01/2003", "images/actor6.jpg");
        let actor7 = new Person("Ryan", "Phillippe", "(Bob Lee Swagger)", "07/01/2003", "images/actor7.jpg");
        let actor8 = new Person("Shantel", "VanSanten", "(Julie Swagger)", "08/01/2003", "images/actor8.jpg");
        let actor9 = new Person("Henry", "Cavill", "(Geralt de Rivia)", "09/01/2003", "images/actor9.jpg");
        let actor10 = new Person("Anya", "Chalotra", "(Yennefer de Vengerberg)", "10/01/2003", "images/actor10.jpg");
        let actor11 = new Person("Magdalena", "Boczarska", "(Anna Barczyk)", "11/01/2003", "images/actor11.jpg");
        let actor12 = new Person("Leszek", "Lichota", "(Michal Barczyk)", "12/01/2003", "images/actor12.jpg");
        let actor13 = new Person("Martin", "Freeman", "(Bilbo Bolsón)", "13/01/2003", "images/actor13.jpg");
        let actor14 = new Person("Ian", "McKellen", "(Gandalf)", "14/01/2003", "images/actor14.jpg");
        let actor15 = new Person("Elena", "Anaya", "(Paula)", "15/01/2003", "images/actor15.jpg");
        let actor16 = new Person("Eva", "Tennear", "(Clara)", "16/01/2003", "images/actor16.jpg");
        let actor17 = new Person("China", "Suarez", "(Sara)", "17/01/2003", "images/actor17.jpg");
        let actor18 = new Person("Alvaro", "Morte", "(Mario)", "18/01/2003", "images/actor18.jpg");
        let actor19 = new Person("Caitlin", "Stasey", "(Laura Weaver)", "19/01/2003", "images/actor19.jpg");
        let actor20 = new Person("Kyle", "Gallner", "(Joel)", "20/01/2003", "images/actor20.jpg");
        let actor21 = new Person("Stephanie", "Corneliussen", "(Viktoria)", "21/01/2003", "images/actor21.jpg");
        let actor22 = new Person("Alana", "Boden", "(Lucy)", "22/01/2003", "images/actor22.jpg");
        let actor23 = new Person("Will", "Smith", "(Peter)", "23/01/2003", "images/actor23.jpg");
        let actor24 = new Person("Imani", "Pullum", "(Betsy)", "24/01/2003", "images/actor24.jpg");

        //!USER
        let usuario1 = new User("Admin", "admin@gmail.com", "Admin");

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
        this.#model.assignDirector(produccion1, [director1]);
        this.#model.assignDirector(produccion2, [director2]);
        this.#model.assignDirector(produccion3, [director3]);
        this.#model.assignDirector(produccion4, [director4]);
        this.#model.assignDirector(produccion5, [director5]);
        this.#model.assignDirector(produccion6, [director6]);
        this.#model.assignDirector(produccion7, [director7]);
        this.#model.assignDirector(produccion8, [director8]);
        this.#model.assignDirector(produccion9, [director9]);
        this.#model.assignDirector(produccion10, [director10]);
        this.#model.assignDirector(produccion11, [director11]);
        this.#model.assignDirector(produccion12, [director12]);

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

        //!ADD USER
        this.#model.addUser(usuario1);

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
    }

    //Método onInit
    onInit = () => {

        //Obtenemos 3 producciones aleatorias
        let pros = this.#model.randomProduction(3);

        let categorias = this.#model.categories;

        //Llamamos al método para mostrar esas producciones aleatorias y a los eventos
        this.#view.showPrincipalElements(pros, categorias);
        this.#view.bindShowCategory(this.handleShowCategory);
        this.#view.bindShowProduction(this.handleShowProduct);

        
        this.onAddMap();

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
        this.onAddButtonWindow();
        this.onAddForm();
        this.onAddUser();
        this.onAddCookie();

    }

    onAddUser = () => {

        this.#view.showButtonRegisterInMenu();

        this.#view.bindButtonRegister(this.handleFormUser);

    }

    handleFormUser = () => {
        this.#view.showFormLogin();
        this.#view.bindSubmitFormLogin(this.handleSubmitFormLogin);
    }

    handleSubmitFormLogin = (usuario, password) => {

        let prueba = false;

        for (const elem of this.#model.users) {
            if (elem.username === usuario && elem.password === password) {
                document.cookie = "usuario=" + usuario + ";password=" + password;

                prueba = true;
            }
            document.location.href = "http://127.0.0.1:5502/Streaming/main.html";
        }

    }

    onAddCookie = () => {

        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith("usuario=")) {



                let usuario = cookie.substring("usuario=".length, cookie.length);

                console.log("Hola " + usuario + "!");
                break;
            }
        }

        this.#view.showPrueba();

    }

    //Método onAddForm que muestra los formularios en el menú
    onAddForm = () => {
        this.#view.showFormInMenu();
        this.#view.bindFormInMenu(this.handleShowForm);
    }

    //Método handleShowForm que muestra el formulario que se seleccione en el menú
    handleShowForm = (value) => {

        //Obtenemos los actores del sistema
        let actores = [];

        for (const iterator of this.#model.actors) {
            actores.push(iterator);
        }

        //Obtenemos los directores del sistema
        let directores = [];

        for (const iterator of this.#model.directors) {
            directores.push(iterator);
        }

        //Obtenemos las categorías del sistema
        let categorias = [];

        for (const iterator of this.#model.categories) {
            categorias.push(iterator);
        }

        //Obtenemos las producciones del sistema
        let producciones = [];

        for (const iterator of this.#model.producciones) {
            producciones.push(iterator);
        }

        //Si seleccionamos crear producción
        if (value === "Crear Producción") {

            //Mostramos el formulario de crear una producción
            this.#view.showFormProduction(actores, directores, categorias);

            //Llamamos al evento
            this.#view.bindSubmitForm(this.handleAssignDataForm);

            //Si seleccionamos eliminar producción
        } else if (value === "Eliminar Producción") {

            //Mostramos el formulario de eliminar una producción
            this.#view.showFormDeleteProduction(actores, directores, categorias);

            //Llamamos al evento
            this.#view.bindSubmitFormProduction(this.handleDeleteProduction);

            //Si seleccionamos asignar actores/directores
        } else if (value === "Asignar actores/directores") {

            //Mostramos el formulario de asignar directores/actores
            this.#view.showFormAssignDirectorsActors(actores, directores, producciones);

            //Llamamos al evento
            this.#view.bindSubmitAssignDirectorsActors(this.handleAssignDirectorsActorsForm);

            //Si seleccionamos deasignar actores/directores
        } else if (value === "Desasignar actores/directores") {

            //Mostramos el formulario de deasignar directores/actores
            this.#view.showFormDeassignDirectorsActors(actores, directores, producciones);

            //Llamamos al evento
            this.#view.bindSubmitDeassignDirectorsActors(this.handleDeassignDirectorsActorsForm);

            //Si seleccionamos crear categoría
        } else if (value === "Crear categoría") {

            //Mostramos el formulario de crear una categoría
            this.#view.showFormCategory();

            //Llamamos al evento
            this.#view.bindSubmitFormCategory(this.handleAssignDataFormCategory);

            //Si seleccionamos eliminar categoría
        } else if (value === "Eliminar categoría") {

            //Mostramos el formulario de eliminar una categoría
            this.#view.showFormDeleteCategory(categorias);

            //Llamamos al evento
            this.#view.bindSubmitDeleteFormCategory(this.handleDeleteCategory);

            //Si seleccionamos crear person
        } else if (value === "Crear person") {

            //Mostramos el formulario de crear una person
            this.#view.showFormPerson();

            //Llamamos al evento
            this.#view.bindSubmitFormPerson(this.handleAssignDataFormPerson);

            //Si seleccionamos eliminar person
        } else if (value === "Eliminar person") {

            //Mostramos el formulario de eliminar una person
            this.#view.showFormDeletePerson(directores, actores);

            //Llamamos al evento
            this.#view.bindSubmitDeleteFormPerson(this.handleDeletePerson);
        }

        //Llamamos al evento de mostrar una producción con sus datos correspondientes
        this.#view.bindShowProduction(this.handleShowProduct);
    }

    //Método handleAssignDataForm que guarda los datos en el sistema de la producción creada
    handleAssignDataForm = (produccion, actores, directores, categorias) => {

        let done, error;

        try {

            //Recorremos los actores que se han seleccionado en el formulario
            for (let i = 0; i < actores.length; i++) {

                //Obtenemos el actor correspondiente
                let act = this.#model.getActor(actores[i]);

                let actorFull = new Person(act.actor.name, act.actor.lastname1, act.actor.lastname2, act.actor.born, act.actor.picture);

                //Asignamos dicho actor a la producción creada
                this.#model.assignActor(produccion, [actorFull]);
            }

            //Recorremos los directores que se han seleccionado en el formulario
            for (let i = 0; i < directores.length; i++) {

                //Obtenemos el director correspondiente
                let dir = this.#model.getDirector(directores[i]);

                let directorFull = new Person(dir.director.name, dir.director.lastname1, dir.director.lastname2, dir.director.born, dir.director.picture);

                //Asignamos dicho director a la producción creada
                this.#model.assignDirector(produccion, [directorFull]);

            }

            //Recorremos las categorías que se han seleccionado en el formulario
            for (let i = 0; i < categorias.length; i++) {

                //Obtenemos la categoría correspondiente
                let cat = this.#model.getCategory(categorias[i]);

                let categoriaFull = new Category(cat.category.name, cat.category.description);

                //Asignamos dicha categoría a la producción creada
                this.#model.assignCategory(produccion, categoriaFull);
            }

            done = true;
        } catch (error) {
            done = false;
            error = error
        }

        //Llamamos al método showProductModal para mostrar un modal tras crear la producción
        this.#view.showProductModal(done, produccion, error);

    }

    //Método handleAssignDirectorsActorsForm que guarda los datos en el sistema de los actores/directores asignados
    handleAssignDirectorsActorsForm = (actores, directores, producciones) => {

        let done, error;

        let actors = [];
        let directors = [];
        let products = [];

        try {

            //Recorremos los actores que se han seleccionado
            for (let act of actores) {

                //Obtenemos el actor correspondiente
                let actor = this.#model.getActor(act);

                //Lo añadimos al array de actors
                actors.push(actor);
            }

            //Recorremos los directores que se han seleccionado
            for (let dir of directores) {

                //Obtenemos el director correspondiente
                let director = this.#model.getDirector(dir);

                //Lo añadimos al array de directors
                directors.push(director);
            }

            //Recorremos las producciones que se han seleccionado
            for (let pro of producciones) {

                //Obtenemos la producción correspondiente
                let produccion = this.#model.getProduction(pro);

                //Lo añadimos al array de products
                products.push(produccion);
            }

            //Por cada producción le asignamos los actores y directores correspondientes
            for (let pro of products) {

                //Recorremos los actors
                for (let act of actors) {

                    //Asignamos los actores a la producción correspondiente
                    this.#model.assignActor(pro, [act.actor]);
                }

                //Recorremos los directors
                for (let dir of directors) {

                    //Asignamos los directores a la producción correspondiente
                    this.#model.assignDirector(pro, [dir.director]);
                }

            }

            done = true;
        } catch (error) {
            done = false;
            error = error
        }

        //Llamamos al método showDirectorsActorsModal para mostrar un modal tras asignar actores/directores a una producción específica
        this.#view.showDirectorsActorsModal(done, actors, directors, products, error);

    }

    //Método handleDeassignDirectorsActorsForm que guarda los datos en el sistema de los actores/directores deasignados
    handleDeassignDirectorsActorsForm = (actores, directores, producciones) => {

        let done, error;

        let actors = [];
        let directors = [];
        let products = [];

        try {

            //Recorremos los actores que se han seleccionado
            for (let act of actores) {

                //Obtenemos el actor correspondiente
                let actor = this.#model.getActor(act);

                //Lo añadimos al array de actors
                actors.push(actor);
            }

            //Recorremos los directores que se han seleccionado
            for (let dir of directores) {

                //Obtenemos el director correspondiente
                let director = this.#model.getDirector(dir);

                //Lo añadimos al array de directors
                directors.push(director);
            }

            //Recorremos las producciones que se han seleccionado
            for (let pro of producciones) {

                //Obtenemos la producción correspondiente
                let produccion = this.#model.getProduction(pro);

                //Lo añadimos al array de products
                products.push(produccion);
            }


            //Por cada producción le deasignamos los directores correspondientes
            for (let pro of products) {

                //Recorremos los directores
                for (let dir of directors) {

                    //Deasignamos los directores a la producción correspondiente
                    this.#model.deassignDirector(pro, dir.director);
                }

            }

            done = true;
        } catch (error) {
            done = false;
            error = error
        }

        try {

            //Por cada producción le deasignamos los actores correspondientes
            for (let pro of products) {

                //Recorremos los actores
                for (let act of actors) {

                    //Deasignamos los actores a la producción correspondiente
                    this.#model.deassignActor(pro, act.actor);
                }
            }
        } catch (error) {
            done = false;
            error = error
        }

        //Llamamos al método showDeassignDirectorsActorsModal para mostrar un modal tras deasignar actores/directores a una producción específica
        this.#view.showDeassignDirectorsActorsModal(done, actors, directors, products, error);

    }

    //Método handleAssignDataFormCategory que guarda los datos en el sistema de la categoría creada
    handleAssignDataFormCategory = (category) => {

        let done, error;

        try {

            //Añadimos la categoría que se ha creado al sistema
            this.#model.addCategorie([category]);

            //Actualizamos los menús
            this.onAddCategory();
            this.onAddDirector();
            this.onAddActor();
            this.onAddButtonWindow();
            this.onAddForm();

            done = true;
        } catch (error) {
            done = false;
            error = error;
        }

        //Llamamos al método showCategoryModal para mostrar un modal tras crear una categoría
        this.#view.showCategoryModal(done, category, error);

    }

    //Método handleAssignDataFormPerson que guarda los datos en el sistema del actor/director creado
    handleAssignDataFormPerson = (person, tipoPerson) => {

        let done, error;

        try {

            //Si el tipo es actor añadimos el actor al sistema
            if (tipoPerson === "Actor") {
                this.#model.addActor(person);

                //Si el tipo es actor añadimos el director al sistema
            } else if (tipoPerson === "Director") {
                this.#model.addDirector(person);
            }

            //Actualizamos los menús
            this.onAddCategory();
            this.onAddDirector();
            this.onAddActor();
            this.onAddButtonWindow();
            this.onAddForm();

            done = true;
        } catch (error) {
            done = false;
            error = error;
        }

        //Llamamos al método showPersonModal para mostrar un modal tras crear una person
        this.#view.showPersonModal(done, person, error, tipoPerson);

    }

    //Método handleDeleteProduction que guarda los datos en el sistema de la producción eliminada
    handleDeleteProduction = (titulo) => {

        let done;
        let error;

        //Obtenemos la producción a eliminar
        let produccion = this.#model.getProduction(titulo);

        if (produccion != undefined) {
            //Le deasignamos los actores
            let actores = [];

            //Obtenemos los actores correspondientes a esa producción
            for (const elem3 of this.#model.getCast(produccion)) {
                actores.push(elem3);
            }

            //Los deasignamos
            for (let i = 0; i < actores.length; i++) {
                this.#model.deassignActor(produccion, actores[i]);
            }

            //Le deasignamos los directores
            let directores = [];

            //Obtenemos los directores correspondientes a esa producción
            for (const elem3 of this.#model.getCast2(produccion)) {
                directores.push(elem3);
            }

            //Los deasignamos
            for (let i = 0; i < directores.length; i++) {
                this.#model.deassignDirector(produccion, directores[i]);
            }

            if (!(produccion instanceof Production)) {
                done = false;
            }

            try {

                //Borramos la producción
                this.#model.removeProduction(produccion);

                let production;
                // let categorie;

                let categories = [];

                //Obtenemos la categoría en la que está asignada esa producción
                for (const elem of this.#model.categories) {
                    for (const elem2 of elem.producs) {
                        if (titulo === elem2.title) {
                            production = elem2;
                            // categorie = elem.category;
                            categories.push(elem.category);
                        }
                    }
                }

                //A la categoría correspondiente le deasignamos dicha producción
                // this.#model.deassignCategory(production, categorie);
                for (const elem of categories) {
                    this.#model.deassignCategory(production, elem);
                }

                done = true;

            } catch (error) {

            }

        } else {
            done = false;
        }

        //Llamamos al método showDeleteProductModal para mostrar un modal tras eliminar una producción
        this.#view.showDeleteProductModal(done, produccion, error);

    }

    //Método handleDeleteCategory que guarda los datos en el sistema de la categoría eliminada
    handleDeleteCategory = (nombre) => {

        let done = true;
        let error;

        //Obtenemos la categoría correspondiente
        let categoria = this.#model.getCategory(nombre);

        try {

            //Borramos la categoría
            this.#model.removeCategorie(categoria.category);

            //Recorremos las producciones de dicha categoría
            for (let pro of categoria.producs) {

                let actores = [];

                let directores = [];

                //Obtenemos los actores correspondientes a la produccion
                // for(let act of this.#model.getCast(pro)){
                //     actores.push(act);
                // }

                //Obtenemos los directores correspondientes a la produccion
                // for(let dir of this.#model.getCast2(pro)){
                //     directores.push(dir);
                // }

                //Deasignamos los actores de la producción
                // for(let act of actores){
                //     this.#model.deassignActor(pro, act);
                // }

                //Deasignamos los directores de la producción
                // for(let dir of directores){
                //     this.#model.deassignDirector(pro, dir);
                // }

                //Borramos dicha producción
                // this.#model.removeProduction(pro);
            }

            //Actualizamos el menú y el contenido de la página principal
            this.onAddCategory();
            this.onAddDirector();
            this.onAddActor();
            this.onAddButtonWindow();
            this.onAddForm();
            this.onInit();

        } catch (error) {

        }

        //Llamamos al método showDeleteCategoryModal para mostrar un modal tras eliminar una categoría
        this.#view.showDeleteCategoryModal(done, categoria, error);

    }

    //Método handleDeletePerson que guarda los datos en el sistema de la person eliminada
    handleDeletePerson = (actores, directores) => {

        let done = true;
        let error;

        try {

            //Recorremos los actores seleccionados
            for (let act of actores) {

                //Obtenemos el actor correspondiente
                let actor = this.#model.getActor(act);

                let actorFull = new Person(actor.actor.name, actor.actor.lastname1, actor.actor.lastname2, actor.actor.born, actor.actor.picture);

                //Borramos dicho actor
                this.#model.removeActor(actorFull);
            }

            //Recorremos los directores seleccionados
            for (let dir of directores) {

                //Obtenemos el director correspondiente
                let director = this.#model.getDirector(dir);

                let directorFull = new Person(director.director.name, director.director.lastname1, director.director.lastname2, director.director.born, director.director.picture);

                //Borramos dicho director
                this.#model.removeDirector(directorFull);
            }

            //Actualizamos el menú
            this.onAddCategory();
            this.onAddDirector();
            this.onAddActor();
            this.onAddButtonWindow();
            this.onAddForm();

        } catch (error) {

        }

        //Llamamos al método showDeletePersonModal para mostrar un modal tras eliminar una person
        this.#view.showDeletePersonModal(done, actores, directores, error);

        //Obtenemos los actores del sistema
        let actors = [];

        for (const iterator of this.#model.actors) {
            actors.push(iterator);
        }

        //Obtenemos los directores del sistema
        let directors = [];

        for (const iterator of this.#model.directors) {
            directors.push(iterator);
        }

        //Actualizamos el formulario con los nuevos datos del sistema
        this.#view.showFormDeletePerson(directors, actors);

        //Llamamos al evento
        this.#view.bindSubmitDeleteFormPerson(this.handleDeletePerson);

    }

    //Método handle que muestra las producciones correspondientes a una categoría
    handleShowCategory = (type) => {

        let title = "";

        let category;

        try {
            //Obtenemos la categoría correspondiente
            category = this.#model.getCategory(type);

            //Obtenemos el iterador de las producciones de dicha categoría
            let iterator = category.producs[Symbol.iterator]();

            //Comprobamos si está vacía la categoría
            let estaVacio = iterator.next().done;

            if (!estaVacio) {

                iterator = category.producs[Symbol.iterator]();
                //Obtenemos el title que se muestra con las producciones
                if (type === "Acción") title = "Acción";

                if (type === "Ficción") title = "Ficción";

                if (type === "Aventura") title = "Aventura";

                //Llamamos al método para mostrar las producciones correspondientes a dicha categoría y llamamos al evento
                this.#view.showProductions(iterator, title);
                this.#view.bindShowCardProduct(this.handleShowProduct);
            } else {
                console.log("ESA CATEGORÍA ESTÁ VACÍA");
            }
        } catch (error) {
            console.error("LA CATEGORÍA NO EXISTE");
        }

    }

    //Método handle que muestra la carta de una producción con sus actores y sus directores correspondientes
    handleShowProduct = (serial) => {

        let directors = [];
        let actors = [];
        let pos = 0;

        //Obtenemos la producción según su serial
        let pro = this.#model.getProduction(serial);

        //Obtenemos el director correspondiente a la producción
        for (let pros of this.#model.getCast2(pro)) {
            directors.push(pros);
        }

        //Obtenemos los actores correspondiente a la producción
        for (let actor of this.#model.getCast(pro)) {
            actors.push(actor);
        }

        //Llamamos al método para mostrar la información de la producción con sus actores y directores correspondientes
        this.#view.showCardProduction(pro, directors, actors);
        this.#view.bindDirector(this.handleShowDirector);
        this.#view.bindActor(this.handleShowActor);
        this.#view.bindShowProductInNewWindow(this.handleProductNewWindow);
    }

    //Método handle que llama al handleShowDirector
    handleDirector = (serial) => {
        this.handleShowDirector(serial);
    }

    //Método handle que llama al handleShowActor
    handleActor = (serial) => {
        this.handleShowActor(serial);
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

    //Método handle que muestra una producción en una ventana nueva
    handleProductNewWindow = (serial) => {

        //Obtenemos la producción según su serial
        let pro = this.#model.getProduction(serial);

        this.#view.showProductInNewWindow(pro, "hola");

        this.#model.pushWindows(pro);

    }

    //Método onAddButtonWindow que muestra un botón para cerrar todas las ventanas en el menú
    onAddButtonWindow = () => {

        this.#view.showButtonWindowsInMenu();
        this.#view.bindButtonWindows(this.handleCloseWindows);
    }

    //Método handle que cierra todas las ventanas abiertas
    handleCloseWindows = () => {
        let ventanas;

        ventanas = this.#model.getWindows();

        this.#view.closeWindows(ventanas);

        this.#model.cleanWindows();

    }

    //Método onAddDirector que muestra los directores en el menú
    onAddDirector = () => {
        this.#view.showDirectorInMenu(this.#model.directors);
        this.#view.bindProductsDirectorListInMenu(
            this.handleProductsDirectorList
        );
    }

    //Método handle que llama al handleShowDirector
    handleProductsDirectorList = (type) => {
        this.handleShowDirector(type);
    }

    //Método handle que muestra la carta de un director con sus producciones correspondientes
    handleShowDirector = (serial) => {

        let dir = this.#model.getDirector(serial);

        let producciones = [];

        for (let pro of dir.producs) {
            producciones.push(pro);
        }

        this.#view.showCardDirector(producciones, dir);
        this.#view.bindProduction(this.handleShowProduct);

    }

    //Método onAddActor que muestra los actores en el menú
    onAddActor = () => {
        this.#view.showActorInMenu(this.#model.actors);
        this.#view.bindProductsActorListInMenu(
            this.handleProductsActorList
        );
    }

    //Método handle que llama al handleShowActor
    handleProductsActorList = (type) => {
        this.handleShowActor(type);
    }

    //Método handle que muestra la carta de un actor con sus producciones correspondientes
    handleShowActor = (serial) => {

        let act = this.#model.getActor(serial);

        let producciones = [];

        for (let pro of act.producs) {
            producciones.push(pro);
        }

        this.#view.showCardActor(producciones, act);
        this.#view.bindProduction(this.handleShowProduct);
    }

    onAddMap = () => {

        this.#view.showGeocoder();

    }

}

export default Controller;