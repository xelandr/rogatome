function Player(){
	"use strict";
	var that = this;
	that.sprite = NaN;
	that.spriteTrgt = NaN;
	that.targetx = 0;
	that.targety = 0;
	that.dbg_line1 = NaN;
	
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
		that.dbg_line1 = new Phaser.Line(that.sprite.x, that.sprite.y, that.targetx, that.targety);


	}
	
	that.update = function()
	{
		if (game.input.mousePointer.isDown)
		{
			rogatime.step();
			that.targetx = rogatime.level.layer1.getTileX(game.input.worldX) * 32 + 16;
			that.targety = rogatime.level.layer1.getTileY(game.input.worldY) * 32 + 16;
			that.spriteTrgt.x = that.targetx;
			that.spriteTrgt.y = that.targety;
			game.physics.arcade.moveToXY( that.sprite, that.targetx, that.targety, 400 );
		}
		if (Phaser.Rectangle.contains(that.sprite.body, that.targetx, that.targety))
		{
			that.sprite.body.velocity.setTo(0, 0);
			that.sprite.x = that.targetx;
			that.sprite.y = that.targety;
		}
		that.dbg_line1.setTo(that.sprite.x, that.sprite.y, that.targetx, that.targety);
	}
	
	that.debugRender = function()
	{
		game.debug.geom(that.dbg_line1);
		game.context.strokeStyle="#FF0000";
		game.context.strokeRect(that.targetx - 16, that.targety - 16, that.size, that.size);
	}
}