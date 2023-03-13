import VideoSystem from './Model.js';
import Controller from './Controller.js';
import View from './View.js';

let App;
$(function () {
	App = new Controller(
		VideoSystem.getInstance(), new View()
	);
	
	//Declaramos el historial de las acciones para poder implementar el objeto History
	const AccionesHistory = {
		init: () => {
			App.handleInit();
		},
		categoriasIniciales: (event) => App.handleShowCategory(event.state.type),
		categoriasMenu: (event) => App.handleShowCategory(event.state.category),
		producciones: (event) => App.handleShowProduct(event.state.serial),
		produccionesAleatorias: (event) => App.handleShowProduct(event.state.type),
		directorProduccion: (event) => App.handleShowDirector(event.state.serial),
		actorProduccion: (event) => App.handleShowActor(event.state.serial),
		menuDirectores: (event) => App.handleProductsDirectorList(event.state.category),
		menuActores: (event) => App.handleProductsActorList(event.state.category),
		productionDirector: (event) => App.handleShowProduct(event.state.serial),
		productionActor: (event) => App.handleShowProduct(event.state.serial),
		formularios: (event) => App.handleShowForm(event.state.category),
		formLogin: (event) => App.handleFormUser(event.state.serial),
	}

	//Con el evento popstate llamaos al historial declarado anteriormente
	window.addEventListener('popstate', function (event) {
		if (event.state) {
			AccionesHistory[event.state.action](event);
		}
	});

	history.replaceState({ action: 'init' }, null);

});
export default App;