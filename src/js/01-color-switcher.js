
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let intervalId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);
stopBtn.disabled = true;

function onStartBtnClick () {
    // console.log(event.target.dataset);
    // startBtn.toggleAttribute('disabled');
    // stopBtn.toggleAttribute('disabled');
    intervalId = setInterval (() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  },1000)        
}

function onStopBtnClick () {
    clearInterval(intervalId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    // startBtn.toggleAttribute('disabled');
    // stopBtn.toggleAttribute('disabled');
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }