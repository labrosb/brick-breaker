function ImageModel() {
	this.contentQueried = new Event(this);
	this._imageList = [{"name":"Earth","value":"earth.jpg"},{"name":"Moon","value":"moon.jpg"},{"name":"Saturn","value":"saturn.jpg"}];	
}

ImageModel.prototype = {
	// Returns the object
	readContent: function(image) {
		this.contentQueried.notify({content: this._imageList, track: image});
	}
};