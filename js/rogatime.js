/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false */

var rogatime, game;
var Assets, Soundmgr;

function RogaTime() {
	"use strict";

	var that = this;

	that.STATE = {
		'MENU': 0,
		'SELECT_CHAR': 1,
		'GAME': 2,
		'RESULT': 3
	};

	that.game_state = that.STATE.MENU;

	that.assets_load = function () 
	{

	};

	that.init_game_objects = function () 
	{
		that.assets = new Assets();
		that.sound_manager = new SoundManager(that);
		that.player = new Player();
		
		that.level = new Level();

		// obj.create() will be called from JetBuggy.create()

		that.to_be_called_at_create = [
			that.player,
			that.sound_manager,
			that.level
		];

	};

	that.preload = function () 
	{
		that.init_game_objects();
		that.assets.load();
	};

	that.create = function () 
	{
		var i;
		that.game_state = that.STATE.MENU;
		game.physics.startSystem(Phaser.Physics.ARCADE);
		for (i = that.to_be_called_at_create.length - 1; i >= 0; i -= 1) {
			that.to_be_called_at_create[i].create();
		}
		that.player.sprite.x = that.level.startx * 32 + 16;
		that.player.sprite.y = that.level.starty * 32 + 16;
		//document.addEventListener('touchstart', that.car.jump, false);
		//document.addEventListener('mousedown', that.car.jump, false);

	};

	that.update = function () 
	{
		game.physics.arcade.collide(that.player.sprite, that.level.layer1);
		that.player.update();
	};

	that.step = function () 
	{
		if(that.level.created)
		{
			that.level.createPath();
		}
	}

    that.render = function () 
	{
		that.level.render();
		game.debug.spriteCoords(that.player.sprite, 320, 32);
		that.player.debugRender();
	};
}

