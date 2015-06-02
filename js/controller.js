function Controller(models, views) {
	/** @private */
    this._audioView = views.audio;
	/** @private */
    this._audioModel = models.audio;
    /** @private */
    this._languageView = views.language;
	/** @private */
    this._languageModel = models.language;
    /** @private */
    this._imageView = views.image;
    /** @private */
    this._imageModel = models.image;
	/** @private */
    var _this = this;
    // LISTENERS
    // Audio View
    if(this._audioView) {
        this._audioView.generatedTrackList.attach(function (sender,args) {
			_this.readTrackListContent(args.track); 
        });
    }
    // Audio Model
    if(this._audioModel) {
    	this._audioModel.contentQueried.attach(function (sender,args){
            _this.sendTrackListContent(args.content,args.track);
		});
	}
	// Language View
	if(this._languageView) {
		this._languageView.generatedLanguageList.attach(function (sender,args) {
			_this.readLanguageListContent(args.language);
		});

		this._languageView.selectedLanguage.attach(function (sender,args){
			_this.readDictionaryContent(args.language);
		});
	}
	// Language Model
	if(this._languageModel) {
		this._languageModel.contentQueried.attach(function (sender,args) {
			_this.sendLanguageListContent(args.content,args.language);
		})
		this._languageModel.dictionaryQueried.attach(function (sender,args) {
			_this.sendDictionaryContent(args.dictionary,args.language);
		})
	}
	// Image View
	if(this._imageView) {
		this._imageView.generatedBackgroundList.attach(function (sender,args) {
			_this.readBackgroundListContent(args.background);
		});
	}
	// Image Model
	if(this._imageModel) {
		this._imageModel.contentQueried.attach(function (sender, args) {
			_this.sendBackgroundListContent(args.content,args.background);
		});
	}
}    

Controller.prototype = {
	// This function works as a trigger. It is called when initializing the settings page
	initializeAudio: function(track, level, flag) {
		this._audioView.setAudioFlag(flag);
		this._audioView.generatedTrackList.notify({track: track});
		this._audioView.setTrack(track);
		this._audioView.setTrackVolume(level);
		this._audioView.displayAudio(localStorage.getItem('audioFlag'));
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
	},
	// This function works as a trigger. It is called when initializing the settings page and it will read the JSON background image list
	initializeBackground: function(background) {
		this._imageView.generatedBackgroundList.notify({background: background});
	},
	// This function read the image JSON variable from the MODEL
	readBackgroundListContent: function(background) {
		this._imageModel.readContent(background);
	},
	// Sends the background image content available to the view 
	sendBackgroundListContent: function(content, background) {
		this._imageView.setBackgroundList(content, background);
	},
	// Plays the music on the game tab :D or not :c
	initializeGameAudio: function(track, level, flag) {
		if (flag=='false') {
			// play
			this._audioView.setTrack(track);
			this._audioView.setTrackVolume(level);
			this._audioView.play();
		}
		this._audioView.hide();
	}
}