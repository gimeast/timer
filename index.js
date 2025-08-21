const hrs = document.querySelector(".timer-hrs");
const min = document.querySelector(".timer-min");
const sec = document.querySelector(".timer-sec");
const timerWrap = document.querySelector(".timer-wrap");
const btnWrap = document.querySelector(".btn-wrap");
let interval = null;

function disabledBtn() {
    btnWrap.innerHTML = `<button class="start-btn">
                        <img
                            src="public/images/icon/start-disabled.png"
                            alt="시작버튼"
                        />
                    </button>
                    <button class="reset-btn">
                        <img
                            src="public/images/icon/reset-disabled.png"
                            alt="초기화버튼"
                        />
                    </button>`;
}
function activeBtn() {
    btnWrap.innerHTML = `
        <button class="start-btn"></button>
        <button class="reset-btn"></button>
    `;

    const startBtn = document.querySelector(".start-btn");
    const resetBtn = document.querySelector(".reset-btn");
    startBtn.style.backgroundImage =
        "url(public/images/icon/start-default.png)";
    resetBtn.style.backgroundImage =
        "url(public/images/icon/reset-default.png)";
}
function pauseBtn() {
    btnWrap.innerHTML = `
        <button class="pause-btn"></button>
        <button class="reset-btn"></button>
    `;

    const pauseBtn = document.querySelector(".pause-btn");
    const resetBtn = document.querySelector(".reset-btn");
    pauseBtn.style.backgroundImage = "url(public/images/icon/pause.png)";
    resetBtn.style.backgroundImage =
        "url(public/images/icon/reset-default.png)";
}
function btnToggle() {
    if (
        Number.isNaN(Number(hrs.value)) ||
        Number.isNaN(Number(min.value)) ||
        Number.isNaN(Number(sec.value))
    ) {
        disabledBtn();
        return;
    }

    if (
        (hrs.value === "0" || hrs.value === "00") &&
        (min.value === "0" || min.value === "00") &&
        (sec.value === "0" || sec.value === "00")
    ) {
        disabledBtn();
        return;
    }

    activeBtn();
}

timerWrap.addEventListener("focusout", (e) => {
    if (
        e.target.className.includes("timer-hrs") ||
        e.target.className.includes("timer-min") ||
        e.target.className.includes("timer-sec")
    ) {
        btnToggle();
    }
});

btnWrap.addEventListener("click", (e) => {
    if (e.target.className === "start-btn") {
        pauseBtn();

        hrs.disabled = true;
        min.disabled = true;
        sec.disabled = true;

        let hours = Number(hrs.value);
        let minutes = Number(min.value);
        let seconds = Number(sec.value);

        const timer = () => {
            let totalSeconds = hours * 3600 + minutes * 60 + seconds;
            seconds -= 1;

            console.log("시", Math.floor(totalSeconds / 3600));
            console.log("분", Math.floor((totalSeconds / 60) % 60));
            console.log("초", Math.floor(totalSeconds % 60));

            hrs.value = Math.floor(totalSeconds / 3600);
            min.value = Math.floor((totalSeconds / 60) % 60);
            sec.value = Math.floor(totalSeconds % 60);

            if (totalSeconds === 0) {
                clearInterval(interval);
                disabledBtn();

                hrs.disabled = false;
                min.disabled = false;
                sec.disabled = false;
            }
        };

        timer();
        interval = setInterval(timer, 1000);
    } else if (e.target.className === "pause-btn") {
        clearInterval(interval);
        activeBtn();
    } else if (e.target.className === "reset-btn") {
        clearInterval(interval);
        disabledBtn();
        hrs.value = 0;
        min.value = 0;
        sec.value = 0;
        hrs.disabled = false;
        min.disabled = false;
        sec.disabled = false;
    }
});
