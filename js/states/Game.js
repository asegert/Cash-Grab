//Sets up game
var Cash = Cash || {};

Cash.GameState = {
  init: function() 
  {  
    //Cyclone keeps track of level variables
        //Background, initial cash, cash added rate, speed of cash, small cash value, large cash value
    this.cyclone=[['background2', 20, 5, 5000, 1, 5], ['background1', 10, 4, 4000, 5, 25], ['background3', 7, 4, 3000, 10, 50], ['background4', 7, 3, 2000, 50, 250], ['background', 5, 2, 1000, 100, 500]];
    //Gets level, if one is not available start at level 1
    this.level=Cash.level || 1;
    //Background
    this.background = this.add.sprite(0, 0, this.cyclone[this.level-1][0]);
    this.background.width=640;
    this.background.height=960;
    //'Storm warning' background
    this.backgroundWarning = this.add.sprite(0, 0, 'backgroundWarning');
    this.backgroundWarning.width=640;
    this.backgroundWarning.height=960;
    this.backgroundWarning.alpha=0;
    //Default so tween is only played once
    this.tween = null; 
    //group to hold all the money flying 
    this.money = this.add.group();
    //Holds the cash value of the last 'cash' created
    this.cashValue=0;
    //Current score
    this.score=0;
    //Boolean for if initial cash is created
    this.cashcreate = false;
    //Boolean for game is over early
    this.ended = false;
  },
  create: function()
  {   
      //Timer so each level lasts 30s
      this.timer = this.time.events.add(Phaser.Timer.SECOND * 36, this.timeUp
      , this);
      //Set initial text
      var style = {
                  fill: '#55bb55',
                  font: '230px Arial',
                  stroke: '#000000',
                  strokeThickness: 10
              };
      var style2 = {
                  fill: '#55bb55',
                  font: '36px Arial',
                  stroke: '#000000',
                  strokeThickness: 5
              };
      this.countDown = this.add.text(250, 300, "Get Ready", style);
      this.scoreText = this.add.text(0, 0, "Cash: $"+this.score, style2);
      this.timeText = this.add.text(420, 0, "Time Left: 30", style2);
  },
  update: function()
  {
      if(this.cycloneAnimation != undefined)
      {
          if(this.cycloneAnimation.x >= 300)
          {
              this.cash5.destroy();
          }
          else if(this.cycloneAnimation.x >= 200)
          {
              this.cash4.destroy();
          }
          else if(this.cycloneAnimation.x >= 100)
          {
              this.cash3.destroy();
          }
          else if(this.cycloneAnimation.x >= 0)
          {
              this.cash2.destroy();
          }
          else if(this.cycloneAnimation.x >= -100)
          {
              this.cash1.destroy();
          }
      }
      if(Math.floor((this.time.events.duration/1000))<=30)
      {
          if(!this.cashcreate)
          {
              //Creates the initial cash
              this.newCash(this.cyclone[this.level-1][1]);
              this.cashcreate = true;
          }
          //End the countDown
          this.countDown.destroy();
          //Update the timer display
          this.timeText.setText("Time Left: "+ Math.floor((this.time.events.duration/1000)));
          //If game has 5s or less and the final warning has not been started begin
          if((this.time.events.duration/1000)<=5 && this.tween == null)
          {
              //Flashing warning background
              this.tween = this.add.tween(this.backgroundWarning).to({alpha: 1}, 500, "Linear", true, 0, -1);
              this.tween.yoyo(true, 500);
              //Warning alarm
              this.warning = this.add.audio('warning');
              this.warning.play();
          }
          //If game is over stop the warning background -> audio will stop on its own
          else if((this.time.events.duration/1000)<=0)
          {
              this.tween.stop();
          }
      }
      else
      {
          //Update the timer display
          this.timeText.setText("Time Left: 30");
          this.countDown.setText((Math.floor((this.time.events.duration/1000))-30));
      }
      
      if(!this.ended && this.money.children.length==0 && Math.floor((this.time.events.duration/1000))<25 && Math.floor((this.time.events.duration/1000))>0)
      {
          this.time.events.remove(this.timer);
          this.timeUp();
          this.ended = true;
      }
  },
  //Create new cash until the maximum to create has been reached
  newCash: function(maxCash)
  {
      for(var i = 0; i < maxCash; i++)
      {
          this.createCash();
      }
  },
  createCash: function()
  {
      //Create a new cash item at a random x,y position with a random cash type
      var newCash = this.add.sprite((Math.random() * 640), (Math.random() * 960), this.getCash(Math.random()));
      //Set the value of the cash
      newCash.value = this.cashValue;
      //Allow input
      newCash.inputEnabled = true;
      newCash.events.onInputDown.add(function()
       {
          //Once the cash has been grabbed add its value to the score, update the score, remove the cash, and spawn new cash
          this.score+=newCash.value;
          this.scoreText.setText("Cash: $"+this.score);
          newCash.destroy();
          this.newCash(this.cyclone[this.level-1][2]);
       }, this);
      //Add random movements for the cash
       this.addPath(newCash);
      //Add the cash to the money group
       this.money.add(newCash);
  },
  addPath: function(cash)
  {
        //Create 8 random movements
        var tweenA = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenB = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenC = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenD = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenE = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenF = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenG = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        var tweenH = this.add.tween(cash).to({x: ((Math.random() * 640)-30), y: ((Math.random() * 960)+20)}, (Math.random() * this.cyclone[this.level-1][3]));
        //Destroy the cash when the movements have been completed
        tweenH.onComplete.add(function () 
        {        
            cash.destroy();    
        });
        //Link all the movements
        tweenA.chain(tweenB);
        tweenB.chain(tweenC);
        tweenC.chain(tweenD);
        tweenD.chain(tweenE);
        tweenE.chain(tweenF);
        tweenF.chain(tweenG);
        tweenG.chain(tweenH);
        tweenA.start();
  },
  getCash: function(cashNum)
  {
      //Uses a random number to choose between the five potential cash textures
      //The last two (4&5) appear to be more than one bill so they are worth more as outline in the cyclone array
      if(cashNum <= 0.2)
      {
          this.cashValue = this.cyclone[this.level-1][4];
          return 'cash1';
      }
      else if(cashNum <= 0.4)
      {
          this.cashValue = this.cyclone[this.level-1][4];
          return 'cash2';
      }
      else if(cashNum <= 0.6)
      {
          this.cashValue = this.cyclone[this.level-1][4];
          return 'cash3';
      }
      else if(cashNum <= 0.8)
      {
          this.cashValue = this.cyclone[this.level-1][5];
          return 'cash4';
      }
      else
      {
          this.cashValue = this.cyclone[this.level-1][5];
          return 'cash5';
      }
  },
  timeUp: function()
      {
          this.cash1 = this.add.sprite(100, 300, 'cash5');
          this.cash2 = this.add.sprite(200, 400, 'cash1');
          this.cash3 = this.add.sprite(300, 500, 'cash4');
          this.cash4 = this.add.sprite(400, 600, 'cash2');
          this.cash5 = this.add.sprite(500, 700, 'cash3');
          //When time is up send the 'cyclone' to collect all remaining money
          this.cycloneAnimation = this.add.sprite(-300, 100, 'cyclone');
          this.cycloneAnimation.scale.setTo(2, 2);
          this.cycloneAnimation.animations.add('spin');
          this.cycloneAnimation.animations.play('spin', 30, true);
          var cyTween = this.add.tween(this.cycloneAnimation).to({x: 500, y: 100}, 3000);
          cyTween.start();
          //Remove the money so more cannot be collected
          this.money.destroy();
          cyTween.onComplete.add(function()
          {
              //Remove timer and score displays
              this.timeText.destroy(); 
              this.scoreText.destroy();
              //Set the ending background
              this.background = this.add.sprite(0, 0, 'endScreen');
              
              var style = {
                  fill: '#ffffff',
                  font: '96px Arial',
                  stroke: '#ffffff',
                  strokeThickness: 5
              };
              //Display the score on the screen
              this.scoreText = this.add.text(300, 450, "$"+this.score, style);
              this.scoreText.anchor.setTo(0.5, 0.5);
              //Cash Emitter
              this.emitter = this.add.emitter(320, 470, 100);
              this.emitter.makeParticles(['cash1', 'cash5']);
              this.emitter.minParticleScale = 0.25;
              this.emitter.maxParticleScale = 0.25;
              this.emitter.start(false, 6000, 100);
              //If this was not the last level offer a play again button
              if(this.level!=this.cyclone.length)
              {
                this.playAgain = this.add.sprite(400, 800, 'playAgainButton');
                this.playAgain.width=200;
                this.playAgain.height=100;
    
                this.playAgain.inputEnabled = true;
                this.playAgain.events.onInputDown.add(function()
                {
                    //Reset the global level and restart
                    Cash.level = this.level + 1;
                    this.state.restart();
                }, this); 
              }
          }, this);
      }
};