const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const game = new Game(ctx);
const btnStart=document.getElementById("start-button");
const btnAbaout=document.getElementById("about-button");
const btnHowTo=document.getElementById("how-button");
const aboutSelect=document.getElementById("about");
const howSelect=document.getElementById("how");
const life= document.getElementById("life");
const points= document.getElementById("points");
const level= document.getElementById("level");

window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();

  };


  function startGame() {
    if (game.intervalId === null) {
      game.start()
      game.score()
    } else {

      game.stop()

    }
  }
};

life.textContent= game.totalCount

btnStart.addEventListener(`click`,e =>{
    life.classList.toggle("visible2")
    points.classList.toggle("visible2")
    level.classList.toggle("visible2")
    btnAbaout.classList.toggle("invisible")
    btnHowTo.classList.toggle("invisible")
    if(btnStart.textContent === "Pause"){
        btnStart.textContent = "Start";
    }else{
        btnStart.textContent = "Pause";
    }
   
})
btnAbaout.addEventListener(`click`,e =>{
    aboutSelect.classList.toggle("invisible")
    aboutSelect.classList.toggle("visible")
    btnStart.classList.toggle("invisible")
    btnHowTo.classList.toggle("invisible")
    if(btnAbaout.textContent === "Back"){
        btnAbaout.textContent = "About";
    }else{
        btnAbaout.textContent = "Back";
    }
   
})
btnHowTo.addEventListener(`click`,e =>{
    howSelect.classList.toggle("invisible")
    howSelect.classList.toggle("visible")
    btnAbaout.classList.toggle("invisible")
    btnStart.classList.toggle("invisible")
    if(btnHowTo.textContent === "Back"){
        btnHowTo.textContent = "How to";
    }else{
        btnHowTo.textContent = "Back";
    }
   
})


