class FastDragon extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        scene.add.existing(this);                       //add to an existing scene
        this.points = pointValue;                       //store point value
        this.moveSpeed = game.settings.dragonSpeed * 1.5;  //pixels per frame
        
        
    };

    /*********************************************************************************************************************************************************************************/
    update() {
        //move spaceshop left
        this.x -= this.moveSpeed;
        //wrap around from left to right edge
        if(this.x <= 0 - this.width){
            this.reset();
        };
    };
    /*********************************************************************************************************************************************************************************/

    //position reset
    reset(){
        this.x = game.config.width;
    };

};