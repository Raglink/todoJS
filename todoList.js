// global variables
let todoListArray = [];

// define functions
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

// TO DO now
const displayTaskDone = (selectedNode) => {
  console.log(selectedNode);
  if (selectedNode) {
    if (selectedNode.classList.value !== "task-done") {
      selectedNode.classList.add("task-done");
      console.log("add task-done");
    } else {
      console.log("already task-done");
      selectedNode.classList.remove("task-done");
    }
  }
};

const displayToDoList = () => {
  clearToDoList();
  if (todoListArray) {
    for (let i = 0; i < todoListArray.length; i++) {
      let tag = document.createElement("li");
      let tagContent = document.createTextNode(todoListArray[i]);
      tag.onclick = function () {
        displayTaskDone(tag);
      };
      tag.appendChild(tagContent);
      let element = document.getElementById("todo-list");
      element.appendChild(tag);
    }
  } else {
    console.error("Error todoListArray in displayToDoList ");
  }
};

const addToTodo = () => {
  // select new task
  if (document.getElementById("new-task").value.length) {
    todoListArray.push(document.getElementById("new-task").value);
    console.log("todoListArray ", todoListArray);
    displayToDoList();
  } else {
    alert("Merci de saisir une nouvelle tâche");
    //console.error("problem with new-task length");
  }
};

// TODO global
// add onclick  class (  text-decoration: line-through;) or not
// delete
//
