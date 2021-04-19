class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");// name of scene
    };

    // Hello this class is the Boot class that I decided to add after watching 4/14/21 Lecture.
    // I wanted to add this class to 1. Make a meme and include it with an old logo and
    // 2. Reduce load time and preload things here.

    /*********************************************************************************************************************************************************************************/
    preload(){ //step 1: preload
        /*************************************************/
        /*********************IMAGES**********************/
        /*************************************************/
        //load images, that are placed in their own folder.
        
        // set load path to save some typing
        this.load.path = './assets/images/';

        //parallax background
        this.load.image('sun','sun.png'); //sun layer that comes first in the parallax bg.
        this.load.image('clouds', 'clouds.png'); //clouds layer that goes on top of the sun layer.

        //theme foreground
        this.load.image('walls','castle-guard-walls.png'); //back wall texture that goes on top of the clouds layer
        this.load.image('padding','castle-guard-padding.png'); //padding textures, they go on top of the walls layer
        this.load.image('grass','castle-guard-grass.png'); //grass foreground that goes on top of the arrow layer

        //menu overlays
        this.load.image('mMLayer','mainMenu.png'); //grass foreground that goes on top of the arrow layer
        this.load.image('h2PLayer','howToPlayMenu.png'); //grass foreground that goes on top of the arrow layer
        this.load.image('diffLayer','difficultyMenu.png'); //grass foreground that goes on top of the arrow layer

        //boot brand logo
        this.load.image('brandLogo','dtg.logo.png'); //a throwback team logo from game design ye before.


        /*************************************************/
        /**********************AUDIO**********************/
        /*************************************************/
        //load audio, which are also placed in their own folder.

        // set load path to save some typing
        this.load.path = './assets/audio/';

        //select audio
        this.load.audio('select', 'select.mp3'); //new downloaded select sound
                
        // These audio files are not used due to me giving up on trying to implement
        // background music to play on startup. I tried to work on it but decided that my work
        // should be focused on other MODS too.

        // this.load.audio('menu_background', 'unused/fate-prelude.mp3');
        // this.load.audio('yay','unused/dtg.yay.mp3');
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    create() {// step 2: create

       //brand logo image to be placed at center of the game config.
        this.logo = this.add.sprite(game.config.width/3.25, game.config.height/4.3,'brandLogo').setOrigin(0, 0);

        //text configuration
        let titleConfig = {
            fontFamily: 'MedievalSharp', //type of font the font will be located
            src: "https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap", //cool mediveal font found online
            fontSize: '42px', //size of the font to be displayed
            color: '#FFFFFF', //White Color
            align: 'right', //type of text allignment
            padding: { //text padding so it doesnt clip the box edges
                top: 5, //5 px on top
                bottom: 5, //5 px on bottom
            },
            fixedWidth: 0 //fixed width of the Textbox; 0 being auto determined.
        };

        //show Mods text below logo, using the text configuration.
        this.add.text(game.config.width/2, game.config.height/2 + borderUISize*4 + borderPadding, 'MODS', titleConfig).setOrigin(0.5);
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    update(){//step 3: update, every tick while scene is active
        
        // a slight delay to show the logo, before going into the menu screen.
        setTimeout(()=>{
            this.scene.start('menuScene');
        },250);

        //I also noticed that this delay is applied in the other scenes. I
        //found this out when I upped the value. My intuition says that it
        //may have to do with the keyword this. Its kinda annoying in the 
        //play scene where you could accidently start easy mode then switch
        //to hard mode because of this slight delay. It is also noticable
        //at the start of the menu scene when the clouds don't move.
    }
    /*********************************************************************************************************************************************************************************/
};