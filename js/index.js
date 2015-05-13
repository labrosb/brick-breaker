function Index() {
	/** @private */ 
	this._controller = null;
	this._initialization = null;
}

Index.prototype = {
	_getViews: function() {
		var languageView = new LanguageView();
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
		this._initialization.printValue();
	}
}

$(function() {
	var index = new Index();
	index.run();
});