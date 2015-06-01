/* Creates the image view; which will be handling the images on the background during the game */
function ImageView(elements) {
	this._elements = elements;
	this.generatedBackgroundList = new Event(this);
	this.generatedImageList = new Event(this);
	var _this = this;
	//EVENT LISTENERS
	// Updates the value of the backgorund image on the local storage
	this._elements.image.change(function (e) {
		localStorage.setItem('background', _this.getBackground());
	});
}

ImageView.prototype = {
	// PRIVATE
	// PUBLIC
	// Generate image select element
	setBackgroundList: function(content, background) {
		var vContent="";
		console.log(background);
		$.each(content, function(index, element){
			if(element['value']==background) {
				vContent=vContent+"<option data-img-src='media/"+element['value']+"' value='"+element['value']+"' selected='selected'>"+element['name']+"</option>";
			}
			else {
				vContent=vContent+"<option data-img-src='media/"+element['value']+"' value='"+element['value']+"' >"+element['name']+"</option>";
			}
		});
		this._elements.image.append(vContent);
		this._elements.image.imagepicker({show_label:true});
	},
	// Get current value of the background image selected
	getBackground: function() {
		return this._elements.image.val();
	}
}