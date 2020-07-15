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
  cookieContent == null ? (this.list = []) : (this.list = cookieContent);
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
List.prototype.edit = function (newValue, rank) {
  this.list[rank] = newValue;
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
  if (todoList.list != null || todoList.list != undefined) {
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
      let element = document.getElementById("todo-list");

      // text value
      let tag = document.createElement("li");
      let spanTag = document.createElement("SPAN");
      spanTag.onclick = function () {
        todoList.done(i);
        displayToDoList();
      };
      let tagContent = document.createTextNode(todoList.list[i].value);
      // edit
      if (!todoList.list[i].isDone) {
        let edit = document.createElement("IMG");
        edit.src = "./img/edit.svg";
        edit.width = "15";
        edit.height = "15";
        edit.onclick = () => {
          editTodo();
        };
        tag.appendChild(edit);
      }

      // update DOM element
      tag.appendChild(cross);
      spanTag.appendChild(tagContent);
      tag.appendChild(spanTag);
      if (todoList.list[i].isDone) {
        tag.classList.add("task-done");
      }

      element.appendChild(tag);
    }
  } else {
    console.info("todoList in displayToDoList in null or undefined");
  }
};
const addToTodo = () => {
  // select new task
  if (document.getElementById("new-task")) {
    if (document.getElementById("new-task").value.length > 0) {
      todoList.add(document.getElementById("new-task").value);
      displayToDoList();
      document.getElementById("new-task").value = "";
    } else {
      alert("Merci de saisir une nouvelle tâche");
    }
  } else {
    console.info(`document.getElementById("new-task") is null or undefined`);
  }
};
const editTodo = () => {
  // Need to finish this function
  displayForm(todoList.list[i].value, todoList.edit("toto", "edit-task", i));
};

// Need to update submitOnEnter function
const submitOnEnter = (id, addOrUpdate) => {
  if (document.getElementById(id)) {
    document.getElementById(id).addEventListener("keydown", function (e) {
      e.keyCode == 13 && addOrUpdate;
    });
  } else {
    console.info(`document.getElementById(id) do not exist`);
  }
};
const displayForm = (inputValue, onClickfunc, id, rank) => {
  console.log(rank);
  if (inputValue !== undefined && onClickfunc !== undefined) {
    let inputTextField = document.createElement("INPUT");
    inputTextField.type = "text";
    inputTextField.size = "30";
    inputTextField.id = id;

    if (rank === undefined) {
      inputTextField.id = "new-task";
      inputTextField.placeholder = inputValue;
    } else {
      inputTextField.id = "edit-task";
      inputTextField.value = inputValue;
    }

    let submitButton = document.createElement("INPUT");
    submitButton.type = "submit";
    if (rank === undefined) {
      submitButton.value = "Ajouter cette tâche";
      submitButton.onclick = () => {
        addToTodo();
      };
    } else {
      submitButton.value = "Mettre à jour cette tâche";
      submitButton.onclick = () => {
        console.log("add update func here");
        // add update func here
      };
    }

    // update DOM
    let element = document.getElementById("input");
    element.appendChild(inputTextField);
    element.appendChild(submitButton);
  } else {
    console.error("problem with inputValue or onClickfunc");
  }
};
// init page
const init = () => {
  !todoList.list.length && todoList.load();
  displayToDoList();
  submitOnEnter();
  displayForm("Saisissez une nouvelle tâche", "addToTodo()", "new-task");
};
