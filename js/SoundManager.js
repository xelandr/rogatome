function SoundManager(main){
    "use strict";
    var that = this;
    that.main = main;
    
    that.main_theme = false;

    that.is_paused = false;
    
    that.create = function()
    {
        that.main_theme = game.add.audio( "snd_main" );
        that.main_theme.play( '', 0, 1, true, false );

        if( true )
		{
            that.mute();
        }
    }
    
    that.start_main_theme = function()
    {
        that.main_theme.play( '', 0, 1, true, false );
    }

    that.mute = function(){
        if(that.is_paused === true){
            game.sound.mute = false;
        } else {
            game.sound.mute = true;
        }
        that.is_paused = !that.is_paused;
    }

}