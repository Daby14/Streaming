"use strict";

//Clase View
class View {

    //Constructor
    constructor() {

        //Accedemos a los elementos html mediante sus ids
        this.main = $('#main');
        this.categorias = $('#categorias');
        this.menu = $('#menu');
    }

    //Método que captura el evento de volver a la página principal de la página web
    bindInit(handler) {
        $('#init').click((event) => {
            handler();
        });
        $('#logo').click((event) => {
            handler();
        });
    }

    //Método que muestra los elementos de la página principal
    showPrincipalElements(pros) {
        this.main.empty();
        this.main.append(`<div id="type-list" class="row inicial">
        <div id="cat1" class="col-lg-4 col-md-6"><a class="prueba" data-type="Categoria1" href="#product-list">
                <div><img class="cat__img" alt="Categoría1" src="./images/catcamara.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Acción</strong></h3>
                </div>
            </a>
        </div>
        <div id="cat2" class="col-lg-4 col-md-6"><a data-type="Categoria2" href="#product-list">
                <div><img class="cat__img" alt="Categoria2" src="./images/catmovi.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Ficción</strong></h3>
                </div>
            </a>
        </div>
        <div id="cat3" class="col-lg-4 col-md-6"><a data-type="Categoria3" href="#product-list">
                <div><img class="cat__img" alt="Categoria3" src="./images/catpportatil.jpg" />
                </div>
                <div class="cat__text">
                    <h3><strong>Aventura</strong></h3>
                </div>
            </a>
        </div>
    </div>`);

        for (let i = 0; i < pros.length; i++) {


            this.main.append(`<div id="types-list" class="row inicial"></div>`);

            let id = $("#types-list");

            id.append(`
        <div class="col-lg-4 col-md-6">
            <a data-type="${pros[i].title}" href="#product-list">
                <div>
                    <img class="cat__img" alt="Produccion ${i}" src="./${pros[i].image}" />
                </div>
                <div class="cat__text">
                    <h3><strong>Producción ${i + 1}</strong></h3>
                </div>
            </a>
        </div>`);
        }

    }

    //Método que captura el evento de hacer click a una categoría
    bindShowCategory(handler) {
        $('#type-list').children().find('a').click(function (event) {
            handler(this.dataset.type);
        });
    }

    //Método que captura el evento de hacer click a una producción
    bindShowProduction(handler) {
        $('#types-list').children().find('a').click(function (event) {
            handler(this.dataset.type);
        });
    }

    //Método que muestra las producciones correspondientes a una categoría
    showProductions(iterator, title) {
        this.main.empty();
        if (this.categorias.children().length > 1)
            this.categorias.children()[1].remove();

        this.main.append(`<div id="product-list" class="container my-3"><div class="row"> </div></div>`);

        let id = $("#product-list");

        let product = iterator.next();

        while (!product.done) {

            id.children().first().append(`<div class="col-md-4">
        <figure class="card card-product-grid card-lg"> <a id="prueba2" data-serial="${product.value.title}" href="#single-product" class="img-wrap"><img class="Serie" src="./${product.value.image}"></a>
            <figcaption class="info-wrap">
                <div class="row">
                    <div class="col-md-8"> <a data-serial="${product.value.title}" href="#single-product" class="title">${product.value.title} <br> ${product.value.nationality} | ${product.value.publication}</a> </div>
                    <div class="col-md-4">
                        <div class="rating text-right"> <i class="fa fa-star"></i> <i class="fa fa-star"></i> <i class="fa fa-star"></i> </div>
                    </div>
                </div>
            </figcaption>
            <div class="bottom-wrap"> <a href="#" data-serial="${product.value.title}" class="compra btn btn-primary float-right"> Acceder </a>
            </div>
        </figure>
    </div>`);

            product = iterator.next();

        }

        id.prepend(`<h1>${title}</h1>`);
    }

