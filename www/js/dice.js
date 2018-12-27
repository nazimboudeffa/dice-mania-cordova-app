Dice = function(x, y) {
    Phaser.Sprite.call(this, game, x, y, 'dice');

    this.tween;
    this.anim;
    //this.blurX = mygame.add.filter("BlurX");  // Blur filters taken from
    //this.blurY = mygame.add.filter("BlurY");  // Filters -> blur example

    this.anchor.setTo(0.5, 0.5);

    var frames = ['dieWhite1', 'dieWhite2', 'dieWhite3', 'dieWhite4', 'dieWhite5', 'dieWhite6'];

    for (var i = 0; i < 15; i++) {
        frames.push(frames[game.rnd.integerInRange(0, frames.length - 1)]);
    }

    // the animation displays the frames from the spritesheet in a random order
    this.anim = this.animations.add("roll", frames);
    this.anim.onComplete.add(this.rollComplete, this);

    this.frameName = "dieWhite1";


    game.add.existing(this);
};

Dice.prototype = Object.create(Phaser.Sprite.prototype);
Dice.prototype.constructor = Dice;

Dice.prototype.roll = function() {
    //this.filters = [this.blurX, this.blurY];
    this.animations.play("roll", 20);
};

Dice.prototype.rollComplete = function() {
    //this.filters = null;
    this.frameName = game.rnd.pick(['dieWhite1', 'dieWhite2', 'dieWhite3', 'dieWhite4', 'dieWhite5', 'dieWhite6']);
};

Dice.prototype.update = function() {
    if (this.anim.isPlaying) {
        this.angle = game.rnd.angle();
    }
};

Dice.prototype.disableDice = function() {
    this.tint = 0xcdcdcd;
};

Dice.prototype.enableDice = function() {
    this.tint = 0xffffff;
};

Dice.prototype.isAnimationRunning = function() {
    return this.anim.isPlaying;
};