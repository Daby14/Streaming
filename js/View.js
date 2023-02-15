"use strict";

class View {
    constructor() {
        this.main = $('#main');
        // this.cards = $('#card1');
        this.categorias = $('#categorias');
    }

    showProductTypes() {
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

    }

    bindInit(handler) {
        $('#init').click((event) => {
            handler();
        });
        // $('#logo').click((event) => {
        //     handler();
        // });
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

    bindShowMovies(handler) {
        $('#type-list').find('a').click(function (event) {
            handler(this.dataset.type);
        });
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

}

export default View;