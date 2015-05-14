function LanguageModel() {
	this.contentQueried = new Event(this);
	this.dictionaryQueried = new Event(this);
	this._languageList = [{"name":"English","value":"english"},{"name":"Español","value":"spanish"},{"name":"ελληνικά","value":"greek"},{"name":"Svenska","value":"swedish"}];
	this._dictionary = {
        "english":[
            //{"position":"#","word":"","type":"text"},
            {"position":"#title","word":"Brick Breaker","type":"text"},
            {"position":"#navTitle","word":"Brick Breaker","type":"text"},
            {"position":"#navPlay","word":"Play","type":"text"},
            {"position":"#navSettings","word":"Settings","type":"text"},
            {"position":"#navHelp","word":"Help","type":"text"},
            {"position":"#languageLabel","word":"Choose language:","type":"text"},
            {"position":"#headerTitle","word":"Brick Breaker","type":"text"},
            {"position":"#headerPlay","word":"Play","type":"text"},
            {"position":"#headerSettings","word":"Settings","type":"text"},
            {"position":"#headerHelp","word":"Help","type":"text"},
			{"position":"#audioHeader","word":"Sound and Volume","type":"text"},
            {"position":"#audioFlagLabel","word":"Disable music?","type":"text"},
            {"position":"#audioLabel","word":"Choose track:","type":"text"},
            {"position":"#audioPlayerSupport","word":"Your browser does not support this feature","type":"text"},
            {"position":"#languageHeader","word":"Language","type":"text"},
            {"position":"#backgroundHeader","word":"Background","type":"text"}],
        "spanish":[
            {"position":"#title","word":"Destructor de ladrillos","type":"text"},
            {"position":"#navTitle","word":"Destructor de ladrillos","type":"text"},
            {"position":"#navPlay","word":"Jugar","type":"text"},
            {"position":"#navSettings","word":"Opciones","type":"text"},
            {"position":"#navHelp","word":"Ayuda","type":"text"},
            {"position":"#languageLabel","word":"Seleccione idioma:","type":"text"},
            {"position":"#headerTitle","word":"Destructor de ladrillos","type":"text"},
            {"position":"#headerPlay","word":"Jugar","type":"text"},
            {"position":"#headerSettings","word":"Opciones","type":"text"},
            {"position":"#headerHelp","word":"Ayuda","type":"text"},
			{"position":"#audioHeader","word":"Sonido y Volumen","type":"text"},
            {"position":"#audioFlagLabel","word":"Deshabilitar música?","type":"text"},
            {"position":"#audioLabel","word":"Seleccione sonido:","type":"text"},
            {"position":"#audioPlayerSupport","word":"El explorador no soporta esta característica","type":"text"},
            {"position":"#languageHeader","word":"Idioma","type":"text"},
            {"position":"#backgroundHeader","word":"Fondo","type":"text"}],
		"greek":[
            {"position":"#title","word":"","type":"text"},
            {"position":"#navTitle","word":"","type":"text"},
            {"position":"#navPlay","word":"","type":"text"},
            {"position":"#navSettings","word":"","type":"text"},
            {"position":"#navHelp","word":"","type":"text"},
            {"position":"#languageLabel","word":":","type":"text"},
            {"position":"#headerTitle","word":"malaka","type":"text"},
            {"position":"#headerPlay","word":"","type":"text"},
            {"position":"#headerSettings","word":"","type":"text"},
            {"position":"#headerHelp","word":"","type":"text"},
			{"position":"#audioHeader","word":"","type":"text"},
            {"position":"#audioFlagLabel","word":"","type":"text"},
            {"position":"#audioLabel","word":":","type":"text"},
            {"position":"#audioPlayerSupport","word":"","type":"text"},
            {"position":"#languageHeader","word":"","type":"text"},
            {"position":"#backgroundHeader","word":"","type":"text"}],
        "swedish":[
            {"position":"#title","word":"","type":"text"},
            {"position":"#navTitle","word":"","type":"text"},
            {"position":"#navPlay","word":"","type":"text"},
            {"position":"#navSettings","word":"","type":"text"},
            {"position":"#navHelp","word":"","type":"text"},
            {"position":"#languageLabel","word":":","type":"text"},
            {"position":"#headerTitle","word":"","type":"text"},
            {"position":"#headerPlay","word":"","type":"text"},
            {"position":"#headerSettings","word":"","type":"text"},
            {"position":"#headerHelp","word":"","type":"text"},
			{"position":"#audioHeader","word":"","type":"text"},
            {"position":"#audioFlagLabel","word":"","type":"text"},
            {"position":"#audioLabel","word":":","type":"text"},
            {"position":"#audioPlayerSupport","word":"","type":"text"},
            {"position":"#languageHeader","word":"","type":"text"},
            {"position":"#backgroundHeader","word":"","type":"text"}]
    }
    this._words = [];
}

LanguageModel.prototype = {
	// Returns the language list object
	readContent: function(language) {
		this.contentQueried.notify({content: this._languageList, language: language});
	},
	// Return the dictionary in the corresponding word
	readDictionary: function(language) {
		var _this=this;
        $.each(this._dictionary, function(index, element) {
            if (language==index) {
                $.each(this, function(index, element) {
                    _this._words.push([element.position,element.word,element.type]);
                });
            }
        });
		this.dictionaryQueried.notify({dictionary: this._words, language: language});
	}
};