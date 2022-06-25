class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.witch = new Witch(this.ctx);
        this.background = new Background(this.ctx);
        this.obstacles = [];
        this.enemies = [];
        this.tickObstacle = 0
        this.tickEnemy = 0;
        this.levelUp=5;
        this.levelsIndex = 0;
        this.levels = [{
                name: "bat",
                img: "/img/enemigos/bat-rosa.png",
                health: 10,
                strength: 1,
                vx: -2,
                h: 75,
                witch: this.witch,
                sound: "/sounds/bats.mp3"
            },
            {
                name: "ghost",
                img: "/img/enemigos/ghost.png",
                health: 15,
                strength: 3,
                vx: -3,
                h: 75,
                witch: this.witch
            },
            {
                name: "thing",
                img: "/img/enemigos/mano.png",
                health: 20,
                strength: 4,
                vx: -2,
                h: 200,
                witch: this.witch
            },
            {
                name: "bat_2",
                img: "/img/enemigos/bat_2.png",
                health: 30,
                strength: 10,
                vx: -5,
                h: 75,
                witch: this.witch,
                sound: "/sounds/bats.mp3"
            }

        ]
        this.count = 0;
        this.totalCount = 0;

    }
       

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.checkCollisions()
            this.move();
            this.tickObstacle++;
            this.tickEnemy++;

            if (this.tickObstacle % 500 === 0) {
                this.tick = 0
                this.obstacles = this.obstacles.filter(obs => obs.isVisible())
                this.addObstacle()
            };
            if (this.tickEnemy % 200 === 0) {
                this.tick = 0
                this.enemies = this.enemies.filter(en => en.isVisible())
                this.addEnemy()
            }
            this.score();
        }, 1000 / 60)
    }

    clear() {
        this.ctx.clearRect(
            0,
            0,
            this.ctx.canvas.width,
            this.ctx.canvas.height
        )
        this.witch.weapon.clearBullets()

    }


    move() {
        this.background.move()
        this.witch.move()
        this.obstacles.forEach(obs => obs.move())
        if(this.levelUp< 4){
            console.log("entro a draw");
            this.enemies.forEach(en => en.move())
        } else {
            console.log("ahora al else");
            
            this.enemies.forEach(en => en.moveWithIA())
        }
    }

    draw() {
        this.background.draw()
        this.witch.draw()
        this.obstacles.forEach(obs => obs.draw())
        this.enemies.forEach(en => {
            en.sound.play()
            en.draw()
        })
    }

    checkCollisions() {
        let witchVsObs = this.obstacles.find(obs => obs.collide(this.witch))
        let witchVsEnemy = this.enemies.find(en => en.collide(this.witch))

        if(witchVsObs && !this.witch.receivingDamage) {
            this.witch.health -= witchVsObs.strength;
            this.witch.receivingDamage = true;
            
            setTimeout(() => {
                this.witch.receivingDamage = false;
            }, 1000);
        }

        if(witchVsEnemy && !this.witch.receivingDamage) {
            this.witch.health -= witchVsEnemy.strength;
            this.witch.receivingDamage = true;
            setTimeout(() => {
                this.witch.receivingDamage = false;
            }, 1000);
        }

        if (this.witch.y + this.witch.h >= this.ctx.canvas.height) {
            this.witch.health -= 1;
        }

       this.enemies.forEach((en, eIndex) => {
            this.witch.weapon.bullets.forEach((bullet, BuIndex) => {
                if (en.collide(bullet)) {
                    this.witch.weapon.bullets.splice(BuIndex, 1);
                    en.health -= this.witch.strenght;
                    if (en.health <= 0) {
                        this.count += 1;
                        this.totalCount += 1;
                        this.enemies.splice(eIndex, 1)
                        if (this.count >= 1) {
                            // levelUp!!! new enemy
                            this.levelUp += 1;
                            this.levelsIndex += 1;
                            this.count = 0;
                            if (this.levelsIndex >= 4) {
                                this.levelsIndex = 0;
                            }
                        }
                    }
                }
            })
        })
    }

    addObstacle() {
        this.obstacles.push(new Obstacle(this.ctx))
    }
    
    addEnemy() {
        this.enemies.push(new Enemy(
            this.ctx,
            this.levels[this.levelsIndex].name,
            this.levels[this.levelsIndex].img,
            this.levels[this.levelsIndex].health,
            this.levels[this.levelsIndex].strength,
            this.levels[this.levelsIndex].vx,
            this.levels[this.levelsIndex].h,
            this.levels[this.levelsIndex].witch,
            this.levels[this.levelsIndex].sound))

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
    score() {
        this.ctx.font = "20px Arial"
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Points:${this.totalCount}`, 50, 20);
        this.ctx.fillText(`Life:${this.witch.health}`, 50, 50);
        this.ctx.fillText(`level:${this.levelsIndex}`, 50, 80);
    }
}