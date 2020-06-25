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

const sortToDoList =()=>{
    function compare(a,b){
      const valueA = a.isDone
      const valueB = b.isDone
      let comparison = 0
      if(valueA>valueB){
        comparison = 1
      } else if(valueA<valueB){
        comparison = -1
      }
      return comparison
    }
    console.log("before todoListArray",todoListArray);
    todoListArray = todoListArray.sort(compare)
    console.log("after todoListArray",todoListArray);
}
const displayToDoList = () => {
  clearToDoList();
  if (todoListArray) {
    for (let i = 0; i < todoListArray.length; i++) {
      //cross
      let cross = document.createElement("img");
      cross.src = "./img/delete.png";
      cross.width = "18";
      cross.height = "25";
      cross.className = "delete-cross";
      cross.onclick = function () {
        todoListArray.splice(i, 1);
        displayToDoList();
      };

      // text value
      let tag = document.createElement("li");
      let tagContent = document.createTextNode(todoListArray[i].value);
      tag.id = i
      tag.onclick = function () {
        displayTaskDone(tag, i);
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

const updatelistCss = (nodeToUpdate, isDoneToogle) => {
  console.log("nodeToUpdate",nodeToUpdate);
  console.log("isDoneToogle",isDoneToogle);
  
  if(nodeToUpdate && typeof(isDoneToogle) === "boolean" ){ 
    displayToDoList()
    if (isDoneToogle ) {
      nodeToUpdate.classList.add("task-done");
      console.log(nodeToUpdate);
      
    } else {
      nodeToUpdate.classList.remove("task-done");
    }
    

  }else{
    console.warn("problem with nodeToUpdate or isDoneToogle");
    
  }
}

const displayTaskDone = (selectedNode, rank) => {
  if (selectedNode && rank >=0) {    
    console.log(selectedNode);
    if(todoListArray[rank]){

      console.log(todoListArray[rank]);
      if(todoListArray[rank].isDone === false){
        todoListArray[rank].isDone = true
      }else{
        todoListArray[rank].isDone =false
      }
      sortToDoList()
      updatelistCss(selectedNode, todoListArray[rank].isDone)
    }else{
      console.info("last clicked node is deleted")
    }
    } else {
      console.warn("problem with selectedNode et rank ", " selectedNode ", selectedNode , "rank ", rank);
  }

};
const addToTodo = () => {
  // select new task
  if (document.getElementById("new-task").value.length) {
    // let todoObject = {value =}
    todoListArray.push({
      value: document.getElementById("new-task").value,
      isDone: false,
    });
    console.log("todoListArray ", todoListArray);
    displayToDoList();
  } else {
    alert("Merci de saisir une nouvelle tâche");
    //console.error("problem with new-task length");
  }
  sortToDoList()
  displayToDoList()

};
