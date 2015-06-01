function Index() {
	/** @private */ 
	this._controller = null;
	this._initialization = null;
}

Index.prototype = {
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
		this._initialization = new Initialization();
		this._initialization.setInitTrackName();
		this._initialization.setInitVolumeLevel();
		this._initialization.setInitAudioFlag();
		this._initialization.setInitLanguage();
		this._initialization.setInitBackground();
		this._controller.initializeLanguage(localStorage.getItem('language'));
		this._controller.initializeTranslation(localStorage.getItem('language'));
	}
}

$(function() {
	var index = new Index();
	index.run();
});