// game configuration
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Boot, Menu, Play],   
}

let game =  new Phaser.Game(config);

//set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let sunSpeed = .02; //speed that the sun will go
let cloudSpeed = .25; //speed that the clouds will go

// reserve keyboard bindings
let keyB, keyF, keyR, keyLEFT, keyRIGHT, key1, key2;

//scrapped keys used to pause the game
// let keyP, keyQ;






//List of Mod implementations
/* 
Starting Tier
Implement the speed increase that happens after 30 seconds in the original game (5) --- Everything 

Novice Tier
Create 4 new explosion SFX and randomize which one plays on impact (10) --- Random Arrow Impacts
Display the time remaining (in seconds) on the screen (10) --- Timer Works
Create a new title screen (e.g., new artwork, typography, layout) (10)
Implement parallax scrolling (10) --- Sun and clouds

Intermediate Tier
Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20) --- Fire Dragon

S(hrek) Tier
Redesign the game's artwork, UI, and sound to change its theme/aesthetic (to something other than sci-fi) (60) --- Medevil Fantasy

Other
Boot Menu with Old team logo 
*/

// Time spent on Project
/*
Creating Assets: 6 hrs
Finding and Modifiying Assets (Credit found in README.txt): 2 hrs
Writing Working Code (and Debugging): 6 hrs
Writing Failure Code (and Debugging): 12 hrs
Playtesting: 4 hrs

Grand Total: 30 hrs

*/