    //Método que muestra las categorías en el menú
    showCategoriesInMenu(categories) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#" id="navCats" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Categorías
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="navCats"></div>`);

        for (const iterator of categories) {
            container.append(`<a data-category="${iterator.category.name}" class="dropdown-item" href="#productlist">${iterator.category.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //Método que captura el evento de hacer click en la categoría del menú
    bindProductsCategoryListInMenu(handler) {
        $('#navCats').next().children().click(function (event) {
            handler(this.dataset.category);
        });
    }

    //Método que muestra la carta de la producción con sus actores y directores correspondientes
    showCardProduction(product, director, actor) {
        this.main.empty();

        let container;
        let actor1 = `<span class="text-muted brand">Nombre: ${actor[0].name} ${actor[0].lastname1} ${actor[0].lastname2}</span><br>`
        let actor2 = `<span class="text-muted brand">Nombre: ${actor[1].name} ${actor[1].lastname1} ${actor[1].lastname2}</span><br>`

        if (product) {
            container = $(`<div id="single-product" class="${product.title}-style container mt-5 mb-5">
            <div class="row d-flex justify-content-center">
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
                                    <br>
                                    <h6 class="text-uppercase"><u>Director</u></h6>
                                    <a href="#" id="director" data-serial="${director.name}">
                                    <span class="text-muted brand">Nombre: ${director.name} ${director.lastname1} ${director.lastname2}</span>
                                    </a>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Actores</u></h6>
                                    ${actor1}
                                    ${actor2}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

        } else {
            container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
        }
        this.main.append(container);
    }

    //Método que captura el evento de hacer click en una producción
    bindShowCardProduct(handler) {
        $('#product-list').find('a.img-wrap').click(function (event) {
            handler(this.dataset.serial);
        });
        $('#product-list').find('figcaption a').click(function (event) {
            handler(this.dataset.serial);
        });
        $('#product-list').find('a.compra').click(function (event) {
            handler(this.dataset.serial);
        });
    }

    bindDirector(handler) {
        $('#director').click(function (event) {
            handler(this.dataset.serial);
        });
    }

    //Método que muestra los actores en el menú
    showDirectorInMenu(directors) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#" id="navDirs" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Directores
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="navDirs"></div>`);

        for (const iterator of directors) {
            container.append(`<a data-category="${iterator.director.name}" class="dropdown-item" href="#productlist">${iterator.director.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //Método que captura el evento de hacer click en el director del menú
    bindProductsDirectorListInMenu(handler) {
        $('#navDirs').next().children().click(function (event) {
            handler(this.dataset.category);
        });
    }

    //Método que muestra la carta del director con sus producciones correspondientes
    showCardDirector(product, dir) {
        this.main.empty();

        let container;

        if (product) {
            container = $(`<div id="single-product" class="${dir.director.name}-style container mt-5 mb-5">
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
                                <div class="mt-4 mb-3"> 
                                    <h5 class="text-uppercase"><strong>DIRECTOR</strong></h5>
                                </div>
                                <div class="sizes mt-5">
                                    <span class="text-muted brand">Nombre: ${dir.director.name} ${dir.director.lastname1} ${dir.director.lastname2}</span>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Producciones</u></h6>
                                    <span class="text-muted brand">Nombre: ${product.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

        } else {
            container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
        }
        this.main.append(container);
    }

    //Método que muestra los actores en el menú
    showActorInMenu(actors) {
        let li = $(`<li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle enlaceMenu" href="#" id="navActs" role="button" data-bs-toggle="dropdown" aria-expanded="false" aria-haspopup="true">
          Actores
        </a>
        </li>`);

        let container = $(`<div class="dropdown-menu" aria-labelledby="navActs"></div>`);

        for (const iterator of actors) {
            container.append(`<a data-category="${iterator.actor.name}" class="dropdown-item" href="#productlist">${iterator.actor.name}</a>`);
        }

        li.append(container);
        this.menu.append(li);
    }

    //Método que captura el evento de hacer click en el director del menú
    bindProductsActorListInMenu(handler) {
        $('#navActs').next().children().click(function (event) {
            handler(this.dataset.category);
        });
    }

    //Método que muestra la carta del actor con sus producciones correspondientes
    showCardActor(product, act) {
        this.main.empty();

        let container;

        if (product) {
            container = $(`<div id="single-product" class="${act.actor.name} container mt-5 mb-5">
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
                                <div class="mt-4 mb-3"> 
                                    <h5 class="text-uppercase"><strong>Actor</strong></h5>
                                </div>
                                <div class="sizes mt-5">
                                    <span class="text-muted brand">Nombre: ${act.actor.name} ${act.actor.lastname1} ${act.actor.lastname2}</span>
                                    <br>
                                    <br>
                                    <h6 class="text-uppercase"><u>Producciones</u></h6>
                                    <span class="text-muted brand">Nombre: ${product.title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    <div>`);

        } else {
            container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
        }
        this.main.append(container);
    }

}

export default View;