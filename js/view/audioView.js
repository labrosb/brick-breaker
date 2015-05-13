/*
Creates the audio view; which will be handling the audio list and player
*/
function AudioView(elements) {
	this._elements = elements;
	this.generatedTrackList = new Event(this);
	var _this = this;
	//EVENT LISTENERS
	// Change track list option
	this._elements.audio.change(function (e) {
		localStorage.setItem('trackName', _this.getTrack());
		_this.setTrack(localStorage.getItem('trackName'));
		_this.loadTrack();
	});
	// Change volumen level
	this._elements.audioPlayer[0].onvolumechange = function () {
		localStorage.setItem('volume', _this.getTrackVolume());
	};
	// Change disable music check flag 
	this._elements.audioFlag.click(function (e) {
		localStorage.setItem('audioFlag', _this.getAudioFlag());	
	});
}

AudioView.prototype = {
	// PRIVATE
	// PUBLIC 
	// Generate audio list with song list
	setTrackList: function(content, track) {
		var vContent="";
		$.each(content, function(index, element){
			if(element['value']==track) {
				vContent=vContent+"<option value='"+element['value']+"' selected='selected'>"+element['name']+"</option>";
			}
			else {
				vContent=vContent+"<option value='"+element['value']+"' >"+element['name']+"</option>";
			}
		});
		this._elements.audio.append(vContent);
	},
	//
	setTrack: function(track) {
		this._elements.audioPlayer[0].src = 'media/'+track; ;
	},
	//
	getTrack: function() {
		return this._elements.audio.val();
	},
	//
	loadTrack: function() {
		this._elements.audioPlayer[0].load();
	},
	//
	setTrackVolume: function(level) {
		this._elements.audioPlayer[0].volume=level;
	},
	//
	getTrackVolume: function() {
		return this._elements.audioPlayer[0].volume;
	},
	//
	setAudioFlag: function(flag) {
		this._elements.audioFlag[0].checked=flag;
	},
	//
	getAudioFlag: function() {
		//return this._elements.audioFlag[0].value;
		return this._elements.audioFlag[0].checked;
	}
}