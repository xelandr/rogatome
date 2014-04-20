function Enemy()
{
	that = this;
	that.x = 0;
	thay.y = 0;
	
	that.create = function(x,y)
	{
	};
	
	that.update = function()
	{
	};
	
	that.step = function()
	{
	};
}

function EnemyManager()
{
	that = this;
	that.activePool = [];
	that.allPool = [];
	that.activateDist = 3;
	
	that.create = function()
	{
	};
	
	that.update = function()
	{
	};
	
	that.step = function()
	{
	};
	
	that.add = function( x, y, type )
	{
		var enemy = new Enemy();
		enemy.create(x,y);
		that.allPool.push(enemy);
	};
}