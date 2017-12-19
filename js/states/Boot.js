var Cash = Cash || {};

Cash.BootState = {
  init: function() {
    //Begins audio
    this._manageAudio('init', this);
    //loading screen will have a white background
    this.game.stage.backgroundColor = '#fff';

    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

    //have the game centered horizontally
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
  },
  preload: function() {
    //assets we'll use in the loading screen
    //this.load.image('bar', 'assets/images/preloader-bar.png');
  },
  create: function() {
    this.state.start('Preload');
  },
   _manageAudio: function(mode, game) 
    {
		if(mode == 'init') 
        {
			Cash._audioStatus = true;
			Cash._soundClick = game.add.audio('audio-click');
		}
		else if(mode == 'switch') 
        {
			Cash._audioStatus = !Cash._audioStatus;
		}
		if(Cash._audioStatus) 
        {
			Cash._audioOffset = 0;
		}
		else 
        {
			Cash._audioOffset = 4;
		}
	}
};