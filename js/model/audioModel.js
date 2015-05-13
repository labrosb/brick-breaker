function AudioModel() {
	this.contentQueried = new Event(this);
	this._trackList = [{"name":"Charlie","value":"charlie.mp3"},{"name":"Stanley","value":"stanley.mp3"},{"name":"Stellar","value":"stellar.mp3"}];	
}

AudioModel.prototype = {
	// Returns the object
	readContent: function(track) {
		this.contentQueried.notify({content: this._trackList, track: track});
	}
};