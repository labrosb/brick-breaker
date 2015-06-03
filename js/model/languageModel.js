function LanguageModel() {
	this.contentQueried = new Event(this);
	this.dictionaryQueried = new Event(this);
	this._languageList = [{"name":"English","value":"english"},{"name":"Español","value":"spanish"},{"name":"Eλληνικά","value":"greek"},{"name":"Svenska","value":"swedish"}];
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
            {"position":"#title","word":"Σπάστε τα Τουβλάκια","type":"text"},
            {"position":"#navTitle","word":"Σπάστε τα Τουβλάκια","type":"text"},
            {"position":"#navPlay","word":"Παίξτε","type":"text"},
            {"position":"#navSettings","word":"Ρυθμίσεις","type":"text"},
            {"position":"#navHelp","word":"Βοήθεια","type":"text"},
            {"position":"#languageLabel","word":"Επιλογή Γλώσας","type":"text"},
            {"position":"#headerTitle","word":"Σπάστε τα Τουβλάκια","type":"text"},
            {"position":"#headerPlay","word":"Παίξτε","type":"text"},
            {"position":"#headerSettings","word":"Ρυθμίσεις","type":"text"},
            {"position":"#headerHelp","word":"Βοήθεια","type":"text"},
			{"position":"#audioHeader","word":"Ήχος και ένταση","type":"text"},
            {"position":"#audioFlagLabel","word":"Απενεργοποίηση μουσικής;","type":"text"},
            {"position":"#audioLabel","word":"Επιλογή ήχου","type":"text"},
            {"position":"#audioPlayerSupport","word":"Δεν υποστηρίζεται από τον περιηγητή","type":"text"},
            {"position":"#languageHeader","word":"Γλώσσα","type":"text"},
            {"position":"#backgroundHeader","word":"Φόντο","type":"text"}],
        "swedish":[
            {"position":"#title","word":"Brick Breaker","type":"text"},
            {"position":"#navTitle","word":"Brick Breaker","type":"text"},
            {"position":"#navPlay","word":"Spela","type":"text"},
            {"position":"#navSettings","word":"Insättningar","type":"text"},
            {"position":"#navHelp","word":"Hjälp","type":"text"},
            {"position":"#languageLabel","word":"Välj språk","type":"text"},
            {"position":"#headerTitle","word":"Brick Breaker","type":"text"},
            {"position":"#headerPlay","word":"Spela","type":"text"},
            {"position":"#headerSettings","word":"Insättningar","type":"text"},
            {"position":"#headerHelp","word":"Hjälp","type":"text"},
			{"position":"#audioHeader","word":"Ljud och ljudnivå","type":"text"},
            {"position":"#audioFlagLabel","word":"Inaktivera ljud?","type":"text"},
            {"position":"#audioLabel","word":"Välj låt","type":"text"},
            {"position":"#audioPlayerSupport","word":"","type":"text"},
            {"position":"#languageHeader","word":"Språk","type":"text"},
            {"position":"#backgroundHeader","word":"Bakgrunden","type":"text"}]
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