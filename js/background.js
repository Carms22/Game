class Background {
    constructor(ctx,img) {
      this.ctx = ctx,
      this.x = 0;
      this.y = 0;
      this.vx = -1;
      this.img = new Image();
      this.img.src = img;
      this.w = this.ctx.canvas.width;
      this.h = this.ctx.canvas.height;
    }
  
    draw() {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      )
  
      this.ctx.drawImage(
        this.img,
        this.x + this.ctx.canvas.width,
        this.y,
        this.w,
        this.h
      )
    }
  
    move() {
      this.x += this.vx
      if (this.x + this.w <= 0) {
        this.x = 0
      }
    }
  }