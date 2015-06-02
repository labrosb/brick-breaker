function Game() {
	/** @private */ 
	this._controller = null;
}

Game.prototype = {
	_getViews: function() {
		var languageView = new LanguageView({
			'language' : $('#language'),
			'languageLabel' : $('#languageLabel')
		});
		var audioView = new AudioView({
			'audio' : $('#audio'),
			'audioPlayer' : $('#audioPlayer'),
			'audioFlag' : $('#audioFlag'),
			'audioFlagLabel' : $('#audioFlagLabel'),
			'audioLabel' : $('#audioLabel')
		});
		return {
			language: languageView,
			audio: audioView
		};
	},
	_getModels: function() {
		var audioModel = new AudioModel();
		var languageModel = new LanguageModel();
		return {
			audio: audioModel,
			language: languageModel
		};
	},
	run: function() {
		this._controller = new Controller(this._getModels(),this._getViews());
		this._controller.initializeGameAudio(localStorage.getItem('trackName'),localStorage.getItem('volume'),localStorage.getItem('audioFlag'));
		this._controller.initializeTranslation(localStorage.getItem('language'));
	}
}

$(function() {
	if ( localStorage.getItem('trackName')==null || localStorage.getItem('audioFlag')==null) {
		window.location.replace("index.html");
	}
	var game = new Game();
	game.run();
});