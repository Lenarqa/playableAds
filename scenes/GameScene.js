class GameScene extends Phaser.Scene{
    constructor(){
        super('Game');
    }

    preload(){
        this.load.image('molotov', '/assets/img/logo/molotov1.png');
        this.load.image('molotov_logo', '/assets/img/logo/molotov_logo.png');

        this.load.image('wolee', '/assets/img/logo/wolee.png');
        this.load.image('wolee_logo', '/assets/img/logo/wolee_logo.png');

        this.load.image('yang', '/assets/img/logo/yang.png');
        this.load.image('yang_logo', 'assets/img/logo/yang_logo.png');

        this.load.image('blkCrown', '/assets/img/logo/blkCrown.png');
        this.load.image('blkCrown_logo', 'assets/img/logo/blkCrown_logo.png');

        this.load.image('medooza', '/assets/img/logo/medooza.png');
        this.load.image('medooza_logo', 'assets/img/logo/medooza_logo.png');

        this.load.image('sword', '/assets/img/logo/sword.png');
        this.load.image('sword_logo', 'assets/img/logo/sword_logo.png');
        
        this.load.image('question', 'assets/img/question.png');
        
        this.load.audio('overlapSound', 'assets/sound/jump01.wav');
        this.load.audio('winSound', 'assets/sound/Win_sound.wav');
    }

    create(){
        this.score = 0;
        this.rotateNow = false;
        this.cameras.main.setBackgroundColor(0xbababa);//change BG 
        let showQuestionText = false;

        let question = this.add.image(this.game.renderer.width * 0.05, this.game.renderer.height * 0.05, 'question');

        let molotov = this.physics.add.sprite(this.game.renderer.width / 7, this.game.renderer.height * 0.9, 'molotov');
        let molotov_logo = this.physics.add.sprite(this.game.renderer.width / 7, this.game.renderer.height * 0.1, 'molotov_logo');
        
        
        let wolee = this.physics.add.sprite(this.game.renderer.width / 2.3, this.game.renderer.height * 0.9, 'wolee');
        let wolee_logo = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.1, 'wolee_logo');

        let yang = this.physics.add.sprite(this.game.renderer.width / 1.3, this.game.renderer.height * 0.9, 'yang');
        let yang_logo = this.physics.add.sprite(this.game.renderer.width / 6, this.game.renderer.height * 0.4, 'yang_logo');

        let blkCrown = this.physics.add.sprite(this.game.renderer.width / 1.3, this.game.renderer.height * 0.75, 'blkCrown');
        let blkCrown_logo = this.physics.add.sprite(this.game.renderer.width / 1.15, this.game.renderer.height * 0.1, 'blkCrown_logo');

        let medooza = this.physics.add.sprite(this.game.renderer.width / 2.2, this.game.renderer.height * 0.75, 'medooza');
        let medooza_logo = this.physics.add.sprite(this.game.renderer.width / 1.15, this.game.renderer.height * 0.4, 'medooza_logo');

        let sword = this.physics.add.sprite(this.game.renderer.width / 7, this.game.renderer.height * 0.75, 'sword');
        let sword_logo = this.physics.add.sprite(this.game.renderer.width / 2, this.game.renderer.height * 0.4, 'sword_logo');

        this.loadingSprite = this.add.sprite(this.game.renderer.width / 2, this.game.renderer.height / 1.75, 'loading');
        this.dogLogo = this.add.image(this.game.renderer.width / 8, this.game.renderer.height / 1.6, "dogLogo");

        let questionText = this.add.text(this.game.renderer.width / 5, this.game.renderer.height / 1.9, "Соотнесите логитип и \nназвание бренда!", {font:"30px Arial", fill:"yellow"});

        //question and questionText
        question.setDepth(2);
        question.setInteractive();
        questionText.setVisible(false);

        //doglogo
        this.dogLogo.setScale(0.1);
        this.dogLogo.setVisible(false);
        
        //loading 
        this.loadingSprite.setVisible(false);
        this.loadingSprite.setScale(2);

        //logo
        molotov.setScale(0.5);
        molotov.setInteractive();
        molotov.name = "molotov";
        molotov_logo.name = "molotov";
        
        wolee.setScale(0.7);
        wolee.setInteractive();
        wolee.name = "wolee";
        wolee_logo.name = "wolee";
        
        yang.setScale(0.7);
        yang_logo.setScale(0.4);
        yang.setInteractive();
        yang.name = "yang";
        yang_logo.name = "yang";

        blkCrown.setScale(0.6);
        blkCrown_logo.setScale(0.2);
        blkCrown.setInteractive();
        blkCrown.name = "blkCrown";
        blkCrown_logo.name = "blkCrown";

        medooza.setScale(0.3);
        medooza_logo.setScale(0.8);
        medooza.setInteractive();
        medooza.name = "medooza";
        medooza_logo.name = "medooza";

        sword.setScale(0.2);
        sword_logo.setScale(0.25);
        sword.setInteractive();
        sword.name = "sword";
        sword_logo.name = "sword";


        //setCollideWorldBounds
        molotov.setCollideWorldBounds();
        wolee.setCollideWorldBounds();
        yang.setCollideWorldBounds();
        blkCrown.setCollideWorldBounds();
        medooza.setCollideWorldBounds();
        sword.setCollideWorldBounds();
        
        //setDraggble
        this.input.setDraggable(molotov);
        this.input.setDraggable(wolee);
        this.input.setDraggable(yang);
        this.input.setDraggable(blkCrown);
        this.input.setDraggable(medooza);
        this.input.setDraggable(sword);

        question.on('pointerdown',()=>{
            console.log("you click question");
            if(!showQuestionText){
                showQuestionText = true;
                questionText.setVisible(true);
            }else{
                questionText.setVisible(false);
                showQuestionText = false;
            }

        });

        this.input.on('drag', function (pointer, gameObject, dragX, dragY){
            gameObject.x = dragX;
            gameObject.y = dragY;
        });        

        this.physics.add.overlap(molotov, molotov_logo, ()=>{
            this.overlaps(molotov, molotov_logo);
        }, null, this);

        this.physics.add.overlap(wolee, wolee_logo, ()=>{
            this.overlaps(wolee, wolee_logo);
        }, null, this);

        this.physics.add.overlap(yang, yang_logo, ()=>{
            this.overlaps(yang, yang_logo);
        }, null, this);

        this.physics.add.overlap(blkCrown, blkCrown_logo, ()=>{
            this.overlaps(blkCrown, blkCrown_logo);
        }, null, this);

        this.physics.add.overlap(medooza, medooza_logo, ()=>{
            this.overlaps(medooza, medooza_logo);
        }, null, this);

        this.physics.add.overlap(sword, sword_logo, ()=>{
            this.overlaps(sword, sword_logo);
        }, null, this);
    }

    

    overlaps(obj1, obj2){
        if(!obj1.hasOverlapped && !obj2.hasOverlapped){
            if(obj1.name = obj2.name){
                obj1.hasOverlapped = obj2.hasOverlapped = true;
                obj1.setVisible(false);
                obj2.setVisible(false);
                this.score++;
                console.log(this.score);
                this.sound.play('overlapSound',{
                    volume: 0.1,
                    loop: false
                });
                if(this.score == 6){
                    this.sound.stopAll();
                    this.sound.play('winSound', {
                        volume: 0.5,
                        loop: false
                    });
                    this.add.text(this.game.renderer.width / 3, this.game.renderer.height / 2.5, "You win!", {font:"45px Arial", fill:"yellow"});
                    this.loadingSprite.setVisible(true);
                    this.loadingSprite.play('loadingAnim');
                    this.rotateNow = true;
                    this.dogLogo.setVisible(true);
                    setTimeout(this.openGameScene.bind(this), 2000);
                }
            }
        }
        
    }

    openGameScene(){
        console.log("Next scene");
        this.scene.start('Menu');
    }

    update(){
        if(this.rotateNow){
            this.dogLogo.rotation += 0.05;
        }
    }
}