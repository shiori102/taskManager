$(function () {
    prepareLocalStorage();
    displayTasks();
});

//PREPARE local storage
function prepareLocalStorage() {
    if (getLocalStorage("taskList") == null) {
        setLocalStorage([]);
    }

}

//SET local storage
function setLocalStorage(taskList) {
    localStorage.setItem("taskList", JSON.stringify(taskList));
}

//GET local storage
function getLocalStorage() {
    return JSON.parse(localStorage.getItem("taskList"));
}

//generate random id
function generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == "x" ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


//delete specific task from the array
function deleteTask(elem) {
    id = elem.parentNode.parentNode.getAttribute("data-id");
    taskLog = getLocalStorage();
    taskLog.forEach(function (item, index) {
        if (item.id == id) {
            console.log(item);
            taskLog.splice(index, 1);
        }
    });
    setLocalStorage(taskLog);
    displayTasks();
};


//delete all the tasks from the table
function clearTasks() {
    setLocalStorage([]);
    displayTasks();
};

//create and add tasks to the table
function saveTask() {
    let taskLog = JSON.parse(localStorage.getItem("taskList"));
    let userDate = document.getElementById("newDate").value;
    let obj = {
        title: document.getElementById("newTask").value,
        created: new Date(),
        complete: false,
        dueDate: userDate,
        id: generateId()
    };


    taskLog.push(obj);

    localStorage.setItem("taskList", JSON.stringify(taskLog));

    displayTasks();

}

function displayDate(date) {
    return date.toString().split("T")[0];
}

//complete tasks off list
function completeTask(elem) {
    id = elem.parentNode.parentNode.getAttribute("data-id");
    taskLog = getLocalStorage();
    taskLog.forEach(function (item, index) {
        if (item.id == id) {
            console.log(item);
            item.complete = true;
        }
    });
    setLocalStorage(taskLog);
    displayTasks();
};

function filterTasks(mode) {
    if (mode == "complete") {
        hidden = document.querySelectorAll(".hidden");
        hidden.forEach(function (item) {
            item.classList.remove("hidden");
        });
        incompletes = document.querySelectorAll('tbody tr:not(.complete)');
        incompletes.forEach(function (item) {
            item.classList.add("hidden");
        });
    }

    if (mode == "incomplete") {
        hidden = document.querySelectorAll(".hidden");
        hidden.forEach(function (item) {
            item.classList.remove("hidden");
        });
        completes = document.querySelectorAll('tbody tr.complete');
        completes.forEach(function (item) {
            item.classList.add("hidden");
        });
    }

    if (mode == null) {
        hidden = document.querySelectorAll(".hidden");
        hidden.forEach(function (item) {
            item.classList.remove("hidden");
        });
    }
}

function editTask() {
    newID = document.getElementById("newID").value;
    console.log(newID);
    let taskLog = JSON.parse(localStorage.getItem("taskList"));
    let userDate = document.getElementById("editDate").value;
    let taskName = document.getElementById("taskName").value;
    taskLog.forEach(function (item, index) {
        console.log(item);
        if (item.id == newID) {
            item.title = taskName;
            item.dueDate = userDate;
        }

    });

    setLocalStorage(taskLog);
    displayTasks();

};


function updateModal(elem) {
    id = elem.parentNode.parentNode.getAttribute("data-id");
    document.getElementById("newID").value = id;
}

//display all the tasks onto the table
function displayTasks() {
    let taskLog = getLocalStorage()
    const template = document.getElementById("task-template");
    const resultsBody = document.getElementById("resultsBody");

    resultsBody.innerHTML = "";
    for (let i = 0; i < taskLog.length; i++) {
        const dataRow = document.importNode(template.content, true);

        if (taskLog[i].complete)
            dataRow.getElementById("taskRow").setAttribute("class", "complete");

        dataRow.getElementById("taskRow").setAttribute("data-id", taskLog[i].id);
        dataRow.getElementById("title").textContent = taskLog[i].title;
        dataRow.getElementById("created").textContent = displayDate(taskLog[i].created);
        dataRow.getElementById("dueDate").textContent = displayDate(taskLog[i].dueDate);

        resultsBody.appendChild(dataRow);

    }
}