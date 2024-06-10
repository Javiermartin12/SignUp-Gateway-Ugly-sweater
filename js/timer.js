
let totalTime = 0;
let counterTime = 0;
let timerResult;

//button from html
let button = document.getElementById("showContentButton");
//start time listener
button.addEventListener("click", function(e) {
  e.preventDefault();
  //increment minutes
  timerResult = setInterval(() => {
    counterTime++;
    totalTime++;
    if (counterTime >= 60 && totalTime < 299) {
      const header = document.querySelector("header");
      insertTimer(totalTime, header);
      counterTime = 0;
    }
    if (totalTime >= 300) {
      insertTimeUp();
      resetTimer();
      /*location.reload();*/
    }

  }, 1000);
});

//update html elements - warning

function insertTimer(counter, element, timeRemove = 5000) {
  let htmlCode = `
    <article class="timer" id="timer">
        <span>You started your purchase</span><br>
        <span class="minutes"> ${counter / 60} minute ago</span><br>
        <span> HURRY UP!</span>
    </article>`
  element.insertAdjacentHTML("afterbegin", htmlCode);
  setTimeout(() => {
    document.getElementById("timer").remove();
  }, timeRemove);
}

// stop timer

function stopTimer() {
  clearInterval(timerResult);
}

function resetTimer() {
  clearInterval(timerResult);
  counterTime = 0;
  totalTime = 0;
  regressiveTime = 5;
}

//Form string to display total timer

function format(time) {
  let hours = ~~(time / 3600);
  let mins = ~~((time % 3600) / 60);
  let secs = ~~time % 60;
  let ret = "";
  if (hours > 0) {
    ret += "" + hours + ":" + (mins < 10 ? "0" : "");
  }
  if (mins === 1) {
    ret += "" + mins + " minute and " + (secs < 10 ? "0" : "");
  } else if (mins > 1) {
    ret += "" + mins + " minutes and " + (secs < 10 ? "0" : "");
  }
  ret += "" + secs + " seconds";
  return ret;
}

//Display total time in shipping finish section

document
  .getElementById("btn-buy-now-finished")
  .addEventListener("click", function() {
    stopTimer();
    const buttonTotalTime = document.getElementById("total-time");
    buttonTotalTime.textContent = `Your purchase took ${format(totalTime)}`;
    buttonTotalTime.style.fontWeight = "Bold"; //podría ir a CSS
  });

//Set time up in shipping finish section
let regressiveTime = 5;
function insertTimeUp(timeRemove = 1000) {
  const divTimeUp = document.querySelector(".timeout-error");
  divTimeUp.classList.toggle("hide");

  let xp = setInterval(() => {
    const timerUp = document.getElementById("timerUp");
    if (timerUp !== null) {
      timerUp.remove();
    }
    let htmlCode = `
        <article class="timer" id="timerUp">
        <span>Sorry, your time is up!</span><br>
        <span class="minutes">This purchase will end in: ${regressiveTime} s</span><br>
        </article>`;
    //insert time up message
    // reload page

    if (regressiveTime === 0) {
      divTimeUp.classList.toggle("hide");
      location.reload()
      timerUp.remove();
      stopTimer();
      startAgain();
      clearInterval(xp);

    } else {
      divTimeUp.insertAdjacentHTML("afterend", htmlCode);

    }
    regressiveTime--;
  }, timeRemove);
};