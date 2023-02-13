"use strict";

//Importamos los objetos instanciados con los que vamos a trabajar en nuestra web
import {
    categoria1,
    categoria2,
    categoria3,
    resource1,
    coordinate1,
    produccion1,
    produccion2,
    produccion3,
    produccion4,
    produccion5,
    produccion6,
    produccion7,
    produccion8,
    produccion9,
    produccion10,
    produccion11,
    produccion12,
    VideoSystem
} from './streamingTest.js';

let categorias = $('#categorias');
let main = $('#main');

let productsCat1 = [produccion1, produccion2, produccion3, produccion4];
let productsCat2 = [produccion5, produccion6, produccion7, produccion8];
let productsCat3 = [produccion9, produccion10, produccion11, produccion12];

// categorias.css({
//     border: '3px solid red',
//     height: '300px'
// });

// console.log(produccion1.title)

function showProductTypes() {
    categorias.empty();
    categorias.append(`<div id="type-list" class="row">
        <div id="cat1" class="col-lg-4 col-md-6"><a class="prueba" data-type="Categoria 1" href="#product-list">
                <div><img class="cat__img" alt="Categoría 1" src="../images/catcamara.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoría 1</h3>
                    <div>Acción</div>
                </div>
            </a>
        </div>
        <div id="cat2" class="col-lg-4 col-md-6"><a data-type="Categoria 2" href="#">
                <div><img class="cat__img" alt="Categoria 2" src="../images/catmovi.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoria 2</h3>
                    <div>Deportes</div>
                </div>
            </a>
        </div>
        <div id="cat3" class="col-lg-4 col-md-6"><a data-type="Categoria 3" href="#">
                <div><img class="cat__img" alt="Categoria 3" src="../images/catpportatil.jpg" />
                </div>
                <div class="cat__text">
                    <h3>Categoria 3</h3>
                    <div>Aventura</div>
                </div>
            </a>
        </div>
    </div>`);

}

showProductTypes();

function listProducts(iterator, title, categorias, tipoCategoria) {
    main.empty();
    if (categorias.children().length > 1)
        categorias.children()[1].remove();

    main.append(`<div id="product-list" class="container my-3"><div class="row"> </div></div>`);

    let id = $("#product-list");

    let product = iterator.next();

    while (!product.done) {

        id.children().first().append(`<div class="col-md-4">
        <figure class="card card-product-grid card-lg"> <a id="prueba2" data-serial="${product.value.title}" href="#single-product" class="img-wrap"><img class="Serie" src="../${product.value.image}"></a>
            <figcaption class="info-wrap">
                <div class="row">
                    <div class="col-md-8"> <a data-serial="${product.value.title}" href="#single-product" class="title">${product.value.title}  ${product.value.nationality} - ${product.value.publication}</a> </div>
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

    id.find('a.img-wrap').click(function (event) {
        //console.log(this.dataset.serial);
        let serial = this.dataset.serial;
        showProduct(serial, tipoCategoria, productsCat1);
    });

    id.find('figcaption a').click(function (event) {
        //console.log(this.dataset.serial);
        let serial = this.dataset.serial;
        showProduct(serial, tipoCategoria, productsCat1);
    });

    id.prepend(`<h1>${title}</h1>`);
}

function showProduct(serial, tipoCategoria, productsCat1) {
    main.empty();

    if(tipoCategoria == "Categoria_1"){
        for(let i = 0; i < productsCat1.length; i++){
            if(productsCat1[i].title == serial){
                main.append(`<div class="carta row d-flex justify-content-center">
                    <div class="col"><img class="img" src="${productsCat1[i].image}"></img></div>
                    <div class="col">
                        <h3>${productsCat1[i].title}</h3>
                        <p><u>Descripción</u></p>
                        <p>${productsCat1[i].synopsis}</p>
                        <p><u>Características</u></p>
                        <p>-País de Origen: ${productsCat1[i].nationality}</p>
                        <p>-Fecha de Origen: ${productsCat1[i].publication}</p>
                        <p>-Temporadas: ${productsCat1[i].seasons}</p>
                    </div>
                </div>`);
                // console.log(productsCat1[i]);
            }
        }
    }

    //Dependiendo el serial, aparece unos datos u otros

    //Para ello, dependiendo si son las producciones de la categoría 1, 2 o 3 sacamos los datos recorriendo las producciones de la categoría correspondiente para sacar los datos de la producción correspondiente

    //Descripción: synopsis

    //Características(subrayado)

    //-País de Origen: nationality
    //-Fecha de Origen: publication
    //-Temporadas: seasons

}

let cat1 = $("#cat1");
let cat2 = $("#cat2");
let cat3 = $("#cat3");
let tipoCategoria = "";

cat1.on("click", function () {
    const iterator = productsCat1[Symbol.iterator]();
    tipoCategoria = "Categoria_1";
    listProducts(iterator, "Categoría 1", categorias, tipoCategoria);
});

cat2.on("click", function () {
    const iterator = productsCat2[Symbol.iterator]();
    tipoCategoria = "Categoria_2";
    listProducts(iterator, "Categoría 2", categorias, tipoCategoria);
});

cat3.on("click", function () {
    const iterator = productsCat3[Symbol.iterator]();
    tipoCategoria = "Categoria_3";
    listProducts(iterator, "Categoría 3", categorias, tipoCategoria);
});
