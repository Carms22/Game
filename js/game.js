class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalId = null;
        this.witch = new Witch(this.ctx);
        this.obstacles = [];
        this.enemies = [];
        this.disappears = [];
        this.tickObstacle = 0
        this.tickEnemy = 0;
        this.levelUp = 0;
        this.enIndex = 0;
        this.arrayIndex = 0;
        this.backgroundImg = [
            "/img/background/Niebla_2.png",
            "/img/background/BackGPink.png",
            "/img/background/BackGroundVerde.png",
            "/img/background/BackGroundGris.png"
        ]
        this.background = new Background(this.ctx, this.backgroundImg[this.levelUp]);
        this.arrayEnemies = [
            [{
                    name: "bat",
                    img: "/img/enemigos/bat-rosa.png",
                    health: 10,
                    strength: 1,
                    vx: -2,
                    h: 75,
                    witch: this.witch,
                    points: 1,
                    sound: "/sounds/bats.mp3"
                },
                {
                    name: "ghost",
                    img: "/img/enemigos/ghost.png",
                    health: 15,
                    strength: 3,
                    vx: -3,
                    h: 75,
                    witch: this.witch,
                    points: 2,
                }

            ],
            [{
                    name: "thing",
                    img: "/img/enemigos/mano.png",
                    health: 20,
                    strength: 4,
                    vx: -2,
                    h: 200,
                    witch: this.witch,
                    points: 2,
                },
                {
                    name: "bat_2",
                    img: "/img/enemigos/bat_2.png",
                    health: 30,
                    strength: 10,
                    vx: -5,
                    h: 75,
                    witch: this.witch,
                    points: 3,
                    sound: "/sounds/bats.mp3"
                }
            ],
            [{
                    name: "gargola",
                    img: "/img/enemigos/gargolas-removebg-preview.png",
                    health: 10,
                    strength: 3,
                    vx: -4,
                    h: 75,
                    witch: this.witch,
                    points: 4,
                    sound: "/sounds/bats.mp3"
                },
                {
                    name: "Pig",
                    img: "/img/enemigos/Pig-removebg-preview.png",
                    health: 30,
                    strength: 5,
                    vx: -5,
                    h: 75,
                    witch: this.witch,
                    points: 4,
                },

            ],
            [{
                    name: "Dead",
                    img: "/img/enemigos/Muerte-removebg-preview.png",
                    health: 30,
                    strength: 7,
                    vx: -7,
                    h: 75,
                    witch: this.witch,
                    points: 5,
                },
                {
                    name: "Tree",
                    img: "/img/enemigos/arbol-removebg-preview.png",
                    health: 30,
                    strength: 10,
                    vx: -8,
                    h: 100,
                    witch: this.witch,
                    points: 5,
                    sound: "/sounds/bats.mp3"
                }

            ]

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
        this.disappears = this.disappears.filter(el => !el.animationEnded);
    }


    move() {
        this.background.move()
        this.witch.move()
        this.obstacles.forEach(obs => obs.move())
        if (this.levelUp < 4) {
            this.enemies.forEach(en => en.move())
        } else {
            this.enemies.forEach(en => en.moveWithIA())
        }
    }

    draw() {
        this.background.draw()
        this.witch.draw()
        this.obstacles.forEach(obs => obs.draw())
        this.disappears.forEach(dis => dis.draw())
        this.enemies.forEach(en => {
            en.sound?.play()
            en.draw()
        })
    }

    checkCollisions() {
        let witchVsObs = this.obstacles.find(obs => obs.collide(this.witch))
        let witchVsEnemy = this.enemies.find(en => en.collide(this.witch))

        if (witchVsObs && !this.witch.receivingDamage) {
            this.witch.health -= witchVsObs.strength;
            this.witch.receivingDamage = true;
            setTimeout(() => {
                this.witch.receivingDamage = false;
            }, 1000);
        }

        if (witchVsEnemy && !this.witch.receivingDamage) {
            this.witch.health -= witchVsEnemy.strength;
            this.witch.receivingDamage = true;
            setTimeout(() => {
                this.witch.receivingDamage = false;
            }, 1000);
        }

        if (this.witch.y + this.witch.h >= this.ctx.canvas.height && !this.witch.receivingDamage) {
            this.witch.health -= 1;
            this.witch.receivingDamage = true;
            setTimeout(() => {
                this.witch.receivingDamage = false;
            }, 1000);
        }

        this.enemies.forEach((en, eIndex) => {
            this.witch.weapon.bullets.forEach((bullet, BuIndex) => {
                if (en.collide(bullet)) {
                    this.witch.weapon.bullets.splice(BuIndex, 1);
                    en.health -= this.witch.strenght;
                    if (en.health <= 0) {
                        this.count += 1;
                        this.totalCount += en.points;
                        this.disappears.push(new Disappear(en))
                        this.enemies.splice(eIndex, 1)

                        if (this.count >= 2) {
                            // new enemy
                            this.enIndex += 1;
                            if(this.count>=4){
                                //new level
                                this.count = 0;
                                this.levelUp += 1;
                                setTimeout(() => {
                                   this.update()
                                }, 500)
                                setTimeout(() => {
                                    this.background = new Background(this.ctx, this.backgroundImg[this.levelUp])
                                    this.arrayIndex++
                                    this.start()
                                }, 3000)
                            }
                            //Index enemies
                            if (this.enIndex >= 2) {
                                this.enIndex = 0;
                                //index Array enemies
                            if (this.arrayIndex > 4) {
                                    this.arrayIndex = 0;
                                }
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
            this.arrayEnemies[this.arrayIndex][this.enIndex].name,
            this.arrayEnemies[this.arrayIndex][this.enIndex].img,
            this.arrayEnemies[this.arrayIndex][this.enIndex].health,
            this.arrayEnemies[this.arrayIndex][this.enIndex].strength,
            this.arrayEnemies[this.arrayIndex][this.enIndex].vx,
            this.arrayEnemies[this.arrayIndex][this.enIndex].h,
            this.arrayEnemies[this.arrayIndex][this.enIndex].witch,
            this.arrayEnemies[this.arrayIndex][this.enIndex].points,
            this.arrayEnemies[this.arrayIndex][this.enIndex].sound))

    }



    stop() {
        clearInterval(this.intervalId);
        this.intervalId = null
        this.ctx.font = "50px wichFont";
        this.ctx.fillStyle = "purple";
        this.ctx.textAlign = "center";
        this.ctx.fillText("PAUSE", this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 200);
    }
    update(){
        clearInterval(this.intervalId);
        this.intervalId = null
        this.ctx.font = "50px wichFont";
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Go to next level:${this.levelUp}`,this.ctx.canvas.width / 2, this.ctx.canvas.height / 2, 200);
    }
    score() {
        this.ctx.font = "20px Arial"
        this.ctx.fillStyle = "black";
        this.ctx.textAlign = "center";
        this.ctx.fillText(`Points:${this.totalCount}`, 50, 20);
        this.ctx.fillText(`Life:${this.witch.health}`, 50, 50);
        this.ctx.fillText(`level:${this.arrayIndex +1}`, 50, 80);
    }
}