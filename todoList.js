// global variables
let List = function () {
  this.list = [
    // to test
    // { value: "test2", isDone: false },
    // { value: "test1", isDone: false },
    // { value: "test3", isDone: false },
    // { value: "test4", isDone: false },
  ];
};

let todoList = new List();

// Define  List functions
List.prototype.sort = function () {
  function compare(a, b) {
    const valueA = a.isDone;
    const valueB = b.isDone;
    let comparison = 0;
    if (valueA > valueB) {
      comparison = 1;
    } else if (valueA < valueB) {
      comparison = -1;
    }
    return comparison;
  }
  this.list = this.list.sort(compare);
};
List.prototype.display = function () {
  console.log("display", todoList);
};

List.prototype.save = function () {
  localStorage.setItem("list", JSON.stringify(todoList.list));
};

List.prototype.load = function () {
  let cookieContent = JSON.parse(localStorage.getItem("list"));
  this.list = cookieContent;
};

List.prototype.add = function (textFieldValue) {
  this.list.push({ value: textFieldValue, isDone: false });
  todoList.sort();
  todoList.save();
};

List.prototype.done = function (rank) {
  console.info("task done");
  if (this.list[rank].isDone) {
    this.list[rank].isDone = false;
  } else {
    this.list[rank].isDone = true;
  }
  todoList.sort();
  todoList.save();
};

List.prototype.remove = function (rank) {
  this.list.splice(rank, 1);
  todoList.sort();
  todoList.save();
};

// Define display rules
const clearToDoList = () => {
  if (document.getElementById("todo-list")) {
    if (document.getElementById("todo-list").childNodes.length) {
      let oldList = document.getElementById("todo-list");
      for (
        let i = document.getElementById("todo-list").childNodes.length - 1;
        i >= 0;
        i--
      ) {
        oldList.removeChild(oldList.childNodes[i]);
      }
    }
  }
};

const displayToDoList = () => {
  clearToDoList();
  if (todoList.list.length >= 0) {
    for (let i = 0; i < todoList.list.length; i++) {
      //cross
      let cross = document.createElement("IMG");
      cross.src = "./img/delete.svg";
      cross.width = "15";
      cross.height = "15";
      cross.className = "delete-cross";
      cross.onclick = () => {
        todoList.remove(i);
        displayToDoList();
      };

      // text value
      let tag = document.createElement("li");
      let spanTag = document.createElement("SPAN");
      spanTag.onclick = function () {
        todoList.done(i);
        displayToDoList();
      };
      let tagContent = document.createTextNode(todoList.list[i].value);

      // update DOM element
      let element = document.getElementById("todo-list");
      tag.appendChild(cross);
      spanTag.appendChild(tagContent);
      tag.appendChild(spanTag);
      if (todoList.list[i].isDone) {
        tag.classList.add("task-done");
      }

      element.appendChild(tag);
    }
  } else {
    console.error("Error todoList in displayToDoList ");
  }
};
const addToTodo = () => {
  // select new task
  if (document.getElementById("new-task").value.length) {
    todoList.add(document.getElementById("new-task").value);
    displayToDoList();
    document.getElementById("new-task").value = "";
  } else {
    alert("Merci de saisir une nouvelle tâche");
  }
};
const submitOnEnter = () => {
  document.getElementById("new-task").addEventListener("keydown", function (e) {
    e.keyCode == 13 && addToTodo();
  });
};
// init page
const init = () => {
  !todoList.list.length && todoList.load();
  displayToDoList();
  submitOnEnter();
};
