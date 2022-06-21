class Game {
    constructor(ctx){
      this.ctx = ctx;
      this.intervalId = null;
      this.witch = new Witch(this.ctx);
      this.background = new Background(this.ctx);
      this.obstacles = [];
      this.tickObstacle = 0
      
    }
  
    start() {
      this.intervalId = setInterval(() => {
        this.clear();
        this.draw();
        this.checkCollisions()
        this.move();
        this.tickObstacle++;
  
        if (this.tickObstacle % 200 === 0) {
            this.tick = 0
            this.obstacles = this.obstacles.filter(obs => obs.isVisible())
            this.addObstacle()
          }
        
      }, 1000 / 60)
    }
  
    clear() {
      this.ctx.clearRect(
        0,
        0,
        this.ctx.canvas.width,
        this.ctx.canvas.height
      )
    }
  
  
    move() {
      this.background.move()
      this.witch.move()
      this.obstacles.forEach(obs => obs.move())
    }
    
    draw() {
      this.background.draw()
      this.witch.draw()
      this.obstacles.forEach(obs => obs.draw())
     
    }
  
    checkCollisions() {
      let witchVsObs = this.obstacles.find(obs => obs.collide(this.witch))
      
      if (witchVsObs || this.witch.y + this.witch.h >= this.ctx.canvas.height)  {
       // this.gameOver()
      }  
    }
  
    addObstacle() {
      this.obstacles.push(new Obstacle(this.ctx))
     
    }
    clearObstacles() {
        this.obstacles = this.obstacles.filter (() => {
        return this.obstacles.isVisible
        })
      }
  /*
    gameOver() {
      clearInterval(this.intervalId);
      this.intervalId = null
  
      this.ctx.font = "30px Arial";
  this.ctx.fillStyle = "red";
  this.ctx.textAlign = "center";
  this.ctx.fillText("GAME OVER", this.ctx.canvas.width/2, this.ctx.canvas.height/2);
    } 
     */ 
  }
 