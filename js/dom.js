const btnStart=document.getElementById("start-button");
const btnAbaout=document.getElementById("about-button");
const btnHowTo=document.getElementById("how-button");
const aboutSelect=document.getElementById("about");
const howSelect=document.getElementById("how");



btnStart.addEventListener(`click`,e =>{
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