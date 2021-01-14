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
      console.log(e.target);
    }
  }
});

// clear tasks
clearBtn.addEventListener("click", function (e) {
  //   taskList.innerHTML = "";
  // OR
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
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
