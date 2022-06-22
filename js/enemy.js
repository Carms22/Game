class Enemy {
    constructor(ctx,img,strength) {
        this.ctx = ctx;
        this.x = this.ctx.canvas.width - 100;
        this.y = -75;
        this.w = 100;
        this.h = 250;
        this.img = new Image();
        this.img.src = img;
        this.img.frames = 4;
        this.img.frameIndex = 0;
        this.tick=0;
        this.strength=strength;
        this.vx = -2;
    }

    move() {
        this.x += this.vx;
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