class Weapon {
    constructor(shooter) {
      this.ctx = shooter.ctx
      this.isReloading = false
      this.shooter = shooter
      this.bullets = []
    }
  
    shoot() {
      if(!this.isReloading){
        this.bullets.push(new Bullet(this.ctx, this.shooter.y + (this.shooter.h / 2), this.shooter.x + this.shooter.w / 2))
        this.isReloading = true
  
        setTimeout(() => {
          this.isReloading = false
        }, 500)
      }
    }
  
    clearBullets() {
      this.bullets = this.bullets.filter(bullet => {
        return bullet.isVisible()
      })
      
    }
  
    draw() {
      this.bullets.forEach(bullet => {
        bullet.draw()
      })
    }
  
    move() {
      this.bullets.forEach(bullet => {
        bullet.move()
      })
    }
  }