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
			'audioFlag' : $('#audioFlag'),
			'audioFlagLabel' : $('#audioFlagLabel'),
			'audioLabel' : $('#audioLabel')
		});
		var languageView = new LanguageView({
			'language' : $('#language'),
			'audioLanguage' : $('#audioLanguage')
			
		});
		var imageView = new ImageView({
			'image' : $('#image')
		});
		return {
			audio: audioView,
			language: languageView,
			image: imageView
		};
	},
	_getModels: function() {
		var audioModel = new AudioModel();
		var languageModel = new LanguageModel();
		var imageModel = new ImageModel();
		return {
			audio: audioModel,
			language: languageModel,
			image: imageModel
		};
	},
	run: function() {
		this._controller = new Controller(this._getModels(),this._getViews());
		// Load track list into select tag
		this._controller.initializeAudio(localStorage.getItem('trackName'),localStorage.getItem('volume'),localStorage.getItem('audioFlag'));
		this._controller.initializeLanguage(localStorage.getItem('language'));
		this._controller.initializeBackground(localStorage.getItem('background'));
		this._controller.initializeTranslation(localStorage.getItem('language'));
	}
}

$(function() {
	if ( localStorage.getItem('trackName')==null || localStorage.getItem('audioFlag')==null) {
		window.location.replace("index.html");
	}
	var settings = new Settings();
	settings.run();
});