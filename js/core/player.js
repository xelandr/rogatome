function Player(){
	"use strict";
	var that = this;
	that.sprite = NaN;
	
	that.create = function()
	{
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
			//  400 is the speed it will move towards the mouse
			game.physics.arcade.moveToPointer( that.sprite, 400 );

			//  if it's overlapping the mouse, don't move any more
			if (Phaser.Rectangle.contains(that.sprite.body, game.input.x, game.input.y))
			{
				that.sprite.body.velocity.setTo(0, 0);
			}
		}
		else
		{
			that.sprite.body.velocity.setTo(0, 0);
		}

	}
}