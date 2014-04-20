function Assets(){
	"use strict";
	var that = this;
	that.folder = "data/imgs";
	that.audioFolder = "data/audio";

	that.load = function(){
		game.load.image('tileset', that.folder + '/tiles1_32.png');
		game.load.spritesheet('ui_tiles', that.folder + '/UI_tiles.png', 32, 32);
		game.load.image('template', that.folder + '/templates.png');
		game.load.spritesheet('char', that.folder + '/char.png', 32, 32);
		
		game.load.audio( 'snd_main', that.audioFolder + '/main.mp3', true );		
	};
}