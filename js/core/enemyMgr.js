function Enemy()
{
	var that = this;
	that.x = 0;
	that.y = 0;
	sprite = NaN;
	that.targetx = 0;
	that.targety = 0;
	that.moving = false;
	
	that.create = function(x,y)
	{
		that.x = x;
		that.y = y;
		that.sprite = game.add.sprite(x, y, 'enemy');
		that.sprite.anchor.setTo(0.5, 0.5);
		game.physics.enable(that.sprite);
		that.sprite.body.collideWorldBounds = true;
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
		}
	};
	
	that.step = function()
	{
		
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

function EnemyManager()
{
	var that = this;
	that.activePool = [];
	that.allPool = [];
	that.activateDist = 3;
	
	that.create = function()
	{
		that.activePool = new Array();
		that.allPool = new Array();
	};
	
	that.update = function()
	{
		that.allPool.foreach(
		function(entry)
		{
			entry.update();
		});
	};
	
	that.step = function()
	{
		that.allPool.foreach(
		function(entry)
		{
			entry.step();
		});
	};
	
	that.add = function( x, y, type )
	{
		var enemy = new Enemy();
		enemy.create(x,y);
		that.allPool.push(enemy);
	};
}