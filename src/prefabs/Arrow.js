// Arrow (player) prefab
class Arrow extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add object to the existing scene
        scene.add.existing(this);
        this.isFiring = false;  // track the arrow firing status
        this.moveSpeed = 2;     // arrow movement pixels per frame

        //add arrow sfx
        this.sfxArrow = scene.sound.add('arrowLaunch');
    };

    /*********************************************************************************************************************************************************************************/
    update(){
        // left and right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= borderUISize + this.width){
                this.x -= this.moveSpeed;
            } else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width){
                this.x += this.moveSpeed;
            };
        };

        //fire button
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxArrow.play(); //play arrow sfx
            
        };

        //if fired, move the arrow up
        if(this.isFiring && this.y >= borderUISize * 3 + borderPadding){
            this.y -= this.moveSpeed;
        };

        //reset on miss
        if(this.y <= borderUISize * 3 + borderPadding) {
            this.reset();
        };

    };
    /*********************************************************************************************************************************************************************************/

    //reset arrow to "ground"
    reset(){
        this.isFiring = false;
        this.y = game.config.height - borderUISize - borderPadding*3;
    };


};