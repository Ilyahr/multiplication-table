
let form = document.getElementById("form"),
    monoDigit = document.querySelectorAll(".single-digit"),
    duoDigit = document.querySelectorAll(".complex-task"),
    anim = document.querySelector(".work-area"),
    task = document.querySelector('.task'),
    result = document.getElementById('result'),
    win = document.querySelector(".true-pointer"),
    loose = document.querySelector(".false-pointer"),
    firstMultiplier = 1,
    secMultiplier = 1;
let POINTER = 0,
    TASKNUM = 0,
    digit = 0,
    miss = 0,
    fine = 0;


// choose task

monoDigit.forEach(function (item, i ) {
    item.addEventListener("click", function () {
        miss = 0;
        fine = 0;
        TASKNUM = i;
        result.focus();
        digit = 0;
        createTask(TASKNUM, digit);

    });
});

duoDigit.forEach(function (item, i ) {
    item.addEventListener("click", function () {
        miss = 0;
        fine = 0;
        TASKNUM = i;
        result.focus();
        digit = 1;
        createTask(TASKNUM, digit);

    });
});

// create random element

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


// output the task on the page

function createTask(i, digit) {
    task.value = "";
    result.value = "";
    if (digit === 0) {
        firstMultiplier = i + 1;
        secMultiplier = getRandomInt(11);
    }
    else if(digit === 1){
        firstMultiplier = getRandomInt(i + 2);
        secMultiplier = getRandomInt(11);
    }

    task.innerHTML = firstMultiplier + " * " + secMultiplier;
}

// wait user answer

form.addEventListener( "submit", function (e){

    e.preventDefault();

    if (+result.value === firstMultiplier * secMultiplier){

        fine++;

        win.innerHTML = fine;

        drawFront(true);

        setTimeout(function (){
            drawBack(true);
            createTask(TASKNUM, digit);
        }, 600);
    }

    else{
        miss++;

        loose.innerHTML = miss;

        drawFront(false);

        setTimeout(function (){
            result.value = "";
            drawBack(false);
            result.focus();
        }, 600);
    }
});








function makeEaseOut(timing) {
    return function(timeFraction) {
        return 1 - timing(1 - timeFraction);
    }
}

function bounce(timeFraction) {
    for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
        if (timeFraction >= (7 - 4 * a) / 11) {
            return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
        }
    }
}

function quad(timeFraction) {
    return Math.pow(timeFraction, 2)
}

function drawFront(react) {
    animate({
        duration: 600,
        timing: makeEaseOut(bounce),
        draw(progress) {
            if(!react)
                anim.style.gridTemplateColumns = 50 + 50 * progress + "% " + (50 - 50 * progress) + "%";
            else
                anim.style.gridTemplateColumns = (50 - 50 * progress) + "% " + 50 + 50 * progress + "%";
        }
    });
}




function drawBack(react) {
    animate({
        duration: 400,
        timing: makeEaseOut(quad),
        draw(progress) {
            if(!react)
                anim.style.gridTemplateColumns = 100 - 50 * progress + "% " + (50 * progress) + "%";
            else
                anim.style.gridTemplateColumns = (50 * progress) + "% " + (100 - 50 * progress) + "%";
        }
    });
}

function animate(options) {

    var start = performance.now();

    requestAnimationFrame(function animate(time) {

        // timeFraction от 0 до 1
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;

        // текущее состояние анимации
        var progress = options.timing(timeFraction);

        options.draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

    });
}



