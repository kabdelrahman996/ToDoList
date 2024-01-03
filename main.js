


let taskSpace = document.querySelector(".input");
window.onload = function () {
    taskSpace.focus();
    taskSpace.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            addTask(taskInput.value);
            taskInput.value = "";
            taskSpace.focus();
        }
    });
};


let taskInput = document.querySelector(".input");
let addBtn = document.querySelector(".add");
let tasksList = document.querySelector(".tasks-list");
let completedList = document.querySelector(".completed-tasks");

let tasks = [];


if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
}




addBtn.addEventListener("click", function () {
    if (taskInput.value !== "") {
        addTask(taskInput.value);
    }
    taskInput.value = "";
    taskSpace.focus();

});



function addTask(tsk) {
    let newTsk = {
        id: Date.now(),
        content: tsk,
        isCompleted: false,
    };
    tasks.push(newTsk);
    saveTasksToLocalStorage(tasks);
    displayTasks(tasks);
}

document.body.addEventListener("click", function (e) {
    if (e.target.classList.contains("icon")) {
        let taskID = e.target.parentElement.id;
        changeStatus(taskID);
    }
    if (e.target.classList.contains("del")) {
        let taskID = e.target.parentElement.id;
        deleteTask(taskID);
    }
})

function changeStatus(taskID) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == Number(taskID)) {
            tasks[i].isCompleted = !tasks[i].isCompleted;
        }
    }
    saveTasksToLocalStorage(tasks);
    displayTasks(tasks)
}

function deleteTask(taskID) {
    tasks = tasks.filter((task) => task.id != Number(taskID));
    saveTasksToLocalStorage(tasks);
    displayTasks(tasks);
}


displayTasks(tasks);

function displayTasks(arr) {
    tasksList.innerHTML = ``;
    completedList.innerHTML = ``;
    arr.forEach((task) => {
        let newDiv = document.createElement("div");
        newDiv.classList.add("task");
        newDiv.innerHTML = `<i class="fa-regular fa-circle icon"></i> <h3>${task.content}</h3> <i class="fa-solid fa-trash del"></i>`;
        newDiv.setAttribute("id", `${task.id}`);
        if (task.isCompleted === true) {
            newDiv.classList.add("completed");
            completedList.appendChild(newDiv);
        } else {
            tasksList.appendChild(newDiv);
        }
    })
    if (arr.length > 0) {
        let clearBtn = document.querySelector(".clear-all");
        clearBtn.style.display = "block";
        clearBtn.addEventListener("click", function () {
            clearAll();
        })
    } else {
        let clearBtn = document.querySelector(".clear-all");
        clearBtn.style.display = "none";
    }
}


function clearAll() {
    localStorage.removeItem('tasks');
    location.reload();
}



function saveTasksToLocalStorage(arr) {
    let task = JSON.stringify(arr);
    localStorage.setItem("tasks", task);
}


