class Disappear {
    constructor(enemy){
        this.ctx= ctx;
        this.x= enemy.x;
        this.y = enemy.y;
        this.w=w;
        this.h=h;
        this.img= new Image();
        this.img.src= "";
        this.sound= new Audio();
        this.sound.src= "";
        this.isVisible=false;

    }
    isDead(){
        
    }
}