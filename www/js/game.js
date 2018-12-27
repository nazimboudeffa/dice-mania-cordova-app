var d = [];
var dice;

bootState = {
  preload: function() {

  },
  create: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.state.start('preloader');
  }
},

preloadState = {
  preload: function() {
    this.load.atlasJSONHash('dice', 'assets/dice.png', 'assets/dice.json');
    this.load.image('rules', 'assets/rules.png');
  },
  create: function() {
    this.game.state.start('play');
  }
},

playState = {
  create: function() {
    this.game.stage.backgroundColor = '#0a6c03';
    this.addDice();
    var rules = this.add.button(game.world.centerX, 550, 'rules', this.showRules);
    rules.anchor.set(0.5);
  },
  showRules() {
    window.open('http://kawa.games/quest');
  },
  addDice: function() {
    for (i=0; i < 5; i++){
      d[i] = new Dice(game.world.centerX, 50 + i * 100);
      d[i].inputEnabled = true;
      d[i].events.onInputDown.add(this.rollDice, this);
    }
  },
  rollDice: function(dice) {
    dice.enableDice();
    dice.roll();
  },
  rollDiceComplete: function() {
    dice.disableDice();
  }
};

var game = new Phaser.Game(360, 640);
game.state.add('boot', bootState);
game.state.add('preloader', preloadState);
game.state.add('play', playState);

game.state.start('boot');
