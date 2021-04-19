class Play extends Phaser.Scene {
    constructor() {
        super("playScene"); // name of scene
    };

    /*********************************************************************************************************************************************************************************/
    preload(){//step 1: create

        // set load path to save some typing
        this.load.path = './assets/images/';

        //load spritesheet

        //blue dragon
        this.load.spritesheet('blue-dragon', 'blueDragonLeft.png', {
            frameWidth: 108,
            frameHeight: 68,
            startFrame: 0,
            endframe: 7,
            repeat: -1
        });
        
        //red dragon
        this.load.spritesheet('red-dragon', 'redDragonLeft.png', {
            frameWidth: 108,
            frameHeight: 68,
            startFrame: 0,
            endframe: 7,
            repeat: -1
        });

        //green dragon
        this.load.spritesheet('green-dragon', 'greenDragonLeft.png', {
            frameWidth: 108,
            frameHeight: 68,
            startFrame: 0,
            endframe: 7,
            repeat: -1
        });

        //fire dragon
        this.load.spritesheet('fire-dragon', 'fireDragonLeft.png', {
            frameWidth: 54,
            frameHeight: 34,
            startFrame: 0,
            endframe: 7,
            repeat: -1
        });
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    create() {//step 2: create

        /*************************************************/
        /*****************NON UI THINGS*******************/
        /*************************************************/

        // define key input definitions
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        
        //scrapped keys that were to pause the game
        // keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P); 
        // keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        //get random x for dragon starting placement
        let randXdragon01 = Phaser.Math.RND.integerInRange(game.config.width,game.config.width + borderUISize * 9);
        let randXdragon02 = Phaser.Math.RND.integerInRange(game.config.width,game.config.width + borderUISize * 6);
        let randXdragon03 = Phaser.Math.RND.integerInRange(game.config.width,game.config.width + borderUISize * 3);
       
        // //getting red or blue archer
        // let archerArray = ['bluearcher','redarcher'];
        // let randomArcher = Phaser.Math.RND.pick(archerArray);

        
        // this code block was an attempt at trying to implement
        // a constant high score text to be displayed on all
        // Scenes. Scrapped due to being done.

        //initialize highest score
        //this.highestScore = 0;

        //dragon speed keeper variable
        this.speedKeeper = game.settings.dragonSpeed;

        //initialize score
        this.p1Score = 0;

        //initialize time
        this.displayTimeLeft = (game.settings.gameTimer);

        //GAME OVER flag
        this.gameOver = false;

        //PAUSED flag that was scrapped
        //this.paused = false;

        //text config for UI
        let hudConfig = {
            fontFamily: 'MedievalSharp',
            src: "https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap",
            fontSize: '32px',
            backgroundColor: '#8b867d',
            color: '#000000',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        //text config for High Score
        let highScoreConfig = {
            fontFamily: 'MedievalSharp',
            src: "https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap",
            fontSize: '32px',
            color: '#ffde00',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        };

        /*************************************************/
        /******************UI Placement*******************/
        /*************************************************/

        //sun image layer comes first.
        this.sun = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sun').setOrigin(0, 0);

        //cloud image layer comes second
        this.clouds = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'clouds').setOrigin(0, 0);

        // green HUD background rectangle layer comes third
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x10b457).setOrigin(0, 0);

        //white borders would come fourth - original padding removed for UI overhaul
        // this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); //top border
        // this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0); //bottom border
        // this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);//left border
        // this.add.rectangle(game.config.width - borderUISize,0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);

        //back walls image layer comes fourth
        this.wall_padding = this.add.sprite(0,0,'walls').setOrigin(0,0);
       
        //arrow projectile image layer (player 1 (2-player mod got scrapped)) comes fifth
        this.p1Arrow = new Arrow(this, game.config.width/1.9, game.config.height - borderUISize - borderPadding*3, 'arrow').setOrigin(0.5, 0);

        //dragons (x4) images layer come sixth
        this.dragon00 = new FastDragon(this, randXdragon01, borderUISize * 4.25, 'fire-dragon', 0, 50  );
        this.dragon01 = new Dragon(this, randXdragon02, borderUISize * 4, 'green-dragon', 0, 30).setOrigin(0, 0);
        this.dragon02 = new Dragon(this, randXdragon03, borderUISize * 5 + borderPadding * 2 , 'red-dragon', 0, 20).setOrigin(0, 0);
        this.dragon03 = new Dragon(this, game.config.width , borderUISize * 6 + borderPadding * 4, 'blue-dragon', 0, 10).setOrigin(0, 0);
        

        //padding elements image layer comes seventh
        this.walls = this.add.sprite(0,0,'padding').setOrigin(0,0);

        //grassy foreground image layer comes eighth 
        this.grass = this.add.sprite(0,0,'grass').setOrigin(0,0);

        //score text layer comes ninth
        this.scoreLeft = this.add.text (borderUISize + borderPadding * 3, borderUISize + borderPadding*2,'Score: ',
        hudConfig);
        this.scoreLeft = this.add.text (borderUISize + borderPadding * 12, borderUISize + borderPadding*2,this.p1Score,
        hudConfig);

        //timer text layer comes tenth
        this.timeLeft = this.add.text (borderUISize + borderPadding * 38, borderUISize + borderPadding*2, 'Timer: ',
        hudConfig);
        this.timeLeft = this.add.text (borderUISize + borderPadding * 47, borderUISize + borderPadding*2, this.displayTimeLeft,
        hudConfig);

        //difficulty foreground comes last
        this.gOver = this.add.sprite(0,0,'gameOverLayer').setOrigin(0,0); //placing the grass image at the center of the game config
        this.gOver.alpha = 0;


        // pause menu image layer comes eleventh - scrapped due to inability to unpause
        // this.pausedMenu = this.add.sprite(0,0,'pLayer').setOrigin(0,0);
        // this.pausedMenu.alpha = 0;

        //highscore layer comes twelveth- scrapped due to being done.
        // this.highScore = this.add.text (borderUISize + borderPadding * 10, borderUISize + borderPadding * 38.5, 'Highest Score: ',
        // highScoreConfig);
        // this.highScore = this.add.text (borderUISize + borderPadding * 32, borderUISize + borderPadding * 38.5, this.highestScore,
        // highScoreConfig);
    
        // fire button text layer comes thirteenth 
        // this.fireText = this.add.text (borderUISize + borderPadding * 24, borderUISize + borderPadding*2, 'FIRE',
        // hudConfig);

        // FIRE button mod that makes the FIRE text disappears when arrow is firing was scrapped
        // because I found it difficult to implement.


        /*************************************************/
        /*******************ANIMATIONS********************/
        /*************************************************/

        //animation configs
       
        this.anims.create({//blue dragon animation
            key: 'blue-death',
            frames: this.anims.generateFrameNumbers('blue-dragon', {
                start: 0,
                end: 7,
                first:0
            }),
            framerate:3,
        });

        this.anims.create({//red dragon animation
            key: 'red-death',
            frames: this.anims.generateFrameNumbers('red-dragon', {
                start: 0,
                end: 7,
                first:0
            }),
            framerate:3,
        });

        this.anims.create({//green dragon animation
            key: 'green-death',
            frames: this.anims.generateFrameNumbers('green-dragon', {
                start: 0,
                end: 7,
                first:0
            }),
            framerate:3,
       }); 

       this.anims.create({//fire dragon animation
        key: 'fire-death',
        frames: this.anims.generateFrameNumbers('fire-dragon', {
            start: 0,
            end: 7,
            first:0
        }),
        framerate:3,
   }); 
        
       //This Wall of text is a copy of Nathan's code from his AssetBonaza project.
       //Its was used for the attempt of trying to figure out live animation for the dragons.
       //This too, would eventually get scrapped for preference of time.

         // /***********************************
        // // SPRITES (from sprite sheet)
        // ***********************************/
        // // first (static w/ specific frame number)
        // this.pinkhoverStatic = this.add.sprite(100, 150, 'pinkhover', 3);
        // // second (animated / infinite repeat)
        // let config = {
        //     key: 'hoverAnimation',
        //     frames: this.anims.generateFrameNumbers('pinkhover', { start: 0, end: 7, first: 0}),
        //     frameRate: 15,
        //     repeat: -1,
        // };
        // this.anims.create(config);
        // this.pinkhoverAnimated = this.add.sprite(200, 150, 'pinkhover').play('hoverAnimation');


        //This block of code was my attempt that was previously mentioned in the comment block above.

        // let flapping = {
        //     key: 'dragon-anim',
        //     frames: this.anims.generateFrameNumbers('blueDragonLeft', {start: 0, end: 7, first: 0}),
        //     frameRate:3,
        //     repeat: -1
        // };

        // this.anims.create(flapping);
        // this.dragonflapping = this.dragon01.play('flapping');
    };
    /*********************************************************************************************************************************************************************************/



    /*********************************************************************************************************************************************************************************/
    update() { //step 3:update, on every tick whil scen is active
        
        //parallax tile background movement
        this.clouds.tilePositionX -= cloudSpeed; //cloud movement
        this.sun.tilePositionX -= sunSpeed; //sun movement 

        // this code block was for pausing the game, but scrapped due to
        // not being able to unpause the loop

        // //check key input for pausing game
        // if(!this.gameOver && Phaser.Input.Keyboard.JustDown(keyP) && this.pausedMenu.alpha == 0){
        //     this.pausedMenu.alpha = 1;
        //     this.paused = true;
        //     this.scene.pause("playScene");
        // };

        // //check for key input to return to the game on PAUSE screen 
        // if(!this.gameOver && Phaser.Input.Keyboard.JustDown(keyP) && this.pausedMenu.alpha == 1 && this.paused == true){
        //     this.pausedMenu.alpha = 0;
        //     this.scene.run("playScene");
        // };
        // 
        // //check for key input to return to the menu on PAUSE screen 
        // if(!this.gameOver && Phaser.Input.Keyboard.JustDown(keyQ) && this.pausedMenu.alpha == 1 && this.paused == true){
        //     this.pausedMenu.alpha = 0;
        //     this.scene.run("menuScene");
    
    
        //check key input for restart on GAME OVER
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
            //this.sound.stop(); // a scrapped sound code for stopping background music.
            this.scene.restart('playScene');
            this.sound.play('select');
        };

        //check key input for return to menu on GAME OVER
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene"); 
            this.sound.play('select');
        };

        // Game Over scenerio
        if(this.timeLeft.text == 0){// check to see if timer is at 0 to initiate
            
            //reset dragon speed
            game.settings.dragonSpeed = this.speedKeeper;
            this.gOver.alpha = 1;
            this.gameOver = true;
        };
        
        //game updating when not game over
        if (!this.gameOver) {
            this.p1Arrow.update();  //update arrow sprite
            this.dragon00.update(); //update dragons (x4)
            this.dragon01.update();   
            this.dragon02.update();
            this.dragon03.update();
            this.updateTime(); //update the timer
            // this.updateHighScore(); update highest score
        };

        //Collision Check
        if(this.checkCollison(this.p1Arrow, this.dragon03)){ //blue dragon collision check
            this.p1Arrow.reset();
            this.dragonExplode(this.dragon03);
        };

        if(this.checkCollison(this.p1Arrow, this.dragon02)){ //red dragon collision check
            this.p1Arrow.reset();
            this.dragonExplode(this.dragon02);
        };

        if(this.checkCollison(this.p1Arrow, this.dragon01)){ //green dragon collsion check
            this.p1Arrow.reset();
            this.dragonExplode(this.dragon01);
        };

        if(this.checkCollison(this.p1Arrow, this.dragon00)){ //fire dragon collsion check
            this.p1Arrow.reset();
            this.dragonExplode(this.dragon00);
        };

        //30 Second Speed Up - Scrapped for interest of time.
        if(this.timeLeft.text <= 30 && this.timeLeft.text>= 1){
            game.settings.dragonSpeed = 10;
            this.dragon00.update();   //update dragons (x4)
            this.dragon01.update();  
            this.dragon02.update();
            this.dragon03.update();
        };

        
        // fire text box to be set to 'invisible', scrapped because it was
        // difficult to implement.
        // if(Phaser.Input.Keyboard.JustDown(keyF)){ //check to see if 'F' was pressed to set text to be 'invisible'
        //     this.fireText.alpha = 0;
        // };

        
        // Another bit of code that got modified was the timer. I couldn't figure out how to display the
        // old clock on the screen until it was too late. I then redesign it to work another way.
        // the bits of the original code got implemented into the Game over Scenerio.
    };
    /*********************************************************************************************************************************************************************************/


    
    /*********************************************************************************************************************************************************************************/
    
    /*************************************************/
    /******************Other Methods******************/
    /*************************************************/
    updateTime(){ // update the time
            this.displayTimeLeft -= 10;
            this.displayTimeLeft = Phaser.Math.FloorTo(this.displayTimeLeft, 0);
            this.timeLeft.text =  this.displayTimeLeft/1000;
            this.timeLeft.text = Phaser.Math.FloorTo(this.timeLeft.text, 0);
    };

    // this code block updates the highscore text on screen

    // updateHighScore(){
    //     if(this.p1Score > this.highestScore);
    //     this.highScore.text = this.p1Score;
    //     game.settings.highscore = this.highScore.text;
    //     //this.highestScore.text ;
    // };

    checkCollison(arrow, dragon) { // collision checker
        //simple AABB checking
        if(arrow.x < dragon.x + dragon.width &&
            arrow.x + arrow.width > dragon.x &&
            arrow.y < dragon.y + dragon.height &&
            arrow.height + arrow.y > dragon.y) {
                return true;
            } else {
                return false;
            };
    };

    dragonExplode(dragon) {// playing the the dragon animation upon arrow and dragon collision

        if(dragon == this.dragon01){ //green dragon
        //temp hide dragon
        dragon.alpha = 0;
        //create dragon explosion sprite at dragons location
        let boom = this.add.sprite(dragon.x, dragon.y, 'green-dragon').setOrigin(0, 0);
        boom.anims.play('green-death');             // play animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            dragon.reset();                       // reset dragon position
            dragon.alpha = 1;                     // remove explosion sprite
            boom.destroy();
        });
        } else if (dragon == this.dragon02){ //Red dragon
        //temp hide dragon
        dragon.alpha = 0;
        //create dragon explosion sprite at dragons location
        let boom = this.add.sprite(dragon.x, dragon.y, 'red-dragon').setOrigin(0, 0);
        boom.anims.play('red-death');             // play animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            dragon.reset();                       // reset dragon position
            dragon.alpha = 1;                     // remove explosion sprite
            boom.destroy();
        });
        } else if (dragon == this.dragon03){ //blue dragon
        //temp hide dragon
        dragon.alpha = 0;
        //create dragon explosion sprite at dragons location
        let boom = this.add.sprite(dragon.x, dragon.y, 'blue-dragon').setOrigin(0, 0);
        boom.anims.play('blue-death');             // play animation
        boom.on('animationcomplete', () =>{     // callback after anim completes
            dragon.reset();                       // reset dragon position
            dragon.alpha = 1;                     // remove explosion sprite
            boom.destroy();
        });
        }else { //fire dragon
            //temp hide dragon
            dragon.alpha = 0;
            //create dragon explosion sprite at dragons location
            let boom = this.add.sprite(dragon.x, dragon.y, 'fire-dragon').setOrigin(0, 0);
            boom.anims.play('fire-death');             // play animation
            boom.on('animationcomplete', () =>{     // callback after anim completes
                dragon.reset();                       // reset dragon position
                dragon.alpha = 1;                     // remove explosion sprite
                boom.destroy();
            });
        };

        //score add and repaint
        this.p1Score += dragon.points;
        this.scoreLeft.text = this.p1Score;

        

        
        

        // This is my first attempt at trying to play a random sound. It would eventually work
        // but i opted for Nathan's method from the AssetBonanza project (I figured this out prior
        // to him showing it off.)

        //play explosion sound on collision
        //let sounds = ['arrow1','arrow2','arrow3','arrow4'];
        //let choice = Phaser.Math.RND.picker(sounds);
        //this.sound.play(choice);

        // Play a random sound upon collision (the second method)
        let number = Phaser.Math.RND.integerInRange(0,3);
        switch(number){
            case 0:
                this.sound.play('arrow1');
                break;
            case 1:
                this.sound.play('arrow2');
                break;
            case 2:
                this.sound.play('arrow3');
                break;
            case 3:
                this.sound.play('arrow4');
                break;
        };
    };
    /*********************************************************************************************************************************************************************************/
};