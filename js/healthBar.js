class HealthBar {
    constructor(ctx,witch){
        this.ctx=ctx;
        this.witch=witch;
    }
    draw(){
    this.ctx.fillStyle = "violet";
    this.ctx.fillRect(
        50,
        10, 
        this.witch.health, 
        7)
    this.ctx.strokeRect(
        50,
        10, 
        this.witch.maxHealth, 
        7)
    }
}