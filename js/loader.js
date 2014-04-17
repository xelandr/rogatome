var game, rogatime, Phaser;

function Loader(){
	"use strict";
	var that = this;

	that.hide_loading_text = function(){
		var loading_text = document.getElementById('loading_text');
		loading_text.style.display = 'none';        
	}

	that.libs_loaded = function(){
		that.game_init();
	}

	that.game_init = function(){
		rogatime = new RogaTime();
		game = new Phaser.Game(
			800,
			600,
			Phaser.CANVAS,
			'', { 
				preload: rogatime.preload,
				create: rogatime.create,
				render: rogatime.render,
				update: rogatime.update
			},
			true,
			false
		);
		that.hide_loading_text();
		document.oncontextmenu = function () {
		   return false;
		};
	}

}