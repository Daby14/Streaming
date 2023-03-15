"use strict";

import { Person, Category, Serie, Movie, Resource, Coordinate } from "../entities/products.js";

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
    showPrincipalElements(pros, categories) {

        //Vaciamos el main
        this.main.empty();

        this.main.append(`<div id="categoriasIniciales" class="row inicial"></div>`);

        for (let elem of categories) {
            $("#categoriasIniciales").append(`
            <div id="${elem.category.name}" class="col-lg-4 col-md-6">
                <a data-type="${elem.category.name}" href="#categoriasIniciales">
                    <div>
                        <img class="cat__img" alt="${elem.category.name}" src="./images/${elem.category.image}.jpg" />
                    </div>
                    <div class="cat__text">
                        <h3><strong>${elem.category.name}</strong></h3>
                    </div>
                </a>
            </div>`);
        }

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


    //!SHOW FORM PRODUCTION
    //Método que muestra el formulario de crear una producción
    showFormProduction(actores, directores, categorias) {
        this.main.empty();

        this.main.append(`
        <div id="serie_peli" class="serie_peli text-light" class="container m-5" id="cValidation">
            <h1 class="d-flex justify-content-center">Nueva Producción</h1>
            <form id="form" name="fValidationProduction" role="form" class="text-white m-5" novalidate>
                <div id="prueba">
                    <label for="vfOpcion">¿Serie o Pelicula?</label>
                    <select id="selectOption" class="form-select" aria-label="Default select example">
                        <option value=""></option>
                        <option value="Serie">Serie</option>
                        <option value="Pelicula">Pelicula</option>
                    </select>
                </div>
                    
            </form>
        </div>`);

        const selectOption = document.getElementById('selectOption');
        selectOption.addEventListener('change', function () {
            const selectedValue = selectOption.value;

            if (selectedValue === "Serie") {

                $("#prueba").empty();

                $("#prueba").append(`
                    <div id="row" class="form-row row">
                        <div class="col-md-4 mb-3">
                            <label for="vfTitulo">Título</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfTitulo" name="vfTitulo" placeholder="Título" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="vfNacionalidad">Nacionalidad</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfNacionalidad" name="vfNacionalidad"
                                    placeholder="Nacionalidad" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
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
                                    placeholder="Descripción" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
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
                                    placeholder="Contenido" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="vfLatitud">Latitud</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfLatitud" name="vfLatitud"
                                    placeholder="Latitud" value="" pattern="-?[0-9].{2,9}" required>
                                <div class="invalid-feedback">Debe contener números (puede o no contener números negativos)</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="vfLongitud">Longitud</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfLongitud" name="vfLongitud"
                                    placeholder="Longitud" value="" pattern="-?[0-9].{2,9}" required>
                                <div class="invalid-feedback">Debe contener números (puede o no contener números negativos)</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="vfTemporadas">Temporadas</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfTemporadas" name="vfTemporadas"
                                    placeholder="Temporadas" value="" pattern="[0-9]{1,2}" required>
                                <div class="invalid-feedback">Debe contener números (máximo 2)</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                    </div>

                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button> `);

                //Actores
                $("#row").append(`
                    <div class="col-md-8 mb-3">
                        <label for="vfActores">Actores</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfActores" name="vfActores" required multiple></select>
                            <div class="invalid-feedback">Los actores son obligatorios</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < actores.length; i++) {
                    let option = `<option value="${actores[i].actor.name}">${actores[i].actor.name}</option>`;
                    $("#vfActores").append(option);
                }

                //Directores
                $("#row").append(`
                    <div class="col-md-6 mb-3">
                        <label for="vfDirectores">Directores</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfDirectores" name="vfDirectores" required multiple></select>
                            <div class="invalid-feedback">Los directores son obligatorios</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < directores.length; i++) {
                    let option = `<option value="${directores[i].director.name}">${directores[i].director.name}</option>`;
                    $("#vfDirectores").append(option);
                }

                //Categorías
                $("#row").append(`
                    <div class="col-md-6 mb-3">
                        <label for="vfCategorias">Categorías</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfCategorias" name="vfCategorias" required multiple></select>
                            <div class="invalid-feedback">Las categorías son obligatorias</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < categorias.length; i++) {
                    let option = `<option value="${categorias[i].category.name}">${categorias[i].category.name}</option>`;
                    $("#vfCategorias").append(option);
                }

            } else if (selectedValue === "Pelicula") {
                $("#prueba").empty();

                $("#prueba").append(`
                    <div id="row" class="form-row row">
                        <div class="col-md-4 mb-3">
                            <label for="vfTitulo">Título</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfTitulo" name="vfTitulo" placeholder="Título" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>
                        <div class="col-md-4 mb-3">
                            <label for="vfNacionalidad">Nacionalidad</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfNacionalidad" name="vfNacionalidad"
                                    placeholder="Nacionalidad" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
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
                                    placeholder="Descripción" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                                <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
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
                            <label for="vfDuracion">Duracion</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfDuracion" name="vfDuracion"
                                    placeholder="Duracion" value="" pattern="[0-9]{2,3}" required>
                                <div class="invalid-feedback">Debe contener entre 2 y 3 números</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="vfLatitud">Latitud</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfLatitud" name="vfLatitud"
                                    placeholder="Latitud" value="" pattern="-?[0-9].{2,9}" required>
                                <div class="invalid-feedback">Debe contener números (puede o no contener números negativos)</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <label for="vfLongitud">Longitud</label>
                            <div class="input-group">
                                <input type="text" class="form-control" id="vfLongitud" name="vfLongitud"
                                    placeholder="Longitud" value="" pattern="-?[0-9].{2,9}" required>
                                <div class="invalid-feedback">Debe contener números (puede o no contener números negativos)</div>
                                <div class="valid-feedback">Correcto.</div>
                            </div>
                        </div>

                    </div>

                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button> `);

                //Actores
                $("#row").append(`
                    <div class="col-md-6 mb-3">
                        <label for="vfActores">Actores</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfActores" name="vfActores" required multiple></select>
                            <div class="invalid-feedback">Los actores son obligatorios</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < actores.length; i++) {
                    let option = `<option value="${actores[i].actor.name}">${actores[i].actor.name}</option>`;
                    $("#vfActores").append(option);
                }

                //Directores
                $("#row").append(`
                    <div class="col-md-6 mb-3">
                        <label for="vfDirectores">Directores</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfDirectores" name="vfDirectores" required multiple></select>
                            <div class="invalid-feedback">Los directores son obligatorios</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < directores.length; i++) {
                    let option = `<option value="${directores[i].director.name}">${directores[i].director.name}</option>`;
                    $("#vfDirectores").append(option);
                }

                //Categorías
                $("#row").append(`
                    <div class="col-md-6 mb-3">
                        <label for="vfCategorias">Categorías</label>
                        <div class="form-group">
                            <select class="form-select custom-select" id="vfCategorias" name="vfCategorias" required multiple></select>
                            <div class="invalid-feedback">Las categorías son obligatorias</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>`);

                for (let i = 0; i < categorias.length; i++) {
                    let option = `<option value="${categorias[i].category.name}">${categorias[i].category.name}</option>`;
                    $("#vfCategorias").append(option);
                }
            }

        });

    }

    //!BIND SUBMIT FORM
    //Método que captura el evento submit al envíar los datos de la nueva producción
    bindSubmitForm(handler) {

        document.getElementById("form").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#form").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                let produccion;

                let titulo = document.getElementById("vfTitulo").value;
                let nacionalidad = document.getElementById("vfNacionalidad").value;
                let publicacion = document.getElementById("vfPublicacion").value;
                let descripcion = document.getElementById("vfDescripcion").value;

                let imagen = document.getElementById("vfImagen").value;
                let segundaParte = imagen.substring(12);
                let imagenFull = "./images/" + segundaParte;

                let temporadas = document.getElementById("vfTemporadas");

                if (temporadas != null) {

                    let temporadas = document.getElementById("vfTemporadas").value;
                    let contenido = document.getElementById("vfContenido").value;
                    let latitud = document.getElementById("vfLatitud").value;
                    let longitud = document.getElementById("vfLongitud").value;

                    let coordinate = new Coordinate(latitud, longitud);

                    produccion = new Serie(titulo, nacionalidad, publicacion, descripcion, imagenFull, contenido, coordinate, temporadas);

                } else if (temporadas == null) {

                    let latitud = document.getElementById("vfLatitud").value;
                    let longitud = document.getElementById("vfLongitud").value;

                    let duracion = document.getElementById("vfDuracion").value;

                    let coordinate = new Coordinate(latitud, longitud);

                    let resource = new Resource(duracion, "movies/movie.mp4");

                    produccion = new Movie(titulo, nacionalidad, publicacion, descripcion, imagenFull, resource, coordinate);
                }

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

                handler(produccion, actores, directores, categorias);
            }



        });

    }

    //!SHOW FORM DELETE PRODUCTION
    //Método que muestra el formulario de eliminar una producción
    showFormDeleteProduction() {
        this.main.empty();
        this.main.append(`
        <div class="container m-5" id="cValidation">
			<h1 class="d-flex justify-content-center">Eliminar Producción</h1>
			<form id="formProduction" name="fValidation" role="form" class="text-white m-5" novalidate>
				<div id="row" class="d-flex justify-content-center form-row row">
					<div class="col-md-4 mb-3">
						<label for="vfTituloProduccion">Título</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfTituloProduccion" name="vfTituloProduccion" placeholder="Título" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

				</div>

                <div class="d-flex botones">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>
				
			</form>
		</div>`);
    }

    //!BIND SUBMIT FORM PRODUCTION
    //Método que captura el evento submit al envíar los datos de la producción eliminada
    bindSubmitFormProduction(handler) {

        document.getElementById("formProduction").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formProduction").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                let titulo = document.getElementById("vfTituloProduccion").value;

                handler(titulo);
            }


        });

    }

    //!SHOW FORM ASSIGN DIRECTORS ACTORS
    //Método que muestra el formulario de asignar directores/actores
    showFormAssignDirectorsActors(actores, directores, producciones) {
        this.main.empty();

        this.main.append(`<div class="container m-5" id="cValidation">
        <h1 class="d-flex justify-content-center tituloFormAssignDirectorsActors">Asignar Actores/Directores</h1>
        <br>
        <form id="formAssignDirectorsActors" name="fValidation" role="form" class="text-white" novalidate>
            <div id="row" class="form-row row">

                
                <div class="col-md-4 mb-3">
                    <label for="vfDirectores">Directores</label>
                    <select class="form-select custom-select" id="selectDirectores" name="selectDirectores" required multiple></select> 
                    <div class="invalid-feedback">Los directores son obligatorios</div>
                    <div class="valid-feedback">Correcto.</div>   
                </div>

                
                <div class="col-md-4 mb-3">
                <label for="vfActores">Actores</label>
                    <select class="form-select custom-select" id="selectActores" name="selectActores" required multiple></select>
                    <div class="invalid-feedback">Los actores son obligatorios</div>
                    <div class="valid-feedback">Correcto.</div>  
                </div>

                
                
                <div class="col-md-4 mb-3">
                <label for="vfProducciones">Producciones</label>
                    <select class="form-select custom-select" id="selectProducciones" name="selectProducciones" required multiple></select>
                    <div class="invalid-feedback">Las producciones son obligatorias</div>
                    <div class="valid-feedback">Correcto.</div>  
                </div>

            </div>

            <button class="btn btn-primary" type="submit">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </form>
    </div>`);

        for (let dir of directores) {
            $("#selectDirectores").append(`<option value="${dir.director.name}">${dir.director.name}</option>`);
        }

        for (let act of actores) {
            $("#selectActores").append(`<option value="${act.actor.name}">${act.actor.name}</option>`);
        }

        for (let pro of producciones) {
            $("#selectProducciones").append(`<option value="${pro.title}">${pro.title}</option>`);
        }

    }

    //!BIND SUBMIT ASSIGN DIRECTORS ACTORS
    //Método que captura el evento submit al envíar los datos de asignar directores/actores
    bindSubmitAssignDirectorsActors(handler) {

        document.getElementById("formAssignDirectorsActors").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formAssignDirectorsActors").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                //Actores
                let actores = [];

                const selectActor = document.getElementById("selectActores");
                const opcionesSeleccionadasActor = selectActor.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasActor.length; i++) {
                    actores.push(opcionesSeleccionadasActor[i].value);
                }

                //Directores
                let directores = [];

                const selectDirector = document.getElementById("selectDirectores");
                const opcionesSeleccionadasDirector = selectDirector.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasDirector.length; i++) {
                    directores.push(opcionesSeleccionadasDirector[i].value);
                }

                //Producciones
                let producciones = [];

                const selectProduccion = document.getElementById("selectProducciones");
                const opcionesSeleccionadasProducciones = selectProduccion.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasProducciones.length; i++) {
                    producciones.push(opcionesSeleccionadasProducciones[i].value);
                }

                handler(actores, directores, producciones);
            }

        });

    }

    //!SHOW FORM DEASSIGN DIRECTORS ACTORS
    //Método que muestra el formulario de desasignar directores/actores
    showFormDeassignDirectorsActors(actores, directores, producciones) {
        this.main.empty();

        this.main.append(`<div class="container m-5" id="cValidation">
        <h1 class="d-flex justify-content-center tituloFormDeassignDirectorsActors">Desasignar Actores/Directores</h1>
        <br>
        <form id="formDeassignDirectorsActors" name="fValidation" role="form" class="text-white" novalidate>
            <div id="row" class="form-row row">
                <div class="col-md-4 mb-3">
                    <label for="vfDirectores">Directores</label>
                    <select class="form-select custom-select" id="selectDirectores" name="selectDirectores" required multiple></select>
                    <div class="invalid-feedback">Los directores son obligatorios</div>
                    <div class="valid-feedback">Correcto.</div> 
                </div>

                <div class="col-md-4 mb-3">
                    <label for="vfActores">Actores</label>
                    <select class="form-select custom-select" id="selectActores" name="selectActores" required multiple></select>
                    <div class="invalid-feedback">Los actores son obligatorios</div>
                    <div class="valid-feedback">Correcto.</div> 
                </div>

                <div class="col-md-4 mb-3">
                    <label for="vfProducciones">Producciones</label>
                    <select class="form-select custom-select" id="selectProducciones" name="selectProducciones" required multiple></select>
                    <div class="invalid-feedback">Las producciones son obligatorias</div>
                    <div class="valid-feedback">Correcto.</div> 
                </div>

            </div>

            <button class="btn btn-primary" type="submit">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </form>
    </div>`);

        for (let dir of directores) {
            $("#selectDirectores").append(`<option value="${dir.director.name}">${dir.director.name}</option>`);
        }

        for (let act of actores) {
            $("#selectActores").append(`<option value="${act.actor.name}">${act.actor.name}</option>`);
        }

        for (let pro of producciones) {
            $("#selectProducciones").append(`<option value="${pro.title}">${pro.title}</option>`);
        }

    }

    //!BIND SUBMIT DEASSIGN DIRECTORS ACTORS
    //Método que captura el evento submit al envíar los datos de deasignar directores/actores
    bindSubmitDeassignDirectorsActors(handler) {

        document.getElementById("formDeassignDirectorsActors").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formDeassignDirectorsActors").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                //Actores
                let actores = [];

                const selectActor = document.getElementById("selectActores");
                const opcionesSeleccionadasActor = selectActor.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasActor.length; i++) {
                    actores.push(opcionesSeleccionadasActor[i].value);
                }

                //Directores
                let directores = [];

                const selectDirector = document.getElementById("selectDirectores");
                const opcionesSeleccionadasDirector = selectDirector.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasDirector.length; i++) {
                    directores.push(opcionesSeleccionadasDirector[i].value);
                }

                //Producciones
                let producciones = [];

                const selectProduccion = document.getElementById("selectProducciones");
                const opcionesSeleccionadasProducciones = selectProduccion.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasProducciones.length; i++) {
                    producciones.push(opcionesSeleccionadasProducciones[i].value);
                }

                handler(actores, directores, producciones);
            }


        });

    }

    //!SHOW FORM CATEGORY
    //Método que muestra el formulario de la nueva categoría
    showFormCategory() {
        this.main.empty();
        this.main.append(`
        <div class="container m-5" id="cValidation">
			<h1 class="d-flex justify-content-center">Nueva Categoría</h1>
			<form id="formCategory" name="fValidation" role="form" class="text-white m-5" novalidate>
				<div id="row" class="form-row row">
					<div class="col-md-6 mb-3">
						<label for="vfNombre">Nombre</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfNombre" name="vfNombre" placeholder="Título" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfDescripcion">Descripción</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfDescripcion" name="vfDescripcion" placeholder="Título" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfImagen">Imagen</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfImagen" name="vfImagen" placeholder="Imagen" value="" required>
							<div class="invalid-feedback">La imagen es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>

				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</form>
		</div>`);

    }

    //!BIND SUBMIT FORM CATEGORY
    //Método que captura el evento submit al envíar los datos de la categoría creada
    bindSubmitFormCategory(handler) {

        document.getElementById("formCategory").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formCategory").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                let nombre = document.getElementById("vfNombre").value;
                let descripcion = document.getElementById("vfDescripcion").value;
                let imagen = document.getElementById("vfImagen").value;

                let category = new Category(nombre, descripcion, imagen);

                handler(category);
            }


        });

    }

    //!SHOW FORM DELETE CATEGORY
    //Método que muestra el formulario de la categoría eliminada
    showFormDeleteCategory(categories) {

        if (categories.length === 0) {
            this.main.empty();

            this.main.append(`<h1 id="categoriaVacia" class="text-light d-flex justify-content-center categoriasVacias">NO EXISTEN CATEGORÍAS PARA BORRAR</h1>`);

        } else {
            this.main.empty();

            this.main.append(`<div class="container m-5" id="cValidation">
        <h1 class="tituloFormCategory">Eliminar Categoría</h1>
        <form id="formDeleteCategory" name="fValidation" role="form" class="text-white" novalidate>
            <div id="row" class="form-row row">
                <div class="col-md-6 mb-3">
                    <select class="form-select" id="selectCategorias" required>
                        <option value=""></option>
                    </select>
                    <div class="invalid-feedback">La categoría es obligatoria</div>
					<div class="valid-feedback">Correcto.</div>
                </div>

            </div>

            <button class="btn btn-primary" type="submit">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </form>
    </div>`);

            for (let cat of categories) {
                $("#selectCategorias").append(`<option value="${cat.category.name}">${cat.category.name}</option>`);
            }
        }



    }

    //!BIND SUBMIT DELETE FORM CATEGORY
    //Método que captura el evento submit al envíar los datos de la categoría eliminada
    bindSubmitDeleteFormCategory(handler) {

        let id = document.getElementById("categoriaVacia");

        if (id == null) {
            document.getElementById("formDeleteCategory").addEventListener("submit", function (event) {

                event.preventDefault();

                $("#formDeleteCategory").addClass('was-validated');

                if (this.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    const select = document.getElementById("selectCategorias");
                    const opcionSeleccionada = select.value;

                    handler(opcionSeleccionada);
                }


            });
        }

    }

    //!SHOW FORM PERSON
    //Método que muestra el formulario de la nueva person
    showFormPerson() {
        this.main.empty();
        this.main.append(`
        <div class="container m-5" id="cValidation">
			<h1 class="d-flex justify-content-center">Nueva Person</h1>
			<form id="formPerson" name="fValidation" role="form" class="text-white m-5" novalidate>
				
                <div id="row" class="form-row row">
					<div class="col-md-6 mb-3">
						<label for="vfNombre">Nombre</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfNombre" name="vfNombre" placeholder="Nombre" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfApellido1">Apellido 1</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfApellido1" name="vfApellido1" placeholder="Apellido 1" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfApellido2">Apellido 2</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfApellido2" name="vfApellido2" placeholder="Apellido 2" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfNacimiento">Fecha de Nacimiento</label>
						<div class="input-group">
							<input type="date" class="form-control" id="vfNacimiento" name="vfNacimiento" placeholder="Fecha de Nacimiento" value="" required>
							<div class="invalid-feedback">La fecha de nacimiento es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfPicture">Imagen</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfPicture" name="vfPicture" placeholder="Imagen" value="" required>
							<div class="invalid-feedback">La imagen es obligatoria</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>

                    <div class="col-md-6 mb-3">
						<label for="vfTipoPerson">Tipo Person</label>
						<div class="input-group">
                            <select class="form-select" id="selectPerson" required>
                                <option value=""></option>
                                <option value="Actor">Actor</option>
                                <option value="Director">Director</option>
                            </select>
                            <div class="invalid-feedback">El tipo de person es obligatorio</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
				</div>

				<button class="btn btn-primary" type="submit">Enviar</button>
				<button class="btn btn-primary" type="reset">Cancelar</button>
			</form>
		</div>`);

    }

    //!BIND SUBMIT FORM PERSON
    //Método que captura el evento submit al envíar los datos de la person creada
    bindSubmitFormPerson(handler) {

        document.getElementById("formPerson").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formPerson").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                let nombre = document.getElementById("vfNombre").value;
                let apellido1 = document.getElementById("vfApellido1").value;
                let apellido2 = document.getElementById("vfApellido2").value;
                let nacimiento = document.getElementById("vfNacimiento").value;
                let imagen = document.getElementById("vfPicture").value;

                let imagenFull = "./images/" + imagen + ".jpg";

                const select = document.getElementById("selectPerson");
                let opcionSeleccionada = select.value;

                let tipoPerson;

                if (opcionSeleccionada === "Actor") {
                    tipoPerson = "Actor";
                } else if (opcionSeleccionada === "Director") {
                    tipoPerson = "Director";
                }

                let person = new Person(nombre, apellido1, apellido2, nacimiento, imagenFull);

                handler(person, tipoPerson);
            }


        });

    }

    //!SHOW FORM DELETE PERSON
    //Método que muestra el formulario de la person elimiinada
    showFormDeletePerson(directores, actores) {
        this.main.empty();

        this.main.append(`<div class="container m-5" id="cValidation">
        <h1 class="tituloFormCategory">Eliminar Person</h1>
        <br>
        <form id="formDeletePerson" name="fValidation" role="form" class="text-white" novalidate>
            <div id="row" class="form-row row">
                <div class="col-md-4 mb-3">
                    <select class="form-select custom-select" id="selectDirectores" name="selectDirectores" required multiple></select>
                    <div class="invalid-feedback">Los directores son obligatorios</div>
					<div class="valid-feedback">Correcto.</div>
                </div>

                <div class="col-md-4 mb-3">
                    <select  class="form-select custom-select" id="selectActores" name="selectActores" required multiple></select>
                    <div class="invalid-feedback">Los actores son obligatorios</div>
					<div class="valid-feedback">Correcto.</div>
                </div>

            </div>

            <button class="btn btn-primary" type="submit">Enviar</button>
            <button class="btn btn-primary" type="reset">Cancelar</button>
        </form>
    </div>`);



        for (let dir of directores) {
            $("#selectDirectores").append(`<option value="${dir.director.name}">${dir.director.name}</option>`);
        }

        for (let act of actores) {
            $("#selectActores").append(`<option value="${act.actor.name}">${act.actor.name}</option>`);
        }

    }

    //!BIND SUBMIT DELETE FORM PERSON
    //Método que captura el evento submit al envíar los datos de la person eliminada
    bindSubmitDeleteFormPerson(handler) {

        document.getElementById("formDeletePerson").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formDeletePerson").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                //Actores
                let actores = [];

                const selectActor = document.getElementById("selectActores");
                const opcionesSeleccionadasActor = selectActor.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasActor.length; i++) {
                    actores.push(opcionesSeleccionadasActor[i].value);
                }

                //Directores
                let directores = [];

                const selectDirector = document.getElementById("selectDirectores");
                const opcionesSeleccionadasDirector = selectDirector.selectedOptions;
                for (let i = 0; i < opcionesSeleccionadasDirector.length; i++) {
                    directores.push(opcionesSeleccionadasDirector[i].value);
                }


                handler(actores, directores);
            }


        });

    }

    //!SHOW FORM IN MENU
    //Método que muestra los formularios en el menú
    showFormInMenu() {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#menuForm" id="menuForm" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
            Formularios
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="menuForm" id="formularios"></div>`);

        let forms = [];

        forms.push("Crear Producción");
        forms.push("Eliminar Producción");
        forms.push("Asignar actores/directores");
        forms.push("Desasignar actores/directores");
        forms.push("Crear categoría");
        forms.push("Eliminar categoría");
        forms.push("Crear person");
        forms.push("Eliminar person");

        for (let i = 0; i < forms.length; i++) {
            container.append(`<a data-category="${forms[i]}" class="dropdown-item" href="#formList">${forms[i]}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //!BIND FORM IN MENU
    //Método que captura el evento de hacer click en un formulario del menú
    bindFormInMenu(handler) {
        $('#formularios').find('a').click((event) => {
            let category = $(event.target).closest($('a')).get(0).dataset.category;
            this.#executeHandlerHistory(
                handler, [category],
                'body',
                { action: 'formularios', category: category },
                '#formularios', event
            );
        });
    }

    //!SHOW PRODUCT MODAL
    //Método que muestra el modal de una nueva producción
    showProductModal(done, product, error) {
        $(document.fNewProduct).find('div.error').remove();
        if (done) {
            let modal = $(`<div class="modal fade" id="newProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Producción creada</h5>
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
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("form");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
        } else {
            $(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La producción <strong>${product.title}</strong> no ha podido crearse correctamente.</div>`);
        }
    }

    //!SHOW DELETE PRODUCT MODAL
    //Método que muestra el modal de la producción eliminada
    showDeleteProductModal(done, product, error) {
        if (done) {
            let modal = $(`<div class="modal fade" id="deleteProductModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Producción eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La producción <strong>${product.title}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
            $('body').append(modal);
            let newProductModal = $('#deleteProductModal');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formProduction");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
        } else {
            let modal = $(`<div class="modal fade" id="deleteProductModal" tabindex="-1"
            data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="newCategoryModalLabel">Producción Inexistente</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body text-danger">
                        <p class="text-danger">Esa producción no existe!!!!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
                    </div>
                </div>
            </div>
        </div>`);

            $('body').append(modal);
            let newProductModal = $('#deleteProductModal');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formProduction");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
        }
    }

    //!SHOW CATEGORY MODAL
    //Método que muestra el modal de la nueva categoría
    showCategoryModal(done, category, error) {
        $(document.fNewProduct).find('div.error').remove();
        if (done) {
            let modal = $(`<div class="modal fade" id="modalCat" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Categoría creada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${category.name}</strong> ha sido creada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
            $('body').append(modal);
            let newProductModal = $('#modalCat');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formCategory");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
        } else {
            $(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> La categoría <strong>${category.name}</strong> no ha podido crearse correctamente.</div>`);
        }
    }

    //!SHOW DELETE CATEGORY MODAL
    //Método que muestra el modal de la categoría eliminada
    showDeleteCategoryModal(done, category, error) {
        // console.log(done);
        if (done) {
            let modal = $(`<div class="modal fade" id="deleteCategoryModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Categoría eliminada</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							La categoría <strong>${category.category.name}</strong> ha sido eliminada correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
            $('body').append(modal);
            let newProductModal = $('#deleteCategoryModal');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                // const formulario = document.getElementById("formDeleteCategory");
                // console.log(formulario);
                // formulario.reset();
            })
        }
    }

    //!SHOW PERSON MODAL
    //Método que muestra el modal de la nueva person
    showPersonModal(done, person, error, tipoPerson) {
        if (done) {
            let modal = $(`<div class="modal fade" id="modalPerson" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">${tipoPerson} creado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body">
							El ${tipoPerson} <strong>${person.name}</strong> ha sido creado correctamente.
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
            $('body').append(modal);
            let newProductModal = $('#modalPerson');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formPerson");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
        } else {
            $(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El ${tipoPerson} <strong>${person.name}</strong> no ha podido crearse correctamente.</div>`);
        }
    }

    //!SHOW DELETE PERSON MODAL
    //Método que muestra el modal de la person eliminada
    showDeletePersonModal(done, actores, directores, error) {
        if (done) {
            $('body').append(`<div class="modal fade" id="modalDeletePerson" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Person eliminado</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body" id="deletePerson">
                        
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);

            for (let act of actores) {
                $("#deletePerson").append(`El actor <strong>${act}</strong> ha sido eliminado correctamente. <br>`)
            }

            for (let dir of directores) {
                $("#deletePerson").append(`El director <strong>${dir}</strong> ha sido eliminado correctamente. <br>`)
            }

            let newProductModal = $('#modalDeletePerson');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                // const formulario = document.getElementById("formDeletePerson");
                // formulario.reset();
                // formulario.setAttribute("class", "text-white");
            })
        } else {
            $(document.fNewProduct).prepend(`<div class="error text-danger p-3"><i class="fas fa-exclamation-triangle"></i> El ${tipoPerson} <strong>${person.name}</strong> no ha podido crearse correctamente.</div>`);
        }
    }

    //!SHOW DIRECTORS ACTORS MODAL
    //Método que muestra el modal de asignar directores/actores
    showDirectorsActorsModal(done, actores, directores, producciones, error) {
        if (done) {
            $('body').append(`<div class="modal fade" id="modalDirectorsActors" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Asignación Actores/Directores</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body" id="directorsActors">
                        
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);

            for (let pro of producciones) {
                $("#directorsActors").append(`A la producción <strong>${pro.title}</strong> se le han asignado: <br>`)

                for (let act of actores) {
                    $("#directorsActors").append(`El actor <strong>${act.actor.name}</strong> <br>`)
                }

                for (let dir of directores) {
                    $("#directorsActors").append(`El director <strong>${dir.director.name}</strong> <br>`)
                }

            }

            let newProductModal = $('#modalDirectorsActors');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formAssignDirectorsActors");
                formulario.reset();
                formulario.setAttribute("class", "text-white");
            })
        }
    }

    //!SHOW DEASSIGN DIRECTORS ACTORS MODAL
    //Método que muestra el modal de deasignar directores/actores
    showDeassignDirectorsActorsModal(done, actores, directores, producciones, error) {
        if (done) {
            $('body').append(`<div class="modal fade" id="modalDeassignDirectorsActors" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Deasignación Actores/Directores</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body" id="deassingDirectorsActors">
                        
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);

            for (let pro of producciones) {
                $("#deassingDirectorsActors").append(`A la producción <strong>${pro.title}</strong> se le ha deasignado: <br>`)

                for (let act of actores) {
                    $("#deassingDirectorsActors").append(`El actor <strong>${act.actor.name}</strong> <br>`)
                }

                for (let dir of directores) {
                    $("#deassingDirectorsActors").append(`El director <strong>${dir.director.name}</strong> <br>`)
                }

            }

            let newProductModal = $('#modalDeassignDirectorsActors');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formDeassignDirectorsActors");
                formulario.reset();
                formulario.setAttribute("class", "text-white");
            })
        } else {
            $('body').append(`<div class="modal fade" id="modalDeassignDirectorsActors" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Deasignación Actores/Directores</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body" id="deassingDirectorsActors">
                        
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);

            for (let pro of producciones) {
                $("#deassingDirectorsActors").append(`A la producción <strong>${pro.title}</strong> no se le ha deasignado algunos actores/directores porque no existen en <strong>${pro.title}</strong> <br>`)

            }

            let newProductModal = $('#modalDeassignDirectorsActors');
            newProductModal.modal('show');
            newProductModal.find('button').click(() => {
                newProductModal.modal('hide');
                newProductModal.remove();
                const formulario = document.getElementById("formDeassignDirectorsActors");
                formulario.reset();
                formulario.setAttribute("class", "text-white m-5");
            })
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

    showPrueba() {
        this.main.empty();
    }

    //!SHOW CATEGORIES IN MENU
    //Método que muestra las categorías en el menú
    showCategoriesInMenu(categories) {
        this.menu.empty();
        let li = $(`<li id="menuCat" class="nav-item dropdown">
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

        let publication = (product.publication).replace(/-/g, "/");

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
                                    <div id="directores">

                                    </div>
                                    <br>
                                    <br>
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

            if (directors.length !== 0) {
                $('#directores').append(`<h6 class="text-uppercase"><u>Directores</u></h6>`);
            }

            if (actors.length !== 0) {
                $('#actores').append(`<h6 class="text-uppercase"><u>Actores</u></h6>`);
            }


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
                                    <div id="directores">

                                    </div>
                                    <br>
                                    <br>
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

            if (directors.length !== 0) {
                $('#directores').append(`<h6 class="text-uppercase"><u>Directores</u></h6>`);
            }

            if (actors.length !== 0) {
                $('#actores').append(`<h6 class="text-uppercase"><u>Actores</u></h6>`);
            }

            for (let i = 0; i < directors.length; i++) {
                $("#directores").append(`<a href="#" id="director" data-serial="${directors[i].name}"><span class="text-muted brand">Nombre: ${directors[i].name} ${directors[i].lastname1} ${directors[i].lastname2}</span><br></a>`);
            }

            for (let i = 0; i < actors.length; i++) {
                $("#actores").append(`<a href="#" id="actor" data-serial="${actors[i].name}"><span class="text-muted brand">Nombre: ${actors[i].name} ${actors[i].lastname1} ${actors[i].lastname2}</span><br></a>`);
            }


        }

        this.main.append($('<div class="container"><div class="m-4" id="mapid"></div></div>'));
        let mapContainer = $('#mapid');
        mapContainer.css({
            height: '350px',
            border: '2px solid #faa541'
        });

        let map = L.map('mapid')
            .setView([product.locations.latitude, product.locations.longitude], 15);

        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
            maxZoom: 18
        }).addTo(map);

        let marker = L.marker([product.locations.latitude, product.locations.longitude]).addTo(map);

        if (product.nationality === "España") {
            marker.bindPopup('<strong>Madrid</strong>').openPopup();
        } else if (product.nationality === "Nueva Zelanda (Wellington)") {
            marker.bindPopup('<strong>Nueva Zelanda</strong>').openPopup();
        } else if (product.nationality === "Estados Unidos") {
            marker.bindPopup('<strong>Estados Unidos (Kansas City)</strong>').openPopup();
        } else if (product.nationality === "California") {
            marker.bindPopup('<strong>California City</strong>').openPopup();
        }

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

        if (products.length !== 0) {
            $("#producciones").append(`<h6 class="text-uppercase"><u>Producciones</u></h6>`);
        }
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

        if (products.length !== 0) {
            $("#produccionesActores").append(`<h6 class="text-uppercase"><u>Producciones</u></h6>`);
        }

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

    showFormLogin() {

        this.main.empty();

        this.main.append(`<div class="container m-5 " id="cValidation">
            <h1 class="tituloFormUser d-flex justify-content-center">Login Usuario</h1>
            <br>
            <form id="formUser" name="fValidation" role="form" class="text-white" novalidate>
                <div id="row" class="form-row row d-flex justify-content-center">
                    <div class="col-md-4 mb-3">
                        <label for="vfUser">Usuario</label>
                        <div class="input-group">
                            <input type="text" class="form-control" id="vfUser" name="vfUser" placeholder="Usuario" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
                            <div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
                            <div class="valid-feedback">Correcto.</div>
                        </div>
                    </div>
    
                    <div class="col-md-4 mb-3">
						<label for="vfPassword">Contraseña</label>
						<div class="input-group">
							<input type="text" class="form-control" id="vfPassword" name="vfPassword" placeholder="Password" value="" pattern="[A-Z]{1}[a-z]{2,9}" required>
							<div class="invalid-feedback">Debe contener 1 mayúscula y varias minúsculas</div>
							<div class="valid-feedback">Correcto.</div>
						</div>
					</div>
    
                </div>
    
                <div class="d-flex justify-content-center gap-5 mt-5">
                    <button class="btn btn-primary" type="submit">Enviar</button>
                    <button class="btn btn-primary" type="reset">Cancelar</button>
                </div>

                
            </form>
        </div>`);

    }

    showButtonRegisterInMenu() {
        $("#headerEnd").append(`<a href="#"><button id="login" type="button" data-serial="botonLogin" class="btn btn-warning">Login</button></a>`);
    }

    bindButtonRegister(handler) {

        $('#login').click((event) => {
            let serial = $(event.target).closest($('a')).get(0).dataset.serial;

            this.#executeHandlerHistory(
                handler, [serial],
                'body',
                { action: 'formLogin', serial: serial },
                '#formLogin', event
            );
        });

    }

    bindSubmitFormLogin(handler) {

        document.getElementById("formUser").addEventListener("submit", function (event) {

            event.preventDefault();

            $("#formUser").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            } else {
                let usuario = document.getElementById("vfUser").value;
                let password = document.getElementById("vfPassword").value;

                handler(usuario, password);
            }

        });

    }

    showButtonLogOut(usuario) {

        this.menu.append(`<li id="menuCookie" class="nav-item dropdown mt-2">Hola ${usuario}</li>`);

        $("#login").css({ display: "none" });

        $("#headerEnd").append(`<a href="#"><button id="desconectar" type="button" data-serial="botonDesconectar" class="btn btn-warning">Desconectar</button></a>`);

    }

    bindLogOut(handler) {

        $('#desconectar').click((event) => {

            handler();

        });

    }

    showLoginModal() {

        let modal = $(`<div class="modal fade" id="newLoginModal" tabindex="-1"
				data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="newCategoryModalLabel" aria-hidden="true">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="newCategoryModalLabel">Login Incorrecto</h5>
							<button type="button" class="close" data-dismiss="modal" aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
						</div>
						<div class="modal-body text-danger">
							Ese usuario no existe en el sistema
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" data-dismiss="modal">Aceptar</button>
						</div>
					</div>
				</div>
			</div>`);
        $('body').append(modal);
        let newProductModal = $('#newLoginModal');
        newProductModal.modal('show');
        newProductModal.find('button').click(() => {
            newProductModal.modal('hide');
            newProductModal.remove();
            const formulario = document.getElementById("formUser");
            formulario.reset();
            formulario.setAttribute("class", "text-white m-5");
        })
    }

    showGeocoder() {

        //Contenedor del mapa
        this.main.append($(`<div class="container p-4">
			<form id="formGeocoder" class="text-white" method="get" action="https://nominatim.openstreetmap.org/search" novalidate>
				<input type="hidden" name="format" value="json">
				<input type="hidden" name="limit" value="3">
				<h2>GeoCoder</h2>
				<div class="form-group row">
					<div class="col-sm-10">
						<label for="address" class="col-form-label">Dirección</label>
						<input type="text" name="q" class="form-control" id="address" placeholder="Introduce la dirección a buscar" required>
                        <div class="invalid-feedback">La dirección es obligatoria</div>
						<div class="valid-feedback">Correcto.</div>
					</div>
					<div class="col-sm-2 buscarGeo">
						<button id="bAddress" class="btn btn-primary" type="submit">Buscar</button>
					</div>
				</div>
				<div id="geocoderAddresses"></div>
				<div id="geocoderMap" class="my-2"></div>
			</form>
		</div>`));

        let form = $('#formGeocoder');

        document.getElementById("formGeocoder").addEventListener("submit", function (event) {
            event.preventDefault();
            $("#formGeocoder").addClass('was-validated');

            if (this.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            };

        })

        let addresses = $('#geocoderAddresses');
        let mapContainer = $('#geocoderMap');
        let map = null;

        form.submit(function (event) {
            let form = $(this);
            $.get(this.action + '?' + form.serialize()).then(
                function (data) {
                    let list = $('<div class="list-group"></div>');
                    data.forEach((address) => {
                        list.append(`<a href="#" data-lat="${address.lat}" data-lon="${address.lon}" class="list-group-item list-group-item-action">
							${address.display_name}</a>`);
                    });
                    addresses.empty();
                    addresses.append(list);
                    list.find('a').click(function (event) {
                        $(this).siblings().removeClass('active');
                        $(this).addClass('active');
                        if (map) {
                            map.setView(new L.LatLng(this.dataset.lat, this.dataset.lon), 15);
                        } else {
                            mapContainer.css({ height: '350px', border: '2px solid #faa541' });
                            map = L.map('geocoderMap').setView([this.dataset.lat, this.dataset.lon], 15);
                            L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                                attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
                                maxZoom: 18
                            }).addTo(map);
                        }
                        L.marker([this.dataset.lat, this.dataset.lon]).addTo(map);
                        event.preventDefault();
                        event.stopPropagation();
                    })
                }, function (error) {
                    addresses.empty();
                    addresses.append(`<div class="text-danger">
						<i class="fas fa-exclamation-circle"></i>
						No se ha podido establecer la conexión con el servidor de mapas.
					</div>`);
                }
            );

            event.preventDefault();
            event.stopPropagation();

        })

    }
}

export default View;