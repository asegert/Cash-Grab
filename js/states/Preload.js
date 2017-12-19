var Cash = Cash || {};

//loading the game assets
Cash.PreloadState = {
  preload: function() {
    //show loading screen
    /*this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'bar');
    this.preloadBar.anchor.setTo(0.5);
    this.preloadBar.scale.setTo(100, 1);
    this.load.setPreloadSprite(this.preloadBar);*/

    //audio
    this.load.audio('background', ['assets/audio/background.m4a', 'assets/audio/background.mp3', 'assets/audio/background.ogg']);
    this.load.audio('warning', ['assets/audio/warning.m4a', 'assets/audio/warning.mp3', 'assets/audio/warning.ogg']);
    //images
    this.load.image('cash1', 'assets/images/cash1.png');
    this.load.image('cash2', 'assets/images/cash2.png');
    this.load.image('cash3', 'assets/images/cash3.png');
    this.load.image('cash4', 'assets/images/cash4.png');
    this.load.image('cash5', 'assets/images/cash5.png');
    this.load.image('cash6', 'assets/images/cash6.png');
    this.load.image('cash7', 'assets/images/cash7.png');
    this.load.image('cash8', 'assets/images/cash8.png');
    this.load.image('cash9', 'assets/images/cash9.png');
      
    this.load.image('background', 'assets/images/cash_background.png');
    this.load.image('background1', 'assets/images/cash_background_blue.png');
    this.load.image('background2', 'assets/images/cash_background_purple.png');
    this.load.image('background3', 'assets/images/cash_background_yellow.png');
    this.load.image('background4', 'assets/images/cash_background_orange.png');
    this.load.image('backgroundWarning', 'assets/images/cash_background_warning.png');
    this.load.image('backgroundOpening', 'assets/images/opening_background.png');
    this.load.image('endScreen', 'assets/images/end_background.png');
    this.load.image('instructions', 'assets/images/instructions.png');
      
    this.load.image('playButton', 'assets/images/playButton.png');
    this.load.image('playAgainButton', 'assets/images/playAgainButton.png');
    this.load.spritesheet('cyclone', 'assets/images/cyclone_sprite.png', 389, 410, 5);
    //Data
    
    //this.load.text('CashData', 'assets/data/CashData.json');

  },
  create: function() {
    this.state.start('Story');
  }
};