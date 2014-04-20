function Player(){
	"use strict";
	var that = this;
	that.sprite = NaN;
	that.spriteTrgt = NaN;
	that.targetx = 0;
	that.targety = 0;
	that.dbg_line1 = NaN;
	
	that.moving = false;
	
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
	};
	
	that.update = function()
	{
		if( that.sprite.x != that.targetx || that.sprite.y != that.targety)
		{
			that.moving = true;
			game.physics.arcade.moveToXY( that.sprite, that.targetx, that.targety, 100 );
		}
		if ( Phaser.Math.distance(that.sprite.x, that.sprite.y, that.targetx, that.targety) < 4)
		{
			that.moving = false;
			that.sprite.body.velocity.setTo(0, 0);
			that.sprite.x = that.targetx;
			that.sprite.y = that.targety;
			rogatime.step();
		}
		that.dbg_line1.setTo(that.sprite.x, that.sprite.y, that.targetx, that.targety);
	};
	
	that.debugRender = function()
	{
		game.debug.geom(that.dbg_line1);
		game.context.strokeStyle="#FF0000";
		game.context.strokeRect(that.targetx - 16, that.targety - 16, that.size, that.size);
	};
	
	that.setTarget = function( x, y )
	{
		that.moving = true;
		that.targetx = x;
		that.targety = y;
		that.spriteTrgt.x = that.targetx;
		that.spriteTrgt.y = that.targety;
	};
}