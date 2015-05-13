function Settings() {
	/** @private */ 
	this._controller = null;
}

Settings.prototype = {
	_getViews: function() {
		var audioView = new AudioView({
			'audio' : $('#audio'),
			'audioPlayer' : $('#audioPlayer'),
			//'audioFlag' : $('input[name="audioFlag"]')
			'audioFlag' : $('#audioFlag')
		});
		return {
			audio: audioView
		};
	},
	_getModels: function() {
		var audioModel = new AudioModel();
		return {
			audio: audioModel
		};
	},
	run: function() {
		this._controller = new Controller(this._getModels(),this._getViews());
		// Load track list into select tag
		this._controller.initializeAudio(localStorage.getItem('trackName'),localStorage.getItem('volume'),localStorage.getItem('audioFlag'));
	}
}

$(function() {
	if ( localStorage.getItem('trackName')==null || localStorage.getItem('volume')==null || localStorage.getItem('audioFlag')==null) {
		console.log(1);
		window.location.replace("index.html");
	}
	var settings = new Settings();
	settings.run();
});