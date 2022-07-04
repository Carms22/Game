class Champion{
    constructor(ctx,witch){
        this.ctx=ctx;
        this.witch =witch;
        this.x = this.ctx.canvas.width;
        this.y = Math.random()* 200 + 100;
        this.w = 150;
        this.h = 200;
        this.img = new Image();
        this.img.src = "./img/enemigos/champion.png";
        this.img.frames = 6;
        this.img.frameIndex = 0;
        this.tick=0;
        this.strength = 10;
        this.health = 160;
        this.vx = 2;
        this.vy= 2;
        this.points=7;
    }
    
    move() { 
        if(this.y > this.witch.y){
            this.y -= this.vy;
        }
        if(this.y < this.witch.y){
            this.y += this.vy;
        }     
        if(this.x  > this.witch.x) {
            this.x-=this.vx;
        }
        if(this.x< this.witch.x){
            this.x+=this.witch.x
        }
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
