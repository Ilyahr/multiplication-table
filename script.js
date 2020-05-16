
let form = document.getElementById("form"),
    monoDigit = document.querySelectorAll(".single-digit"),
    duoDigit = document.querySelectorAll(".complex-task"),
    task = document.getElementById('task'),
    result = document.getElementById('result'),
    answer = document.getElementById('answer'),
    firstMultiplier = 1,
    secMultiplier = 1;
let POINTER = 0,
    TASKNUM = 0,
    digit = 0,
    miss = 0,
    fine = 0;


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function createTask(i, digit) {
    task.value = "";
    answer.value = "";
    result.value = "";
    if (digit === 0) {
        firstMultiplier = i + 1;
        secMultiplier = getRandomInt(11);
    }
    else if(digit === 1){
        firstMultiplier = getRandomInt(i + 2);
        secMultiplier = getRandomInt(11);
    }

    task.value = firstMultiplier + " * " + secMultiplier;
    console.log(firstMultiplier + "*" + secMultiplier);
}
form.addEventListener( "submit", function (e) {
    e.preventDefault();
    console.log("зашел в событие");
    if (+result.value === firstMultiplier * secMultiplier) {
        answer.value = "прекрасно";
        setTimeout(function (){ console.log("я тут"); createTask(TASKNUM, digit);}, 1000);
    }
    else{
        console.log("ошибка");
        answer.value = "Попробуй еще раз";
        setTimeout(function (){
            result.value = "";
            result.focus();}, 1000);
    }
}, );

monoDigit.forEach(function (item, i ) {
    item.addEventListener("click", function () {
        miss = 0;
        fine = 0;
        TASKNUM = i;
        result.focus();
        console.log("нажал так-то на " + i + "кнопку" );
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
        console.log("нажал так-то на " + i + "кнопку" );
        digit = 1;
        createTask(TASKNUM, digit);

    });

});




