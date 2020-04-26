var config = {
    width: 500,
    height: 500,
    scene: [MenuScene, GameScene],
    parent: 'game',
    physics: {
        default: "arcade",
    }
}

var game = new Phaser.Game(config);
