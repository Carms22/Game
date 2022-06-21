class Bullet {
    constructor(ctx, y, x) {
      this.ctx = ctx
      this.y = y
      this.x = x
      this.vx = 5
      this.img = new Image();
      this.img.src="/img/"
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
        
        //this.animate()
    }
    move() {
      this.x += this.vx
    }
  
    isVisible() {
      return this.x <= this.ctx.canvas.width
    }
  }