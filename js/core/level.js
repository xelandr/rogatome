function Level()
{
	"use strict";
	var that = this;
	
	that.size = 4;
	that.roomSize = 8;
	that.tileSpriteSize = 32;
	that.floors = false;
	that.rooms = [];
	that.tiles = [];
	that.map = NaN;
	that.layer1 = NaN;
	that.created = false;
	that.startx = 0;
	that.starty = 0;
	that.finishx = 0;
	that.finishy = 0;
	
	that.moveSprites = [];
	
	that.create = function()
	{
		that.map = game.add.tilemap();
		that.map.addTilesetImage('ts_tileset','tileset', that.tileSpriteSize, that.tileSpriteSize);

		//  Creates a new blank layer and sets the map dimensions.
		that.layer1 = that.map.create('level1', that.size*that.roomSize*2, that.size*that.roomSize*2, that.tileSpriteSize, that.tileSpriteSize);

		//  Resize the world
		that.layer1.resizeWorld();

		that.generateRooms();
		var x,y,x1,y1;
		var start = true;
		var finish = true;
		for ( y = 0; y < that.size; y++ ) 
		{
			for ( x = 0; x < that.size; x++ ) 
			{
				var tileTemplate = that.rooms[y*that.size + x].tiles;
				for ( y1 = 0; y1 < that.roomSize; y1++ ) 
				{
					for ( x1 = 0; x1 < that.roomSize; x1++ ) 
					{
						var tileType = tileTemplate[y1*that.roomSize + x1];
						if( x == 0 && x1 == 0 && !start )
						{
							tileType = 0;
						}
						if(start && x == 0 && x1 == 0 && tileType == 1)
						{
							start = false;
							that.startx = (x*that.roomSize + x1)*2;
							that.starty = (y*that.roomSize + y1)*2;
						}
						if( x == that.size-1 && x1 == that.roomSize-1 && !finish )
						{
							tileType = 0;
						}
						if(finish && x == that.size-1 && x1 == that.roomSize-1 && tileType == 1)
						{
							finish = false;
							that.finishx = (x*that.roomSize + x1)*2;
							that.finishy = (y*that.roomSize + y1)*2;
						}
						if( y == 0 && y1 == 0 || y == that.size-1 && y1 == that.roomSize-1)
						{
							tileType = 0;
						}
						for(var sub = 0; sub<4; sub++)
						{
							if(tileType != 0 && Math.random() > 0.7 )
							{
								tileType = Math.floor(Math.random() * 5) + 1;
							}
							var tempx = sub - Math.floor(sub/2)*2;
							var tempy = Math.floor(sub/2);
							that.map.putTile(tileType, (x*that.roomSize + x1)*2 + tempx, (y*that.roomSize + y1)*2 + tempy, that.layer1);
							var id = ( (y*that.roomSize + y1)*2 + tempy )*that.roomSize*that.size + (x*that.roomSize + x1)*2 + tempx;
							that.tiles[id] = tileType;
						}
					}
				}
			}
		}
		that.map.setCollision(0);
		that.created = true;
	}
	
	that.generateRooms = function()
	{
		var x,y;
		for ( y = 0; y < that.size; y++ ) 
		{
			for ( x = 0; x < that.size; x++ ) 
			{
				var room = new Room();
				var id = [y*that.size + x];
				var prevroom,type,fwd;
				fwd = 0;
				if( x == 0 && y == 0 )
				{
					type = 1;
				}
				else
				{
					if( x > 0 )
					{
						prevroom = that.rooms[id - 1];
						type = prevroom.r;
						if( type == prevroom.type )
						{
							fwd = 1;
						}
					}
					if( y > 0)
					{
						prevroom = that.rooms[id - that.size];
						type = prevroom.b;
						if( type == prevroom.type )
						{
							fwd = 1;
						}
					}
				}
				room.createRoom(type,fwd);
				if( x >= 2 && room.type == that.rooms[id - 2].l )
				{
					room.createRoom(type,1);
				}
				if( y >= 2 && room.type == that.rooms[id - 2*that.size].t )
				{
					room.createRoom(type,1);
				}
				that.rooms[id] = room;
			}
		}
	}
	
	that.render = function()
	{
		if(!that.created) return;

		var x,y;
		for ( y = 0; y < that.size; y++ ) 
		{
			for ( x = 0; x < that.size; x++ ) 
			{
				var id = y*that.size + x;
				that.rooms[id].render_room( x*that.roomSize, y*that.roomSize );
			}
		}
	}
	
	that.createPath = function()
	{
		var x = that.layer1.getTileX(rogatime.player.sprite.x);
		var y = that.layer1.getTileY(rogatime.player.sprite.y);
		x = Math.max(x-1,0);
		y = Math.max(y-1,0);
		x = Math.min(x,that.roomSize * that.size * 2 - 2);
		y = Math.min(y,that.roomSize * that.size * 2 - 2);
		var x1,y1;
		for ( y1 = 0; y1 < 3; y1++ ) 
		{
			for ( x1 = 0; x1 < 3; x1++ ) 
			{
				var id = y1*3 + x1;
				var tileId = ( y + y1 ) * that.roomSize * that.size + x + x1;
				var tile = that.tiles[tileId];
				if( id!=4 && tile !== 0)
				{
					var sprite = game.add.sprite( ( x + x1 ) * that.tileSpriteSize, ( y + y1 ) * that.tileSpriteSize, 'ui_tiles', 0 );
					that.moveSprites.push(sprite);
				}
			}
		}
	}
}