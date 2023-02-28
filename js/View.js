"use strict";

import { Serie, Movie, Resource, Coordinate } from "../entities/products.js";

//Clase View
class View {

    //!EXECUTE HANDLER HISTORY
    //Método executeHandlerHistory para mandar el handler y poder almacenar la acción y url del objeto history
    #executeHandlerHistory(handler, handlerArguments, scrollElement, data, url, event) {
        handler(...handlerArguments);
        $(scrollElement).get(0).scrollIntoView();
        history.pushState(data, null, url);
        event.preventDefault();
    }

    //Constructor
    constructor() {

        //Accedemos a los elementos html mediante sus ids
        this.main = $('#main');
        this.categorias = $('#categorias');
        this.menu = $('#menu');
        this.productWindow = null;
    }

    //!BIND INIT
    //Método que captura el evento de volver a la página principal de la página web
    bindInit(handler) {
        $('#init').click((event) => {
            this.#executeHandlerHistory(handler, [], 'body', { action: 'init' }, '#', event);
        });
        $('#logo').click((event) => {
            this.#executeHandlerHistory(handler, [], 'body', { action: 'init' }, '#', event);
        });
    }

    //!SHOW PRINCIPAL ELEMENTS
    //Método que muestra los elementos de la página principal
    showPrincipalElements(pros) {

        //Vaciamos el main
        this.main.empty();

        //Añadimos al main las 3 categorías iniciales
        this.main.append(`<div id="categoriasIniciales" class="row inicial">
        <div id="cat1" class="col-lg-4 col-md-6"><a class="prueba" data-type="Acción" href="#categoriasIniciales">
                <div><img class="cat__img" alt="Acción" src="./images/Acción.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Acción</strong></h3>
                </div>
            </a>
        </div>
        <div id="cat2" class="col-lg-4 col-md-6"><a data-type="Ficción" href="#categoriasIniciales">
                <div><img class="cat__img" alt="Ficción" src="./images/Ficción.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Ficción</strong></h3>
                </div>
            </a>
        </div>
        <div id="cat3" class="col-lg-4 col-md-6"><a data-type="Aventura" href="#categoriasIniciales">
                <div><img class="cat__img" alt="Aventura" src="./images/Aventura.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Aventura</strong></h3>
                </div>
            </a>
        </div>
    </div>`);

        //Recorremos el array con las producciones aleatorias que se recibe y las añadimos al main
        for (let i = 0; i < pros.length; i++) {

            this.main.append(`<div id="produccionesAleatorias" class="row inicial"></div>`);

            let id = $("#produccionesAleatorias");

            id.append(`
            <div class="col-lg-4 col-md-6">
            <a data-type="${pros[i].title}" href="#productRandom">
                <div>
                    <img class="cat__img" alt="Produccion ${i}" src="./${pros[i].image}" />
                </div>
                <div class="cat__text">
                    <h3><strong>${pros[i].title}</strong></h3>
                </div>
            </a>
        </div>`);
        }

        this.main.append(`
        <select id="select">
            <option value="opcion1">Nueva Producción</option>
            <option value="opcion2">Opción 2</option>
            <option value="opcion3">Opción 3</option>
        </select>`);

    }

    //!BIND SHOW CATEGORY
    //Método que captura el evento de hacer click a una categoría
    bindShowCategory(handler) {
        $('#categoriasIniciales').children().find('a').click((event) => {
            let type = $(event.target).closest($('a')).get(0).dataset.type;
            this.#executeHandlerHistory(
                handler, [type],
                'body',
                { action: 'categoriasIniciales', type: type },
                '#categoriasIniciales', event
            );
        });

    }

    //!BIND SHOW PRODUCTION
    //Método que captura el evento de hacer click a una de las producciones aleatorias
    bindShowProduction(handler) {
        $('#produccionesAleatorias').children().find('a').click((event) => {
            let type = $(event.target).closest($('a')).get(0).dataset.type;
            this.#executeHandlerHistory(
                handler, [type],
                'body',
                { action: 'produccionesAleatorias', type: type },
                '#productRandom', event
            );
        });
    }

    bindShowForm(handler) {
        $('#select').children().click((event) => {
            handler(event.target.value);
        })
    }

    showForm(actores, directores, categorias) {
        this.main.empty();
        this.main.append(`
        <div class="container m-5" id="cValidation">
			<h1 class="d-flex justify-content-center">Nueva Producción</h1>
			<form id="form" name="fValidation" role="form" class="text-white m-5">
				<!-- Requiered -->
				<div id="row" class="form-row row">
					<div class="col-md-4 mb-3">
						<label for="vfTitulo">Título</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfTitulo" name="vfTitulo" placeholder="Título" value="" required>
							<div class="invalid-feedback">El título es obligatorio</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfNacionalidad">Nacionalidad</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfNacionalidad" name="vfNacionalidad"
								placeholder="Nacionalidad" value="" required>
							<div class="invalid-feedback">La nacionalidad es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
					<div class="col-md-4 mb-3">
						<label for="vfPublicacion">Publicación</label>
						<div class="input-group">
							<input type="date" class="form-control" id="vfPublicacion" name="vfPublicacion"
								placeholder="Publicación" value="" required>
                            <div class="invalid-feedback">La publicación es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-4 mb-3">
						<label for="vfDescripcion">Descripción</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfDescripcion" name="vfDescripcion"
								placeholder="Descripción" value="" required>
                            <div class="invalid-feedback">La descripción es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-8 mb-3">
						<label for="vfImagen">Imagen</label>
						<div class="input-group">
							<input type="file" class="form-control" id="vfImagen" name="vfImagen"
								placeholder="Imagen" value="" required>
                            <div class="invalid-feedback">La imagen es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-4 mb-3">
						<label for="vfContenido">Contenido</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfContenido" name="vfContenido"
								placeholder="Contenido" value="" required>
                            <div class="invalid-feedback">El contenido es obligatorio</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-4 mb-3">
						<label for="vfLatitud">Latitud</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfLatitud" name="vfLatitud"
								placeholder="Latitud" value="" required>
                            <div class="invalid-feedback">La latitud es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-4 mb-3">
						<label for="vfLongitud">Longitud</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfLongitud" name="vfLongitud"
								placeholder="Longitud" value="" required>
                            <div class="invalid-feedback">La longitud es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-4 mb-3">
						<label for="vfTemporadas">Temporadas</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfTemporadas" name="vfTemporadas"
								placeholder="Temporadas" value="" required>
                            <div class="invalid-feedback">Las temporadas son obligatorias</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>



				</div>


				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</form>
		</div>`);

        //Actores
        $("#row").append(`
        <div class="col-md-3 mb-3">
            <label for="vfActores">Actores</label>
            <div class="form-group">
                <select class="custom-select" id="vfActores" name="vfActores" required multiple></select>
                <div class="invalid-feedback">Los actores son obligatorios</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`);

        for (let i = 0; i < actores.length; i++) {
            let option = `
            <option value="${actores[i].actor.name}">${actores[i].actor.name}</option>`;
            $("#vfActores").append(option);
        }

        //Directores
        $("#row").append(`
        <div class="col-md-3 mb-3">
            <label for="vfDirectores">Directores</label>
            <div class="form-group">
                <select class="custom-select" id="vfDirectores" name="vfDirectores" required multiple></select>
                <div class="invalid-feedback">Los directores son obligatorios</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`);

        for (let i = 0; i < directores.length; i++) {
            let option = `
            <option value="${directores[i].director.name}">${directores[i].director.name}</option>`;
            $("#vfDirectores").append(option);
        }

        //Categorías
        $("#row").append(`
        <div class="col-md-3 mb-3">
            <label for="vfCategorias">Categorías</label>
            <div class="form-group">
                <select class="custom-select" id="vfCategorias" name="vfCategorias" required multiple></select>
                <div class="invalid-feedback">Las categorías son obligatorias</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
        </div>`);

        for (let i = 0; i < categorias.length; i++) {
            let option = `
            <option value="${categorias[i].category.name}">${categorias[i].category.name}</option>`;
            $("#vfCategorias").append(option);
        }

        // $("#row").append(`<select name="selectAct2" id="selectActores2"></select>`);

        // for (let i = 0; i < actores.length; i++) {
        //     let option = `<option value="${actores[i].actor.name}">${actores[i].actor.name}</option>`;
        //     $("#selectActores2").append(option);
        // }

        // $("#row").append(`<select name="selectDir" id="selectDirectores"></select>`);

        // for (let i = 0; i < directores.length; i++) {
        //     let option = `<option value="${directores[i].director.name}">${directores[i].director.name}</option>`;
        //     $("#selectDirectores").append(option);
        // }

        // $("#row").append(`<select name="selectCat" id="selectCategorias"></select>`);

        // for (let i = 0; i < categorias.length; i++) {
        //     let option = `<option value="${categorias[i].category.name}">${categorias[i].category.name}</option>`;
        //     $("#selectCategorias").append(option);

        // }

    }

    bindSubmitForm(handler) {

        document.getElementById("form").addEventListener("submit", function (event) {

            event.preventDefault();

            let titulo = document.getElementById("vfTitulo").value;
            let nacionalidad = document.getElementById("vfNacionalidad").value;
            let publicacion = document.getElementById("vfPublicacion").value;
            let descripcion = document.getElementById("vfDescripcion").value;

            let imagen = document.getElementById("vfImagen").value;
            let segundaParte = imagen.substring(12);
            let imagenFull = "images/" + segundaParte;

            let contenido = document.getElementById("vfContenido").value;
            let latitud = document.getElementById("vfLatitud").value;
            let longitud = document.getElementById("vfLongitud").value;
            let temporadas = document.getElementById("vfTemporadas").value;

            //Actores
            let actores = [];

            const selectActor = document.getElementById("vfActores");
            const opcionesSeleccionadasActor = selectActor.selectedOptions;
            for (let i = 0; i < opcionesSeleccionadasActor.length; i++) {
                actores.push(opcionesSeleccionadasActor[i].value);
            }

            //Directores
            let directores = [];

            const selectDirector = document.getElementById("vfDirectores");
            const opcionesSeleccionadasDirector = selectDirector.selectedOptions;
            for (let i = 0; i < opcionesSeleccionadasDirector.length; i++) {
                directores.push(opcionesSeleccionadasDirector[i].value);
            }

            //Categorías
            let categorias = [];

            const selectCategoria = document.getElementById("vfCategorias");
            const opcionesSeleccionadasCategoria = selectCategoria.selectedOptions;
            for (let i = 0; i < opcionesSeleccionadasCategoria.length; i++) {
                categorias.push(opcionesSeleccionadasCategoria[i].value);
            }

            let coordinate = new Coordinate(latitud, longitud);

            let produccion = new Serie(titulo, nacionalidad, publicacion, descripcion, imagenFull, contenido, coordinate, temporadas);

            handler(produccion, actores, directores, categorias);


        });

    }

    showProductModal(done, product, error) {
        $(document.fNewProduct).find('div.error').remove();
        if (done) {
            let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Producto creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La producción <strong>${product.title}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
            $('body').append(modal);
            let newProductModal = $('#newProductModal');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                // newProductModal.on('hidden.bs.modal', function (event) {
                //     document.fNewProduct.reset();
                //     document.fNewProduct.npSerial.focus();
                //     this.remove();
                // });
                newProductModal.modal('hide');
                newProductModal.remove();
                // $("#form").reset();
                const formulario = document.getElementById("form");
                formulario.reset();
                // newProductModal.modal('hide');
            })
        } else {
            $(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La producción <strong>${product.title}</strong> no ha podido crearse correctamente.</div>`);
        }
    }

    //!SHOW PRODUCTIONS
    //Método que muestra las producciones correspondientes a una categoría
    showProductions(iterator, title) {

        this.main.empty();

        this.main.append(`<div id="producciones" class="container my-3" ><div class="row" style="gap: 80px;"> </div></div>`);

        let id = $("#producciones");



        let product = iterator.next();

        let publication = (product.value.publication).replace(/-/g, "/");

        while (!product.done) {

            id.children().first().append(`
            <div class="card col-md-4" style="width: 20rem;">
                <img src="./${product.value.image}" class="card-img-top" alt="${product.value.title}">
                <div class="card-body">
                    <h5 class="card-title">${product.value.title}</h5>
                    <br>
                    <h6 class="card-title"><u>CARACTERÍSTICAS</u></h6>
                    <p class="card-text">-Origen: ${product.value.nationality}</p>
                    <p class="card-text">-Publicación: ${publication}</p>
                    <a href="#produccion" class="btn btn-outline-primary" data-serial="${product.value.title}">Acceder</a>
                </div>
            </div>
            `);

            product = iterator.next();

        }

        id.prepend(`<h1><strong>${title}</strong></h1>`);
    }

    //!BIND SHOW CARD PRODUCT
    //Método que captura el evento de hacer click en una producción correspondiente a una categoría
    bindShowCardProduct(handler) {
        $('#producciones').find('a.btn').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;

            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'producciones', serial: serial },
                '#produccion', event
            );
        });
    }

    //!SHOW CATEGORIES IN MENU
    //Método que muestra las categorías en el menú
    showCategoriesInMenu(categories) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#" id="menuCategorias" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Categorías
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="menuCategorias"></div>`);

        for (const iterator of categories) {
            container.append(`<a data-category="${iterator.category.name}" class="dropdown-item" href="#productlist">${iterator.category.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //!BIND PRODUCTS CATEGORY LIST IN MENU
    //Método que captura el evento de hacer click en la categoría del menú
    bindProductsCategoryListInMenu(handler) {
        $('#menuCategorias').next().children().click((event) => {
            let category = $(event.target).closest($('a')).get(0).dataset.category;
            this.#executeHandlerHistory(
                handler, [category],
                'body',
                { action: 'categoriasMenu', category: category },
                '#categoriasMenu', event
            );
        });
    }

    //!SHOW BUTTON WINDOWS IN MENU
    //Método que muestra un botón para cerrar todas las ventanas en el menú
    showButtonWindowsInMenu() {
        let button = $(`<button id="cerrarVentanas" class="btn btn-warning mr-2">Cerrar Ventanas</button>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="menuBoton"></div>`);

        button.append(container);
        this.menu.append(button);
    }

    //!BIND BUTTON WINDOWS
    //Método bindButtonWindows que captura el evento de hacer click en el botón del menú
    bindButtonWindows(handler) {
        $('#cerrarVentanas').click(function () {
            handler();
        });
    }

    //!SHOW CARD PRODUCTION
    //Método que muestra la carta de la producción con sus actores y directores correspondientes
    showCardProduction(product, directors, actors) {
        this.main.empty();

        console.log(product.publication);

        let publication = (product.publication).replace(/-/g, "/");

        console.log(publication)


        //Comprobamos si la producción es una serie o una pelicula ya que una serie tiene una propiedad seasons que una película no tiene
        if (product && product instanceof Serie) {
            this.main.append(`<div id="single-product" class=" container-fluid my-5">
            <div class="row d-flex justify-content-center ">
            <div class="col-md-10">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${product.image}"/> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-4">
                                <div class="mt-4 mb-3">
                                    <h5 class="text-uppercase"><strong>${product.title}</strong></h5>
                                </div>
                                <p class="about">${product.synopsis}</p>
                                <div class="sizes mt-5">
                                    <h6 class="text-uppercase"><u>Características</u></h6>
                                    <span class="text-uppercase text-muted brand">Origen: ${product.nationality}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Publicación: ${publication}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Temporadas: ${product.seasons}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Localización: ${product.locations}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Resource: ${product.resources}</span>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Directores</u></h6>
                                    <div id="directores">

                                    </div>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Actores</u></h6>
                                    <div id="actores">

                                    </div>
                                    <br>
                                    <button id="botonVentanaNueva" data-serial="${product.title}" class="btn btn-primary mr-2 px-4">Abrir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

            for (let i = 0; i < directors.length; i++) {
                $("#directores").append(`
                <a href="#" id="director" data-serial="${directors[i].name}"><span class="text-muted brand">Nombre: ${directors[i].name} ${directors[i].lastname1} ${directors[i].lastname2}</span><br></a>`);
                // console.log(directors[i].name)
            }

            for (let i = 0; i < actors.length; i++) {
                $("#actores").append(`
                <a href="#" id="actor" data-serial="${actors[i].name}"><span class="text-muted brand">Nombre: ${actors[i].name} ${actors[i].lastname1} ${actors[i].lastname2}</span><br></a>`);
                // console.log(actors[i].name)
            }

        } else if (product && product instanceof Movie) {
            this.main.append(` <div id="single-product" class=" container-fluid my-5">
            <div class="row d-flex justify-content-center ">
            <div class="col-md-10">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${product.image}"/> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-4">
                                <div class="mt-4 mb-3">
                                    <h5 class="text-uppercase"><strong>${product.title}</strong></h5>
                                </div>
                                <p class="about">${product.synopsis}</p>
                                <div class="sizes mt-5">
                                    <h6 class="text-uppercase"><u>Características</u></h6>
                                    <span class="text-uppercase text-muted brand">Origen: ${product.nationality}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Publicación: ${product.publication}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Localización: ${product.locations}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Duración: ${product.resource.duration} min</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Ruta: ${product.resource.link}</span>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Directores</u></h6>
                                    <div id="directores">

                                    </div>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Actores</u></h6>
                                    <div id="actores">

                                    </div>
                                    <br>
                                    <button id="botonVentanaNueva" data-serial="${product.title}" class="btn btn-primary mr-2 px-4">Abrir</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

            for (let i = 0; i < directors.length; i++) {
                $("#directores").append(`<a href="#" id="director" data-serial="${directors[i].name}"><span class="text-muted brand">Nombre: ${directors[i].name} ${directors[i].lastname1} ${directors[i].lastname2}</span><br></a>`);
                // console.log(directors[i].name)
            }

            for (let i = 0; i < actors.length; i++) {
                $("#actores").append(`<a href="#" id="actor" data-serial="${actors[i].name}"><span class="text-muted brand">Nombre: ${actors[i].name} ${actors[i].lastname1} ${actors[i].lastname2}</span><br></a>`);
                // console.log(actors[i].name)
            }


        }


        // this.main.append(container);
    }

    //!BIND DIRECTOR
    //Método bindDirector que captura el evento de hacer click en el nombre del director
    bindDirector(handler) {
        $('#directores').find('a').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;
            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'directorProduccion', serial: serial },
                '#directorProduccion', event
            );
        });

    }

    //!BIND ACTOR
    //Método bindActor que captura el evento de hacer click en el nombre del actor
    bindActor(handler) {
        $('#actores').find('a').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;

            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'actorProduccion', serial: serial },
                '#actorProduccion', event
            );
        });
    }

    //!BIND SHOW PRODUCT IN NEW WINDOW
    //Método bindShowProductInNewWindow que captura el evento de hacer click en el botón de abrir nueva ventana
    bindShowProductInNewWindow(handler) {

        //Si hacemos click en dicho botón, abrimos una nueva ventana (product.html) con los datos de dicha producción
        $('#botonVentanaNueva').click((event) => {
            this.productWindow = window.open("production.html", event.target.dataset.serial, "width=1300, height=750, top=250, left=175");
            this.productWindow.addEventListener('DOMContentLoaded', () => {
                handler(event.target.dataset.serial)
            });
        });
    }

    closeWindows(ventanas) {
        for (let i = 0; i < ventanas.length; i++) {
            let miVentana = window.open('production.html', ventanas[i].title);
            miVentana.close();
        }
    }

    //!SHOW PRODUCT IN NEW WINDOW
    //Método showProductInNewWindow que muestra los datos de una producción determinada en una nueva ventana
    showProductInNewWindow(product, message) {
        let main = $(this.productWindow.document).find('main');
        let header = $(this.productWindow.document).find('header nav');

        main.empty();
        header.empty();
        let container;
        if (product && product instanceof Serie) {
            this.productWindow.document.title = `${product.title}`;
            header.append(`<h1>${product.title}</h1>`);
            container = $(`<div id="single-product" class="${product.title}-style container mt-5 mb-5">
            <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${product.image}" style="width: 500px; height: 300px;" /> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-4">
                                <div class="mt-4 mb-3">
                                    <h5 class="text-uppercase"><strong>${product.title}</strong></h5>
                                </div>
                                <p class="about">${product.synopsis}</p>
                                <div class="sizes mt-5">
                                    <h6 class="text-uppercase"><u>Características</u></h6>
                                    <span class="text-uppercase text-muted brand">Origen: ${product.nationality}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Publicación: ${product.publication}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Temporadas: ${product.seasons}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Localización: ${product.locations}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Resource: ${product.resources}</span>
                                    <br>
                                    <br>
                                    <button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>
    `);

            // container.find('h6').after(this.#instance[product.constructor.name]);

        } else if (product && product instanceof Movie) {
            this.productWindow.document.title = `${product.title}`;
            header.append(`<h1>${product.title}</h1>`);
            container = $(`<div id="single-product" class="${product.title}-style container mt-5 mb-5">
            <div class="row d-flex justify-content-center">
            <div class="col-md-12">
                <div class="card">
                    <div class="row">
                        <div class="col-md-7">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${product.image}" style="width: 400px; height: 300px;" /> </div>
                            </div>
                        </div>
                        <div class="col-md-5">
                            <div class="product p-4">
                                <div class="mt-4 mb-3">
                                    <h5 class="text-uppercase"><strong>${product.title}</strong></h5>
                                </div>
                                <p class="about">${product.synopsis}</p>
                                <div class="sizes mt-5">
                                    <h6 class="text-uppercase"><u>Características</u></h6>
                                    <span class="text-uppercase text-muted brand">Origen: ${product.nationality}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Publicación: ${product.publication}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Localización: ${product.locations}</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Duración: ${product.resource.duration} min</span>
                                    <br>
                                    <span class="text-uppercase text-muted brand">Ruta: ${product.resource.link}</span>
                                    <br>
                                    <br>
                                    <button class="btn btn-primary text-uppercase m-2 px-4" onClick="window.close()">Volver</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>
			`);
        } else {
            container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
        }
        main.append(container);
        this.productWindow.document.body.scrollIntoView();
    }

    //!SHOW DIRECTOR IN MENU
    //Método que muestra los directores en el menú
    showDirectorInMenu(directors) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#menuDirectores" id="menuDirectores" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Directores
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="menuDirectores"></div>`);

        for (const iterator of directors) {
            container.append(`<a data-category="${iterator.director.name}" class="dropdown-item" href="#productlist">${iterator.director.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //!BIND PRODUCTS DIRECTOR LIST IN MENU
    //Método que captura el evento de hacer click en el director del menú
    bindProductsDirectorListInMenu(handler) {
        $('#menuDirectores').next().children().click((event) => {
            let category = $(event.target).closest($('a')).get(0).dataset.category;
            this.#executeHandlerHistory(
                handler, [category],
                'body',
                { action: 'menuDirectores', category: category },
                '#menuDirectores', event
            );
        });
    }

    //!SHOW CARD DIRECTOR
    //Método que muestra la carta del director con sus producciones correspondientes
    showCardDirector(products, dir) {
        this.main.empty();

        this.main.append(`<div id="single-product" class="${dir.director.name}-style container-fluid mt-5 mb-5">
            <div class="row d-flex justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${dir.director.picture}"/> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-4">
                                <div class="sizes mt-5">
                                    <h5 class="text-uppercase"><strong>DIRECTOR</strong></h5>
                                    <span class="text-muted brand">Nombre: ${dir.director.name} ${dir.director.lastname1} ${dir.director.lastname2}</span>
                                    <br>
                                    <span class="text-muted brand">Nacimiento: ${dir.director.born}</span>
                                    <br>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Producciones</u></h6>
                                    <div id="producciones">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

        for (let i = 0; i < products.length; i++) {
            $("#producciones").append(`
            <a href="#productionDirector" class="text-muted brand" id="productionDirector" data-serial="${products[i].title}">
                <span>Nombre: ${products[i].title}</span><br>
            </a>`);
        }
    }

    //!SHOW ACTOR IN MENU
    //Método que muestra los actores en el menú
    showActorInMenu(actors) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#menuActores" id="menuActores" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Actores
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="menuActores"></div>`);

        for (const iterator of actors) {
            container.append(`<a data-category="${iterator.actor.name}" class="dropdown-item" href="#productlist">${iterator.actor.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //!BIND PRODUCTS ACTOR LIST IN MENU
    //Método que captura el evento de hacer click en el actor del menú
    bindProductsActorListInMenu(handler) {
        $('#menuActores').next().children().click((event) => {
            let category = $(event.target).closest($('a')).get(0).dataset.category;
            this.#executeHandlerHistory(
                handler, [category],
                'body',
                { action: 'menuActores', category: category },
                '#menuActores', event
            );
        });
    }

    //!SHOW CARD ACTOR
    //Método que muestra la carta del actor con sus producciones correspondientes
    showCardActor(products, act) {
        this.main.empty();

        this.main.append(`<div id="single-product" class="${act.actor.name} container-fluid my-5">
            <div class="row d-flex justify-content-center">
            <div class="col-md-10">
                <div class="card">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="images p-3">
                                <div class="text-center p-4"> <img id="main-image" src="./${act.actor.picture}"/> </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="product p-4">
                                <div class="sizes mt-5">
                                    <h5 class="text-uppercase"><strong>Actor</strong></h5>
                                    <span class="text-muted brand">Nombre: ${act.actor.name} ${act.actor.lastname1} ${act.actor.lastname2}</span>
                                    <br>
                                    <span class="text-muted brand">Nacimiento: ${act.actor.born}</span>
                                    <br>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Producciones</u></h6>
                                    <div id="produccionesActores">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

        for (let i = 0; i < products.length; i++) {
            $("#produccionesActores").append(`
        <a href="#productionActor" id="production2" data-serial="${products[i].title}">
            <span class="text-muted brand">Nombre: ${products[i].title}</span><br>
        </a>`);
        }

    }

    //!BIND PRODUCTS DIRECTOR LIST IN MENU
    bindProduction(handler) {
        $('#produccionesActores').find('a').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;
            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'productionActor', serial: serial },
                '#productionActor', event
            );
        });

        $('#producciones').find('a').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;

            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'productionDirector', serial: serial },
                '#productionDirector', event
            );
        });
    }

}

export default View;