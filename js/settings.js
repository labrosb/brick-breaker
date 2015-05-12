function Settings() {
	/** @private */ 
	this._controller = null;
}

Settings.prototype = {
	_getViews: function() {
		var audioView = new AudioView({
			'audio' : $('#audio'),
			'audioPlayer' : $('#audioPlayer'),
			'audioFlag' : $('input[name="audioFlag"]')
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
	}
}

$(function() {
	var settings = new Settings();
	settings.run();
});