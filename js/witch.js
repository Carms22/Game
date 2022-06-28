class Witch {
    constructor(ctx) {
        this.ctx = ctx;
        this.w = 75;
        this.h = 50;
        this.x = 50;
        this.y = (this.ctx.canvas.height / 2) - this.h / 2;
        this.vx = 0;
        this.vy = 0;
        this.g = 0.02;
        this.actions = {
            up: false,
            down: false,
            right: false,
            left: false,
            shoot: false,
        }
        this.health = 200;
        this.strenght = 10;

        this.img = new Image();
        this.img.src = "/img/bruja-removebg-preview.png";
        this.img.frames = 4;
        this.img.yFrames = 2;
        this.img.frameIndex = 0;
        this.img.yFrameIndex=0;
        this.tick = 0;
        this.setListeners()
        this.weapon = new Weapon(this);
        this.sound = new Audio();
        this.sound.src = '/sounds/witch-laugh.mp3';
        this.soundCat= new Audio();
        this.soundCat.src= "/sounds/cats.mp3";
        this.receivingDamage = false;
        this.isSound=false;
    }

    draw() {
        if(this.receivingDamage) {
            this.img.yFrameIndex = 1;
        } else {
            this.img.yFrameIndex = 0;
        }

        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            this.img.yFrameIndex * this.img.height / this.img.yFrames,
            this.img.width / this.img.frames,
            this.img.height / this.img.yFrames,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.weapon.draw()
        this.animate()
    }

    isFloor() {
        return this.y + this.h >= this.ctx.canvas.height;
    }
    isCeiling() {
        return this.y <= 0;
    }

    move() {
        this.applyActions()
        this.vy += this.g;
        this.y += this.vy;
        this.x += this.vx;
        if (this.isFloor()) {
            this.y = (this.ctx.canvas.height) - this.h;
            this.vy = 0;
        }
        if (this.isCeiling()) {
            this.vy = 0;
        }
        if (this.x <= 0) {
            this.vx = 0, 1;
        }
        this.weapon.move()
    }


    animate() {
        this.tick++
        if (this.tick >= 10) {
            this.tick = 0
            this.img.frameIndex++
        }
        if (this.img.frameIndex >= this.img.frames) {
            this.img.frameIndex = 0;
        }
    }

    setListeners() {
        document.onkeydown = e => this.switchAction(e.code, true)
        document.onkeyup = e => this.switchAction(e.code, false)
    }

    applyActions() {
        if (this.y >= 0 && this.actions.up) {
            this.vy += -0.3
        }
        else if (this.actions.down) {
            this.vy += 0.2
            this.sound.play()
        }
        else if (this.actions.right) {
            this.vx += 0.5
        }
        else if (this.actions.left) {
            this.vx += -0.5
        }
        else{
            this.vx=0;
        }
        if (this.actions.shoot) {
            this.weapon.shoot()          
        }

    }

    switchAction(key, apply) {
        switch (key) {
            case UP:
                this.actions.up = apply;
                break;
            case DOWN:
                this.actions.down = apply;
                break;
            case RIGHT:
                this.actions.right = apply;
                break;
            case LEFT:
                this.actions.left = apply;
                break;
            case ALT:
                if(!this.isSound){
                    this.isSound=true;
                    this.soundCat.play();
                    setTimeout(()=>{ 
                        this.isSound=false;
                    },1000)
                    
                }
                
                this.actions.shoot = apply;
                break;
        }
    }
   
}