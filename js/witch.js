class Witch {
    constructor(ctx) {
      this.ctx = ctx;
      this.w = 75;
      this.h = 50;
      this.x = 50;
      this.y = (this.ctx.canvas.height / 2) - this.h / 2;
      this.vy = 0;
      //this.g =  0.098;
      this.actions =  {
        up : false,
        right: false,
        left: false,
        shoot : false,
      }
      
      this.img = new Image();
      this.img.src = "/img/bruja_move-removebg-preview.png";
      this.img.frames = 4;
      this.img.frameIndex = 0;
      this.tick = 0;
      this.setListeners()
      //this.weapon = new Weapon(this);
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
      //this.weapon.draw()
      this.animate()
    }
  
    isFloor() {
      return this.y + this.h >= this.ctx.canvas.height - FLOOR; 
    }
    /*
    move() {
      this.applyActions()
      this.vy += this.g;
      this.y += this.vy;
      if(this.isFloor()) {
        this.y = (this.ctx.canvas.height - FLOOR) - this.h;
        this.vy = 0;
      }
      //this.weapon.move()
    }
    */
  
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
  
    setListeners() {
      document.onkeydown = e => this.switchAction(e.keyCode, true)
      document.onkeyup = e => this.switchAction(e.keyCode, false)
    }
  
    applyActions() {
      if(this.y >= 0 && this.actions.up) {
        this.vy += -0.4
      }
      /*if(this.actions.right) {
        this.vx = 1
      }
      if(this.actions.left) {
        this.vx = -1
      
      if(this.actions.shoot){
         this.weapon.shoot()
      }
      }*/
    }
  /*
    switchAction(key, apply) {
      switch(key) {
        case UP:
          this.actions.up = apply;
          break;
        case RIGHT:
          this.actions.right = apply;
          break;
        case LEFT:
          this.actions.left = apply;
          break;
        case SPACE:
          this.actions.shoot = apply;
          break;
      }
    }
    */
  }