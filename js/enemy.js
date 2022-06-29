class Enemy {
    constructor(ctx,name,img,health,strength,vx,h,witch,points, sound = null) {
        this.ctx = ctx;
        this.witch =witch;
        this.name =name;
        this.x = this.ctx.canvas.width;
        this.y = Math.random()* 200 + 100;
        this.w = 150;
        this.h = h;
        this.img = new Image();
        this.img.src = img;
        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.tick=0;
        this.strength = strength;
        this.health = health;
        this.vx = vx;
        this.vy= 2;
        this.points=points;
        this.disappear= new Disappear(this);
        this.sound = sound ? new Audio() : null;
        if(this.sound) {
            this.sound.src = sound;
        }
    }

    move() {
        this.x += this.vx;
    }

    moveWithIA() {      
        if(this.x > this.witch.x) {
            if(this.y > this.witch.y){
                this.y -= this.vy;
            }
            if(this.y < this.witch.y){
                this.y += this.vy;
            }
        }
        this.move();
    }
   
    collide(el) {
        const collideX = el.x + el.w > this.x && el.x < this.x + this.w
        const collideY = el.y < this.y + this.h && el.y + el.h > this.y
        return collideX && collideY
    }

    draw() {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * this.img.width / this.img.frames,
            0,
            this.img.width / this.img.frames,
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )
        this.animate()
    }
  
    animate() {
        this.tick++
        if(this.tick >= 10) {
          this.tick = 0
          this.img.frameIndex++
          }
        if(this.img.frameIndex >= this.img.frames){
          this.img.frameIndex = 0;
        }
    }
    isVisible() {
        return this.x  >= 0;
    }

}