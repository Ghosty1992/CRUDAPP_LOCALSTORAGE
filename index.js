
displayTask();
let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.querySelector("#addTaskBtn");

addTaskBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let taskInputVal = taskInput.value;
  if (taskInputVal.trim() != 0) {
    let localSaved = localStorage.getItem("localTask");
    if (localSaved === null) {
      let taskList = [];
    } else {
      JSON.parse(localSaved);
    }
    taskList.push(taskInputVal);
    localStorage.setItem("localTask", JSON.stringify(taskList));
    taskInput.value = " ";
  }
  displayTask();
});

//displayTask function
function displayTask() {
  let localSaved = localStorage.getItem("localTask");
  if (localSaved === null) {
    taskList = [];
  } else {
    taskList = JSON.parse(localSaved);
  }
  let html = "";
  let addedTask = document.getElementById("addedTask");
  taskList.forEach((item, index) => {
    html += `<tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item}</td>
                    <td><button type="button" class="editButton" onclick="edit(${index})"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" onclick="deleteItem(${index})" class="removeButton"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
  });
  addedTask.innerHTML = html;
}

//edit function
function edit(index) {
  let saveIndex = document.getElementById("saveIndex");
  let addTaskBtn = document.getElementById("addTaskBtn");
  let saveTaskBtn = document.getElementById("saveTaskBtn");
  saveIndex.value = index;
  let localSaved = localStorage.getItem("localTask");
  let taskList = JSON.parse(localSaved);
  taskInput.value = taskList[index];
  addTaskBtn.style.display = "none";
  saveTaskBtn.style.display = "block";
}

//save function
let saveTaskBtn = document.getElementById("saveTaskBtn");
saveTaskBtn.addEventListener("click", function() {
  let addTaskBtn = document.getElementById("addTaskBtn");
  let localSaved = localStorage.getItem("localTask");
  let taskList = JSON.parse(localSaved);
  let saveIndex = document.getElementById("saveIndex").value;
  taskList[saveIndex] = taskInput.value;
  saveTaskBtn.style.display = "none";
  addTaskBtn.style.display = "block";
  localStorage.setItem("localTask", JSON.stringify(taskList));
  taskInput.value = "";
  displayTask();
});

//function delete
function deleteItem(index) {
  let localSaved = localStorage.getItem("localTask");
  let taskList = JSON.parse(localSaved);
  taskList.splice(index, 1);
  localStorage.setItem("localTask", JSON.stringify(taskList));
  displayTask();
}
