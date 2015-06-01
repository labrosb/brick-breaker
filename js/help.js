function Help() {
	/** @private */ 
	this._controller = null;
}

Help.prototype = {
	_getViews: function() {
		var languageView = new LanguageView({
			'language' : $('#language'),
			'audioLanguage' : $('#audioLanguage')
		});
		return {
			language: languageView
		};
	},
	_getModels: function() {
		var languageModel = new LanguageModel();
		return {
			language: languageModel
		};
	},
	run: function() {
		this._controller = new Controller(this._getModels(),this._getViews());
		this._controller.initializeTranslation(localStorage.getItem('language'));
	}
}

$(function() {
	if ( localStorage.getItem('trackName')==null || localStorage.getItem('audioFlag')==null) {
		window.location.replace("index.html");
	}
	var help = new Help();
	help.run();
});