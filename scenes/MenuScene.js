class MenuScene extends Phaser.Scene {
    constructor(){
        super("Menu");
    }
    
    preload(){
        this.load.image('dogLogo', 'assets/img/dogLogo.png');
        this.load.image('mainLogo', 'assets/img/mainLogo.png');
        this.load.image('playBtn', 'assets/img/play_button.png');
        this.load.image('sound_on', 'assets/img/sound_on.png');
        this.load.image('sound_off', 'assets/img/sound_off.png');

        this.load.audio('mainSound', 'assets/sound/mainSound.mp3');

        this.load.spritesheet("loading", 'assets/sprite/loading.png', {
            frameHeight: 64,
            frameWidth: 128
        })
    }

    create(){
        //this.scene.start('Game'); 
        this.dogLogo = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.45, "dogLogo");
        let playBtn = this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.75, "playBtn");
        let loadingSprite = this.add.sprite(this.dogLogo.x, this.dogLogo.y * 1.6, 'loading');
        let sound_on = this.add.image(this.game.renderer.width / 10.5, this.game.renderer.height * 0.15, "sound_on");
        let sound_off = this.add.image(this.game.renderer.width / 10.55, this.game.renderer.height * 0.155, "sound_off");
        
        
        this.add.image(this.game.renderer.width / 2, this.game.renderer.height * 0.15, "mainLogo").setScale(0.2);
        
        //sound_on and sound_off
        sound_on.setScale(0.4);
        sound_on.setInteractive();
        sound_off.setVisible(false);

        sound_off.setScale(0.4);
        sound_off.setInteractive();
        
        sound_off.on('pointerdown', ()=>{
            sound_off.setVisible(false);
            sound_on.setVisible(true);
            this.sound.stopAll();
        });
        
        sound_on.on('pointerdown', ()=>{
            sound_on.setVisible(false);
            sound_off.setVisible(true);
            this.sound.play('mainSound', {
                volume: 0.3,
                loop: true
            });      
        });


        //loading sprite
        loadingSprite.setScale(2);
        loadingSprite.setVisible(false);

        this.anims.create({
            key:"loadingAnim",
            frameRate: 5,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('loading',{
                frames:[0,1,2,3]
            })
        });

        //dog Logo work
        this.dogLogo.setScale(0.17);
        this.rotateNow = false;

        //Play btn
        playBtn.setInteractive();
        playBtn.setScale(1.5);

        playBtn.on('pointerover', ()=>{
            playBtn.setTint(0x808080);
        });

        playBtn.on('pointerout', ()=>{  
            if (playBtn.isTinted)
            {
                playBtn.clearTint();
            }
        });

        playBtn.on('pointerdown', ()=>{
            console.log("Next lvl!");
            this.rotateNow = true;
            playBtn.setVisible(false);
            loadingSprite.setVisible(true);
            loadingSprite.play('loadingAnim');
            setTimeout(this.openGameScene.bind(this), 2000);
        });        
    }

    openGameScene(){
        console.log("Next scene");
        this.scene.start('Game');
    }

    update(){
        if(this.rotateNow){
            this.dogLogo.rotation += 0.05;
        }  
    }
}