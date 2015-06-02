function ImageModel() {
	this.contentQueried = new Event(this);
	this._imageList = [
		{"name":"Earth","value":"earth.jpg","thumbnail":"earth_small.jpg"},
		{"name":"Moon","value":"moon.jpg","thumbnail":"moon_small.jpg"},
		{"name":"Saturn","value":"saturn.jpg","thumbnail":"saturn_small.jpg"}];	
}

ImageModel.prototype = {
	// Returns the object
	readContent: function(image) {
		this.contentQueried.notify({content: this._imageList, background: image});
	}
};