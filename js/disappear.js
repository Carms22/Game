class Disappear {
  constructor(enemy) {
    this.ctx = ctx;
    this.x = enemy.x;
    this.y = enemy.y;
    this.w = enemy.w;
    this.h = enemy.h;
    this.img = new Image();
    this.img.src = "./img/Exp/Expl-yellow.png";
    this.img.frameIndex = 0;
    this.img.frames = 6;
    this.tick = 0;
    this.sound = new Audio();
    this.sound.src = "";
    this.isVisible = false;
    this.animationEnded = false;
  }
  draw() {
    this.ctx.drawImage(
      this.img,
      (this.img.frameIndex * this.img.width) / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    );
    this.animate();
  }

  animate() {
    this.tick++;
    if (this.tick >= 10) {
      this.tick = 0;
      this.img.frameIndex++;
    }
    if (this.img.frameIndex >= this.img.frames) {
      this.animationEnded = true;
    }
  }
  isVisible() {
    return this.x >= 0;
  }
}
