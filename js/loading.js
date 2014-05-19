var requires = [
    "lib/phaser.2_0_2",
	"loader",
	
	"Assets",
	"SoundManager",
	
	"core/level",
	"core/room",
	"core/player",
	"core/enemyMgr",
	
    "rogatime"
];


requirejs(requires, function(){
    var loader = new Loader();
    loader.libs_loaded();
});
