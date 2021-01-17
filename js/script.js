// define UI element
let form = document.querySelector("#task_form");
let taskList = document.querySelector("ul");
let clearBtn = document.querySelector("#clear_task");
let filter = document.querySelector("#task_filter");
let taskInput = document.querySelector("#new_task");

// define event listener >>

// add task
form.addEventListener("submit", function (e) {
  if (taskInput.value === "") {
    alert("Add a Task!");
  } else {
    // create li list
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(taskInput.value + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);

    storeTaskInLocalStorage(taskInput.value);

    taskInput.value = "";
  }
  e.preventDefault();
});

// remove task
taskList.addEventListener("click", function (e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure?")) {
      let element = e.target.parentElement;
      element.remove();

      removeFromLocalStorage(element);
    }
  }
});

// clear tasks
clearBtn.addEventListener("click", function () {
  //   taskList.innerHTML = "";
  // OR
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  localStorage.clear();
});

//filter task
filter.addEventListener("keyup", function (e) {
  let text = e.target.value.toLowerCase();

  document.querySelectorAll("li").forEach((task) => {
    let item = task.firstChild.textContent;
    if (item.toLocaleLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
});

//get task from Local Storage when page loaded;
document.addEventListener("DOMContentLoaded", function () {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    taskList.appendChild(li);
  });
});

// store data in Local Storage
const storeTaskInLocalStorage = function (task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// remove data from Local Storage
const removeFromLocalStorage = function (taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  let li = taskItem;
  li.removeChild(li.lastChild);

  tasks.forEach((task, index) => {
    if (li.textContent.trim() === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
};
