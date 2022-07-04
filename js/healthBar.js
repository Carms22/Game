class HealthBar {
    constructor(ctx,witch,color){
        this.ctx=ctx;
        this.witch=witch;
        this.color=color;
    }
    draw(){
    this.ctx.fillStyle =this.color;
    this.ctx.fillRect(
        this.witch.x,
        this.witch.y-10, 
        this.witch.health, 
        7)
    this.ctx.strokeRect(
        this.witch.x,
        this.witch.y-10, 
        this.witch.maxHealth, 
        7)
    }
}