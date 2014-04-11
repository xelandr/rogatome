function Player(){
	"use strict";
	var that = this;
	that.sprite = NaN;
	that.spriteTrgt = NaN;
	that.targetx = 0;
	that.targety = 0;
	
	that.create = function()
	{
		that.spriteTrgt = game.add.sprite(-100, -100, 'char');
		that.spriteTrgt.anchor.setTo(0.5, 0.5);
		that.spriteTrgt.scale.setTo(0.5, 0.5);
		
		that.sprite = game.add.sprite(300, 200, 'char');
		that.sprite.anchor.setTo(0.5, 0.5);
		that.sprite.animations.add('walk', [0,1,2] );
		that.sprite.animations.play('walk', 12, true);
		game.physics.enable(that.sprite);
		that.sprite.body.collideWorldBounds = true;
		game.camera.follow(that.sprite);

	}
	
	that.update = function()
	{
		if (game.input.mousePointer.isDown)
		{
			that.targetx = game.input.worldX;
			that.targety = game.input.worldY;
			that.spriteTrgt.x = that.targetx;
			that.spriteTrgt.y = that.targety;
			game.physics.arcade.moveToXY( that.sprite, that.targetx, that.targety, 400 );
		}
		if (Phaser.Rectangle.contains(that.sprite.body, that.targetx, that.targety))
		{
			that.sprite.body.velocity.setTo(0, 0);
		}

	}
}