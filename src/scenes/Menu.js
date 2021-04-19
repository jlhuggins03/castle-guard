class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");// name of scene
    };

    /*********************************************************************************************************************************************************************************/
    preload(){ //step 1: preload
        /*************************************************/
        /*********************IMAGES**********************/
        /*************************************************/
        //load images, that are placed in their own folder.
        
        // set load path to save some typing
        this.load.path = './assets/images/';

        //projectile 
        this.load.image('arrow','arrow.png'); //arrow that replaces the rocket asset

        //game over Layer
        this.load.image('gameOverLayer', 'gameOver.png');

        //pause menu
        // this.load.image('pLayer', '/unused/gamePausedMenu.png')

        // These image files are not used due to scrapping of the idea of the rocket/arrow 
        // being a projectile of another class. The idea was scrapped due to me focusing too
        // hard and long on it, when I should've been implementing other mods.

        // this.load.image('bluearcher','unused/blue_archer.png');
        // this.load.image('redarcher','unused/red_archer.png');
        

        /*************************************************/
        /**********************AUDIO**********************/
        /*************************************************/
        //load audio, which are also placed in their own folder.

        // set load path to save some typing
        this.load.path = './assets/audio/';

        // Projectile Launch sound
        this.load.audio('arrowLaunch','arrow-launch.mp3'); // downloaded sound to replace the rocket launch

        // 4x Projectile hit sounds, for the randomizer 
        this.load.audio('arrow1','arrow-hit-1.mp3'); //these downloaded sounds are to replace the explosion sound
        this.load.audio('arrow2','arrow-hit-2.mp3');
        this.load.audio('arrow3','arrow-hit-3.mp3');
        this.load.audio('arrow4','arrow-hit-4.mp3');

        // Again, this audio file is not used due to the background music MOD
        // being scrapped to focus on implementing other mods.

        // this.load.audio('play_background', 'unused/dancing-with-a-sword.mp3');
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    create() {//step 2: create


        /*************************************************/
        /*************Image placement for UI**************/
        /*************************************************/

        //sun layer comes first.
        this.sun = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sun').setOrigin(0, 0); //placing the sun image at the center of the game config

        //cloud layer comes second
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0, 0); //placing the cloud image at the center of the game config

        //back walls comes third
        this.wall_padding = this.add.sprite(0,0,'walls').setOrigin(0,0); //placing the brick walls image at the center of the game config

        //padding elements come fourth
        this.walls = this.add.sprite(0,0,'padding').setOrigin(0,0); //placing the padding elements image at the center of the game config

        //grassy foreground comes fifth
        this.grass = this.add.sprite(0,0,'grass').setOrigin(0,0); //placing the grass image at the center of the game config

        //main menu overly comes sixth
        this.mainMenu = this.add.sprite(0,0,'mMLayer').setOrigin(0,0); //placing the grass image at the center of the game config

        //how to play menu foreground comes seventh
        this.howToPlayMenu = this.add.sprite(0,0,'h2PLayer').setOrigin(0,0); //placing the grass image at the center of the game config
        this.howToPlayMenu.alpha = 0;

        //difficulty foreground comes last
        this.difficultyMenu = this.add.sprite(0,0,'diffLayer').setOrigin(0,0); //placing the grass image at the center of the game config
        this.difficultyMenu.alpha = 0;

        /*************************************************/
        /***************Text Configurations***************/
        /*************************************************/

        //text config for High Score
        // let highScoreConfig = {
        //     fontFamily: 'MedievalSharp',
        //     src: "https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap",
        //     fontSize: '32px',
        //     color: '#ffde00',
        //     align: 'right',
        //     padding: {
        //         top: 5,
        //         bottom: 5,
        //     },
        //     fixedWidth: 0
        // };
        
        /*************************************************/
        /*************Key Input Definitons****************/
        /*************************************************/

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
  

        /*************************************************/
        /*********************Music***********************/
        /*************************************************/
        // Music background Mod was scrapped due to difficulty trying to
        // play sound upon scene start. I also noticed that it stacked 
        // instances of music (but thats due to me not having a stop method).

        //background music
        // let bg = this.sound.add('play_background'); //adding a sound to the scene

        //music config
        // let musicConfig = {
        //     mute:false,
        //     volume: .25,
        //     rate: 1,
        //     detune: 0,
        //     seek: 0,
        //     loop: true,
        //     delay: 0
        // };

        //play music with the config
        //bg.play(musicConfig);
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    update(){//step 3: update, every tick while scene is active

        //parallax tile background movement
        this.clouds.tilePositionX -= cloudSpeed; //cloud movement
        this.sun.tilePositionX -= sunSpeed; //sun movement 

        //check to see if 1 is pressed 
        if(Phaser.Input.Keyboard.JustDown(key1)){
            
            //change menu to difficulty 
            this.mainMenu.alpha = 0;
            this.difficultyMenu.alpha = 1;
            this.sound.play('select'); // play the select sound effect
        
        };

        //check to see if 2 is pressed on main menu
        if(Phaser.Input.Keyboard.JustDown(key2)){

            //change menu to how to play
            this.mainMenu.alpha = 0;
            this.howToPlayMenu.alpha = 1;
            this.sound.play('select'); // play the select sound effect        
        };

        //check to see if B is pressed on the how to play or difficulty menu
        if(Phaser.Input.Keyboard.JustDown(keyB)){

            //set Difficulty menu or How to play menu 'invisible' and make main menu reappear
            this.howToPlayMenu.alpha = 0; 
            this.difficultyMenu.alpha = 0;
            this.mainMenu.alpha = 1;
            this.sound.play('select'); // play the select sound effect
        
        };

        //check to see if ← is pressed when on the difficulty menu only
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) && this.mainMenu.alpha == 0 && this.howToPlayMenu.alpha == 0 && this.difficultyMenu.alpha == 1 ){
            
            //set game settings to 'easy mode'
            game.settings = {
                dragonSpeed: 2.5, //set the dragon speed
                gameTimer: 61000, //set the game timer to 1 min + 1 second to account for timer loading in 1 second less
            }
            
            this.sound.play('select'); // play the select sound effect
            this.scene.start('playScene'); //start the play scene
        };

        //check to see if → is pressed when on the difficulty menu only
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.mainMenu.alpha == 0 && this.howToPlayMenu.alpha == 0 && this.difficultyMenu.alpha == 1 ){
            
            //set game settings to 'hard mode'
            game.settings = {
                dragonSpeed: 3.75, //set the dragon speed
                gameTimer: 46000, //set the game timer to 46 seconds to account for timer loading in 1 second less 
            }
            
            this.sound.play('select'); // play the select sound effect
            this.scene.start('playScene'); //start the play scene
        };
    };
    /*********************************************************************************************************************************************************************************/    
};