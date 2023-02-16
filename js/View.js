"use strict";

class View {
    constructor() {
        this.main = $('#main');
        this.categorias = $('#categorias');
        this.menu = $('#menu');
    }

    bindInit(handler) {
        $('#init').click((event) => {
            handler();
        });
        $('#logo').click((event) => {
            handler();
        });
    }

    showProductTypes(pros) {
        this.main.empty();
        this.main.append(`<div id="type-list" class="row inicial">
        <div id="cat1" class="col-lg-4 col-md-6"><a class="prueba" data-type="Categoria1" href="#product-list">
                <div><img class="cat__img" alt="Categoría1" src="./images/catcamara.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoría 1</h3>
                    <div>Acción</div>
                </div>
            </a>
        </div>
        <div id="cat2" class="col-lg-4 col-md-6"><a data-type="Categoria2" href="#product-list">
                <div><img class="cat__img" alt="Categoria2" src="./images/catmovi.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoria 2</h3>
                    <div>Deportes</div>
                </div>
            </a>
        </div>
        <div id="cat3" class="col-lg-4 col-md-6"><a data-type="Categoria3" href="#product-list">
                <div><img class="cat__img" alt="Categoria3" src="./images/catpportatil.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoria 3</h3>
                    <div>Aventura</div>
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
                    <h3>Producción ${i}</h3>
                </div>
            </a>
        </div>`);
        }

    }


    bindShowMovies(handler) {
        $('#type-list').children().find('a').click(function (event) {
            handler(this.dataset.type);
        });
    }

    showMovies(iterator, title) {
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
            <div class="bottom-wrap"> <a href="#" data-serial="${product.value.title}" class="compra btn btn-primary float-right"> Comprar </a>
            </div>
        </figure>
    </div>`);

            product = iterator.next();

        }

        id.prepend(`<h1>${title}</h1>`);
    }



    showCategories(categories) {
        if (this.categories.children().length > 1)
            this.categories.children()[1].remove();
        let container = $('<div id="category-list" class="row"></div>');
        for (let category of categories) {
            container.append(`<div class="col-lg-3 col-md-6"><a data-category="${category.title}" href="#product-list">
					<div class="cat-list-image"><img alt="${category.title}" src="${category.url}" />
					</div>
					<div class="cat-list-text">
						<h3>${category.title}</h3>
						<div>${category.description}</div>
					</div>
				</a>
			</div>`);
        }
        this.categories.append(container);
    }

    bindProductsCategoryList(handler) {
        $('#category-list').find('a').click(function (event) {
            handler(this.dataset.category);
        });
    }

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

    bindProductsCategoryListInMenu(handler) {

        $('#navCats').next().children().click(function (event) {
            handler(this.dataset.category);
        });

    }

    showProduct(product, message) {
        this.main.empty();

        let container;
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
										<div class="mt-4 mb-3"> <span class="text-uppercase text-muted brand">${product.title}</span>
											<h5 class="text-uppercase">${product.nationality}</h5>
											<div class="price d-flex flex-row align-items-center">
												
											</div>
										</div>
										<p class="about">${product.synopsis}</p>
										<div class="sizes mt-5">
											<h6 class="text-uppercase">Características</h6>
										</div>
										<div class="cart mt-4 align-items-center"> <button data-serial="${product.title}" class="btn btn-primary text-uppercase mr-2 px-4">Comprar</button> </div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>`);


        } else {
            container = $(` <div class="container mt-5 mb-5">
				<div class="row d-flex justify-content-center">
					${message}
				</div>
			</div>`);
        }
        this.main.append(container);
    }

    bindShowProduct(handler) {
        $('#product-list').find('a.img-wrap').click(function (event) {
            handler(this.dataset.serial);
        });
        $('#product-list').find('figcaption a').click(function (event) {
            handler(this.dataset.serial);
        });
    }


}

export default View;