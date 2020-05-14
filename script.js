let typeOfTask = document.querySelectorAll(".single-digit"),
    task = document.getElementById('task'),
    result = document.getElementById('result'),
    answer = document.getElementById('answer'),
    firstMultiplier = 1,
    secMultiplier = 1;
let POINTER = 0,
    TASKNUM = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}


function createTask(i, isTrue, callback) {

    if (isTrue) {
        firstMultiplier = i + 1;
        secMultiplier = getRandomInt(10);
    }
    else
        {
            firstMultiplier = getRandomInt(i + 2);
            secMultiplier = getRandomInt(10);
        }
    console.log(firstMultiplier + "*" + secMultiplier);
    callback();
    }

    function mainTask(){
        form = document.getElementById("form");
        task.value = "";
        answer.value = "";
        result.value = "";
        task.value = firstMultiplier + " * " + secMultiplier;
        form.addEventListener( "submit", function (event) {
            if (+result.value === firstMultiplier * secMultiplier) {
                answer.value = "прекрасно";
                POINTER++;
                // event.preventDefault;
                setTimeout(function (){ console.log("я тут"); createTask(TASKNUM, true, mainTask)}, 1000);
            }
            else{
                console.log("ошибка");
                answer.value = "Попробуй еще раз";
                event.preventDefault();
                setTimeout(function (){mainTask()}, 1000);
            }
        });
    }



    typeOfTask.forEach(function (item, i ) {
        item.addEventListener("click", function () {
            TASKNUM = i;
            result.focus();
            console.log("нажал так-то на " + i + "кнопку" );
            createTask(TASKNUM, true, mainTask);
            // var cTask = createTask.bind(this, TASKNUM, true);
            // mainTask(cTask);
            });

    })


