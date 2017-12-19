var Cash = Cash || {};

//loading the game assets
Cash.StoryState = {
  create: function() 
  {
    //Starts background music
    Cash.background = this.add.audio('background');
    Cash.background.play();
    this.instruct = false;
    //Produces the main background
    this.background = this.add.sprite(0, 0, 'backgroundOpening');
    this.background.width=640;
    this.background.height=960;
    //Play button
    this.play = this.add.sprite(400, 800, 'playButton');
    this.play.width=200;
    this.play.height=100;
    //When play is clicked check if the instructions have been read 
    //if not show the instructions if they have proceed to the game
    this.play.inputEnabled = true;
    this.play.events.onInputDown.add(function()
    {
       if(this.instruct)
       {
           this.state.start('Game'); 
       }
       else
       {
           this.background = this.add.sprite(0, 0, 'instructions');
           this.play.bringToTop();
           this.instruct = true;
       }
    }, this); 
  }
};