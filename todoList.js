console.info("script loaded");

const addToTodo = () => {
  console.info("clicked");
  // select new task
  if (document.getElementById("new-task").value.length) {
    console.log("length OK");
    // add new task in todo list
    // create a new node
    let tag = document.createElement("li");
    let tagContent = document.createTextNode(
      document.getElementById("new-task").value
    );
    tag.appendChild(tagContent);
    let element = document.getElementById("todo-list");
    element.appendChild(tag);
  } else {
    alert("Merci de saisir une nouvelle tâche");
    //console.error("problem with new-task length");
  }

  // create a new node
};
