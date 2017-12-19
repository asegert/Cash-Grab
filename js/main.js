var Cash = Cash || {};

Cash.game = new Phaser.Game(640, 960, Phaser.AUTO);

Cash.game.state.add('Boot', Cash.BootState); 
Cash.game.state.add('Preload', Cash.PreloadState); 
Cash.game.state.add('Story', Cash.StoryState);
Cash.game.state.add('Game', Cash.GameState);

Cash.game.state.start('Boot');