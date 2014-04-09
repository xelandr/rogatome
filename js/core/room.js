function Room()
{
	"use strict";
	var that = this;
	that.type = 1;
	that.fwd = 0;
	that.l = 0;
	that.r = 0;
	that.t = 0;
	that.b = 0;
	that.size = 8;
	that.templateId = 0;
	that.tiles = [];
	that.templateImgSize = 64;

	that.createRoom = function(type, fwd)
	{
		that.type = type;
		that.fwd = fwd;
		that.formSides();
		if(fwd == 1) that.revertSides();
		that.generateTemplateId();
		that.generateTiles();
	}

	that.generateTemplateId = function()
	{
		var row = 0;
		switch(that.type)
		{
		case 1:
			if(that.fwd)
			{
				row = 1;
			}
			else
			{
				row = 0;
			}
			break;
		case 2:
			if(that.fwd)
			{
				row = 5;
			}
			else
			{
				row = 4;
			}
			break;
		case 3:
			if(that.fwd)
			{
				row = 6;
			}
			else
			{
				row = 3;
			}
			break;
		case 4:
			if(that.fwd)
			{
				row = 2;
			}
			else
			{
				row = 7;
			}
			break;
		}
		that.templateId = row*that.size + Math.floor(Math.random() * that.size);
	}
	that.formSides = function()
	{
		switch(that.type)
		{
		case 1:
			that.l = 2;
			that.r = 3;
			that.t = 4;
			that.b = 1;
			break;
		case 2:
			that.l = 1;
			that.r = 4;
			that.t = 3;
			that.b = 2;
			break;
		case 3:
			that.l = 1;
			that.r = 3;
			that.t = 4;
			that.b = 2;
			break;
		case 4:
			that.l = 2;
			that.r = 4;
			that.t = 3;
			that.b = 1;
			break;
		}
	}
	
	that.revertSides = function()
	{
		that.l = [that.r, that.r = that.l][0];
		that.t = [that.b, that.b = that.t][0];
	}
	
	that.render_room = function( x, y )
	{
		switch(that.type)
		{
		case 1:
			game.context.fillStyle = 'rgb(0,255,0)';
			break;
		case 2:
			game.context.fillStyle = 'rgb(255,0,0)';
			break;
		case 3:
			game.context.fillStyle = 'rgb(0,0,255)';
			break;
		case 4:
			game.context.fillStyle = 'rgb(255,255,0)';
			break;
		}
		game.context.fillRect(x, y, that.size, that.size);
	}
	
	that.generateTiles = function()
	{
		var bmd = game.add.bitmapData(that.size,that.size);

		var y = Math.floor( that.templateId / that.size );
		var x = Math.floor( that.templateId - y * that.size );
		var area = new Phaser.Rectangle( x * that.size, y * that.size, that.size, that.size );
		bmd.copyPixels('template', area, 0, 0 );
		bmd.refreshBuffer();
		for ( y = 0; y < that.size; y++ ) 
		{
			for ( x = 0; x < that.size; x++ ) 
			{
				var id = y*that.size + x;
				var pixel = bmd.context.getImageData(x, y, 1, 1).data;
				var pixelColor = pixel[0] + pixel[1] + pixel[2];
				if( pixelColor == 0 )
				{
					that.tiles[id] = 1;
				}
				else
				{
					that.tiles[id] = 0;
				}
			}
		}
	}
}