// global variables
let List = function () {
  this.list = [];
};

let todoList = new List();

// Define functions
List.prototype.display = function () {
  console.log("display", todoList);
};

List.prototype.save = function () {
  localStorage.setItem("list", JSON.stringify(todoList.list));
};

List.prototype.load = function () {
  let cookieContent = JSON.parse(localStorage.getItem("list"));
  this.list = cookieContent;

  this.display();
};

List.prototype.add = function (textFieldValue) {
  console.log("thisList", this.list);
  this.list.push({ value: textFieldValue, isDone: false });
  todoList.save();
  todoList.display();
};

List.prototype.done = function (rank) {
  console.info("task done");
  if (this.list[rank].isDone) {
    this.list[rank].isDone = false;
  } else {
    this.list[rank].isDone = true;
  }
  todoList.display();
};

List.prototype.remove = function (rank) {
  this.list.splice(rank, 1);
  todoList.display();
};
//test section -------->
//todoList.save();
// todoList.display();
// todoList.load();
// todoList.add("toto");
// todoList.add("toto");

let todoListArray = [];

// define functions
const updatelistCss = (nodeToUpdate, isDoneToogle) => {
  console.log("nodeToUpdate", nodeToUpdate);
  console.log("isDoneToogle", isDoneToogle);

  if (nodeToUpdate && typeof isDoneToogle === "boolean") {
    console.log("tototo ", isDoneToogle);
    if (isDoneToogle) {
      console.log("nodeToUpdate.classList ", nodeToUpdate.classList);
      nodeToUpdate.classList.add("task-done");
      console.log("nodeToUpdate.classList => ", nodeToUpdate.classList);
    } else {
      nodeToUpdate.classList.remove("task-done");
    }
  } else {
    console.warn("problem with nodeToUpdate or isDoneToogle");
  }
};
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

const sortToDoList = () => {
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
  todoListArray = todoListArray.sort(compare);
};

const displayTaskDone = (selectedNode, rank) => {
  if (selectedNode && rank >= 0) {
    console.log(selectedNode);
    if (todoListArray[rank]) {
      console.log("here ", todoListArray[rank]);
      console.log("todoListArray[rank].isDone ", todoListArray[rank].isDone);

      if (todoListArray[rank].isDone == false) {
        todoListArray[rank].isDone = true;
      } else {
        todoListArray[rank].isDone = false;
      }
      console.log("todoListArray[rank].isDone => ", todoListArray[rank].isDone);
      updatelistCss(selectedNode, todoListArray[rank].isDone);
      displayToDoList();
    } else {
      console.info("last clicked node is deleted");
    }
  } else {
    console.warn(
      "problem with selectedNode et rank ",
      " selectedNode ",
      selectedNode,
      "rank ",
      rank
    );
  }
};

const displayToDoList = () => {
  clearToDoList();
  sortToDoList();
  if (todoList.list.length >= 0) {
    for (let i = 0; i < todoList.list.length; i++) {
      //cross
      let cross = document.createElement("img");
      cross.src = "./img/delete.png";
      cross.width = "18";
      cross.height = "25";
      cross.className = "delete-cross";
      cross.onclick = function () {
        todoList.remove(i);
        displayToDoList();
      };

      // text value
      let tag = document.createElement("li");
      let tagContent = document.createTextNode(todoList.list[i].value);
      tag.onclick = function () {
        todoList.done(i);
      };

      // update DOM element
      let element = document.getElementById("todo-list");
      tag.appendChild(cross);
      tag.appendChild(tagContent);
      element.appendChild(tag);
    }
  } else {
    console.error("Error todoListArray in displayToDoList ");
  }
};

const addToTodo = () => {
  // select new task
  if (document.getElementById("new-task").value.length) {
    todoListArray.push({
      value: document.getElementById("new-task").value,
      isDone: false,
    });
    console.log("todoListArray ", todoListArray);
    displayToDoList();
    todoList.add(document.getElementById("new-task").value);
  } else {
    alert("Merci de saisir une nouvelle tâche");
  }
  displayToDoList();
};
