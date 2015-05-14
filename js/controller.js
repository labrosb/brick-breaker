function Controller(models, views) {
	/** @private */
    this._audioView = views.audio;
	/** @private */
    this._audioModel = models.audio;
    /** @private */
    this._languageView = views.language;
	/** @private */
    this._languageModel = models.language;
    var _this = this;
    // LISTENERS
    // Audio View
    if(this._audioView) {
        this._audioView.generatedTrackList.attach(function (sender,args) {
			_this.readTrackListContent(args.track); 
        });
    }
    if(this._audioModel) {
    	this._audioModel.contentQueried.attach(function (sender,args){
            _this.sendTrackListContent(args.content,args.track);
		});
	}
	if(this._languageView) {
		this._languageView.generatedLanguageList.attach(function (sender,args) {
			_this.readLanguageListContent(args.language);
		});

		this._languageView.selectedLanguage.attach(function (sender,args){
			_this.readDictionaryContent(args.language);
		});
	}
	if(this._languageModel) {
		this._languageModel.contentQueried.attach(function (sender,args) {
			_this.sendLanguageListContent(args.content,args.language);
		})
		this._languageModel.dictionaryQueried.attach(function (sender,args) {
			_this.sendDictionaryContent(args.dictionary,args.language);
		})
	}
}    

Controller.prototype = {
	// This function works as a trigger. It is called when initializing the settings page
	initializeAudio: function(track, level, flag) {
		this._audioView.generatedTrackList.notify({track: track});
		this._audioView.setTrack(track);
		this._audioView.setTrackVolume(level);
		this._audioView.setAudioFlag(flag);
	},
	// Query the track list
	readTrackListContent: function(track) {
		this._audioModel.readContent(track);
	},
	// Send the content of the track list back to the view
	sendTrackListContent: function(content, track) {
		this._audioView.setTrackList(content, track);
	},
	// This function works as a trigger. It is called when initializing the index and settings page and it will generate the language list
	initializeLanguage: function(language) {
		this._languageView.generatedLanguageList.notify({language: language});
	},
	// Query the language list
	readLanguageListContent: function(language) {
		this._languageModel.readContent(language);
	},
	// Send the content of the language list back to the view
	sendLanguageListContent: function(content, language) {
		this._languageView.setLanguageList(content, language);
	},
	// This function works as a trigger. It is called when initializing any page and it will translate the content
	initializeTranslation: function(language) {
		this._languageView.selectedLanguage.notify({language: language});
	},
	//
	readDictionaryContent: function(language) {
		this._languageModel.readDictionary(language);
	},
	// Translate document
	sendDictionaryContent: function(content, language) {
		this._languageView.translate(content, language);
	}
	/*translate: function(language) {
		this._languageView.selectedLanguage.notify({language: language});
		this._languageModel.readDictionary();
	}*/
}