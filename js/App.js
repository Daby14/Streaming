import VideoSystem from './Model.js';
import Controller from './Controller.js';
import View from './View.js';

let App;
$(function () {
	App = new Controller(
		VideoSystem.getInstance(), new View()
	);
});
export default App;