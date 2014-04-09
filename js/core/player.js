function Player(){
	"use strict";
	var that = this;
	
	that.create = function()
	{
		that.sprite = game.add.sprite(300, 200, 'char');
		that.sprite.animations.add('walk', [0,1,2] );
		that.sprite.animations.play('walk', 12, true);
	}
}