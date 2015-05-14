/*
Creates the language view; which will be handling the app translation
*/
function LanguageView(elements) {
	this._elements = elements;
	this.generatedLanguageList = new Event(this);
	this.selectedLanguage = new Event(this);
	var _this = this;
	//EVENT LISTENERS
	// Change language option
	this._elements.language.change(function (e) {
		localStorage.setItem('language', _this.getLanguage());
		_this.selectedLanguage.notify({language: localStorage.getItem('language')});
	});
}

LanguageView.prototype = {
	// PRIVATE
	// PUBLIC 
	// Generate language list
	setLanguageList: function(content, language) {
		var vContent="";
		$.each(content, function(index, element){
			if(element['value']==language) {
				vContent=vContent+"<option value='"+element['value']+"' selected='selected'>"+element['name']+"</option>";
			}
			else {
				vContent=vContent+"<option value='"+element['value']+"' >"+element['name']+"</option>";
			}
		});
		this._elements.language.append(vContent);
	},
	// Translate document
	translate: function(content, language) {
		$.each(content, function (index, element) {
            if (element[2] == "text") {
                $(element[0]).text(element[1]);
            }
            else {
                $(element[0]).attr("placeholder", element[1]);
            };
        });
	},
	//
	getLanguage: function() {
		return this._elements.language.val();
	}
}