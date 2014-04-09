function Level()
{
	"use strict";
	var that = this;
	
	that.size = 4;
	that.roomSize = 8;
	that.tileSpriteSize = 48;
	that.floors = false;
	that.rooms = [];
	that.tiles = [];
	that.map = NaN;
	that.layer1 = NaN;
	that.created = false;
	
	that.create = function()
	{
		that.map = game.add.tilemap();
		that.map.addTilesetImage('ts_tileset','tileset', 48, 48);
		
		//  Creates a new blank layer and sets the map dimensions.
		that.layer1 = that.map.create('level1', that.size*that.roomSize, that.size*that.roomSize, 48, 48);

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
						}
						if( x == that.size-1 && x1 == that.roomSize-1 && !finish )
						{
							tileType = 0;
						}
						if(finish && x == that.size-1 && x1 == that.roomSize-1 && tileType == 1)
						{
							finish = false;
						}
						if( y == 0 && y1 == 0 || y == that.size-1 && y1 == that.roomSize-1)
						{
							tileType = 0;
						}
						that.map.putTile(tileType, x*that.roomSize + x1, y*that.roomSize + y1, that.layer1);
					}
				}
			}
		}
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
}