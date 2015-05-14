function Initialization() {
	
}

Initialization.prototype = {
	// PUBLIC
	// Retrieve the track default name
	getInitTrackName: function() {
		return 'stellar.mp3';
	},
	// Retrieve the volume level value
	getInitVolumeLevel: function() {
		return 0.5;
	},
	// Retrieve the flag audio value
	getInitAudioFlag: function() {
		// false: audio is on
		// true: audio is off
		return false;
	},
	// Retrieve the language default value
	getInitLanguage: function() {
		return 'english';
	},
	// Check if track name has been previously defined; if not define it
	setInitTrackName: function() {
		var _this=this;
		if(localStorage.getItem('trackName')==null) {
			localStorage.setItem('trackName',_this.getInitTrackName());
		}
	},
	//
	setInitVolumeLevel: function() {
		var _this=this;
		if(localStorage.getItem('audioFlag')==null || localStorage.getItem('trackName')==null) {
			localStorage.setItem('volume',_this.getInitVolumeLevel());
		}
	},
	//
	setInitAudioFlag: function() {
		var _this=this;
		if(localStorage.getItem('audioFlag')==null) {
			localStorage.setItem('audioFlag',_this.getInitAudioFlag());
		}
	},
	// 
	setInitLanguage: function() {
		var _this=this;
		if(localStorage.getItem('language')==null) {
			localStorage.setItem('language',_this.getInitLanguage());
		}
	},
	// Test
	printValue: function() {
		console.log('trackName '+localStorage.getItem('trackName'));
		console.log('volume '+localStorage.getItem('volume'));
		console.log('audioFlag '+localStorage.getItem('audioFlag'));
		console.log('language '+localStorage.getItem('language'));
	}
}