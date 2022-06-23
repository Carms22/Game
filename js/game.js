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
        this.levelsIndex = 0;
        this.levels = [{
                name: "bat",
                img: "/img/enemigos/bat-rosa.png",
                health: 10,
                strength: 1,
                vx: -2,
                sound: "/sounds/bats.mp3"
            },
            {
                name: "ghost",
                img: "/img/enemigos/ghost.png",
                health: 15,
                strength: 3,
                vx: -3
            },
            {
                name: "thing",
                img: "/img/enemigos/mano.png",
                health: 20,
                strength: 4,
                vx: -2
            },
            {
                name: "bat_2",
                img: "/img/enemigos/bat_2.png",
                health: 30,
                strength: 10,
                vx: -5,
                sound: "/sounds/bats.mp3"
            }

        ]
        this.count = 0;

    }

    start() {
        this.intervalId = setInterval(() => {
            this.clear();
            this.draw();
            this.checkCollisions()
            this.move();
            this.tickObstacle++;
            this.tickEnemy++;

            if (this.tickObstacle % 300 === 0) {
                this.tick = 0
                this.obstacles = this.obstacles.filter(obs => obs.isVisible())
                this.addObstacle()
            };
            if (this.tickEnemy % 300 === 0) {
                this.tick = 0
                this.enemies = this.enemies.filter(en => en.isVisible())
                this.addEnemy()
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
        this.enemies.forEach(en => en.move())
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

        if (witchVsObs || witchVsEnemy || this.witch.y + this.witch.h >= this.ctx.canvas.height) {
            this.obstacles.forEach(obs => {
                setTimeout(this.witch.health -= obs.strength, 10000)

            })
            this.enemies.forEach(en => {
                setTimeout(this.witch.health -= en.strength, 10000)

            })

            this.enemies.forEach((en, eIndex) => {
                console.log(en);
                this.witch.weapon.bullets.forEach((bullet, BuIndex) => {
                    if (en.collide(bullet)) {
                        this.enemies[eIndex].health -= this.witch.strength;
                        console.log(this.enemies[eIndex].health);
                        if (this.enemies[eIndex].health <= 0) {
                            this.count += 1;
                            
                            //redEnemy??
                            this.enemies.splice(eIndex, 1)

                            if (this.count >= 5) {
                                // levelUp!!! new enemy
                                this.levelsIndex += 1;
                            }

                        }
                        this.witch.weapon.bullets.splice(BuIndex, 1);
                    }

                })




            })


        }


    }

    addObstacle() {
        this.obstacles.push(new Obstacle(this.ctx))

    }
    clearObstacles() {
        this.obstacles = this.obstacles.filter(() => {
            return this.obstacles.isVisible
        })
    }
    
    addEnemy() {
        this.enemies.push(new Enemy(
            this.ctx,
            this.levels[this.levelsIndex].name,
            this.levels[this.levelsIndex].img,
            this.levels[this.levelsIndex].health,
            this.levels[this.levelsIndex].strength,
            this.levels[this.levelsIndex].vx,
            this.levels[this.levelsIndex].sound))
        
    }
    clearEnemy() {
        this.enemies = this.enemies.filter(() => {
            return this.enemies.isVisible
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