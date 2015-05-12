/*
Creates the audio view; which will be handling the audio list and player
*/
function AudioView(elements) {
	this._elements = elements;
	var _this = this;
	//EVENT LISTENERS
	// Change track option
	this._elements.audio.change(function (e) {
		_this.changeTrack(_this._elements.audio.val());
		_this.setTrackVolume();
		_this.loadTrack();
		_this.getAudioFlag();
	});
}

AudioView.prototype = {
	// PRIVATE
	// PUBLIC 
	changeTrack: function(track) {
		this._elements.audioPlayer[0].src = 'media/'+track; ;
	},
	loadTrack: function() {
		this._elements.audioPlayer[0].load();
	},
	setTrackVolume: function() {
		this._elements.audioPlayer[0].volume=0.5;
	},
	getTrackVolume: function() {
		console.log(this._elements.audioPlayer[0].volume);
	},
	getAudioFlag: function() {
		//console.log(this._elements);
		//console(this._elements.audioFlag[0].value);
		//console(this._elements.audioFlag.val());
		console.log($('#audioFlag').val());
		console.log(this._elements.audioFlag[0].value);
	}
}