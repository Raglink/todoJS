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
  console.log( "this.list[rank]1 ", this.list[rank])
  this.list[rank].value = newValue;
  console.log( "this.list[rank]2", this.list[rank])
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
          editTodo(i);
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
const displayForm = (targetedNode,inputValue, id, rank) => {
    if (inputValue !== undefined) {
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
        submitButton.value = "Modifier";
        submitButton.onclick = () => {
          todoList.edit(inputTextField.value,rank)
          console.log("add update func here");
          displayToDoList()
          // add update func here
        };
      }
  
      // update DOM
      let element = document.getElementById(targetedNode);
      console.log("rank ",rank)
      if(rank){
        element = element.childNodes[rank]
        for(let j = element.childNodes.length-1; j>=0; j--){
        element.removeChild(element.childNodes[j])  
        }
        console.log("element ",element.childNodes)
      }
      element.appendChild(inputTextField);
      element.appendChild(submitButton);

      submitOnEnter("new-task",addToTodo());
    } else {
      console.error("problem with inputValue");
    }
  };
const addToTodo = () => {
  console.log("fire");
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
const editTodo = (rank) => {
  // Need to finish this function
  
  displayForm("todo-list",todoList.list[rank].value, "" , rank);
};

// init page
const init = () => {
  !todoList.list.length && todoList.load();
  displayToDoList();
  displayForm("input","Saisissez une nouvelle tâche", "new-task");
};
