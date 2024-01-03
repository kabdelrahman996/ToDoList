// ELEMENTS
const newTaskInput = document.querySelector('.input');
const addBtn = document.querySelector('.add');
const clearAllBtn = document.querySelector('.clear-all');
const unCompletedListEl = document.querySelector('.tasks-list');
const completedListEl = document.querySelector('.completed-tasks');

const state = {
  tasks: [],
};

// HELPERS
function clearFocusTaskInput() {
  newTaskInput.value = '';
  newTaskInput.focus();
}

function updateTasks() {
  localStorage.setItem('tasks', JSON.stringify(state.tasks));
  updateTasksUI(state.tasks);
}

function addTask(tsk) {
  const newTsk = {
    id: Date.now(),
    content: tsk,
    isCompleted: false,
  };

  state.tasks.push(newTsk);
  updateTasks();
}

function changeStatus(taskID) {
  state.tasks.forEach((task) => {
    if (task.id == Number(taskID)) task.isCompleted = !task.isCompleted;
  });

  updateTasks();
}

function deleteTask(taskID) {
  state.tasks = state.tasks.filter((task) => task.id != Number(taskID));

  updateTasks();
}

function emptyTaskWrappers() {
  unCompletedListEl.innerHTML = ``;
  completedListEl.innerHTML = ``;
}

const renderTask = (task) => {
  const newDiv = document.createElement('div');
  newDiv.classList.add('task');
  newDiv.innerHTML = `<i class="fa-regular fa-circle icon"></i> <h3>${task.content}</h3> <i class="fa-solid fa-trash del"></i>`;
  newDiv.setAttribute('id', `${task.id}`);

  if (task.isCompleted === true) {
    newDiv.classList.add('completed');
    completedListEl.appendChild(newDiv);
  } else {
    unCompletedListEl.appendChild(newDiv);
  }
};

function updateTasksUI() {
  emptyTaskWrappers();

  state.tasks.forEach(renderTask);

  let clearBtnDisplay = 'none';
  if (state.tasks.length > 0) clearBtnDisplay = 'block';
  clearAllBtn.style.display = clearBtnDisplay;
}

// HANDLERS
function handleClearAll() {
  state.tasks = [];
  updateTasks();
}

function handleAddTodo() {
  if (newTaskInput.value !== '') addTask(newTaskInput.value);

  clearFocusTaskInput();
}

function handleInputkeypress(e) {
  if (e.key !== 'Enter') return;

  addTask(newTaskInput.value);

  clearFocusTaskInput();
}

function handleClickBody(e) {
  if (e.target.classList.contains('icon')) {
    let taskID = e.target.parentElement.id;
    changeStatus(taskID);
  }
  if (e.target.classList.contains('del')) {
    let taskID = e.target.parentElement.id;
    deleteTask(taskID);
  }
}

clearAllBtn.addEventListener('click', handleClearAll);
addBtn.addEventListener('click', handleAddTodo);
document.body.addEventListener('click', handleClickBody);
newTaskInput.addEventListener('keypress', handleInputkeypress);

//
const init = function () {
  if (localStorage.getItem('tasks')) {
    state.tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  updateTasksUI();

  clearFocusTaskInput();
};

init();
