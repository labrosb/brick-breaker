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
		_this.displayAudio(localStorage.getItem('audioFlag'));
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
		if (flag=='false') {
			this._elements.audioFlag[0].checked=false;	
		}
		else {
			this._elements.audioFlag[0].checked=true;		
		}
	},
	//
	getAudioFlag: function() {
		return this._elements.audioFlag[0].checked;
	},
	//
	displayAudio: function(flag) {
		if (flag=='false') {
			// show
			this._elements.audioPlayer.show();
			this._elements.audio.show();
			this._elements.audioLabel.show();
		}
		else {
			// hide
			this._elements.audioPlayer.hide();
			this._elements.audio.hide();
			this._elements.audioLabel.hide();
		}	
	}
}