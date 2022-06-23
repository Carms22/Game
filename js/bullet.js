class Bullet {
    constructor(ctx, y, x) {
      this.ctx = ctx
      this.y = y
      this.x = x
      this.w=60;
      this.h=30;
      this.vx = 5
      this.img = new Image();
      this.img.src="/img/cat/cat.png";
      this.img.frameIndex=0;
      this.img.frames=3;
      this.sound = new Audio();
      this.sound.src="/sounds/cats.mp3";
      this.tick = 0;
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
    move() {
      this.x += this.vx
    }
 
  
    isVisible() {
        this.sound.play()
      return this.x <= this.ctx.canvas.width
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
  }