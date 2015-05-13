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
	}
}