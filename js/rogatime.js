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
		for (i = that.to_be_called_at_create.length - 1; i >= 0; i -= 1) {
			that.to_be_called_at_create[i].create();
		}
		//document.addEventListener('touchstart', that.car.jump, false);
		//document.addEventListener('mousedown', that.car.jump, false);

	};

	that.update = function () 
	{
	};

    that.render = function () 
	{
		that.level.render();
	};
}

