const inputNewTask = document.querySelector('.header__input--js');
const taskWillDoColumn = document.querySelector('.columns__items--js');

function addTask() {
  if (inputNewTask.value.length === 0) {
    return alert('Add new Task');
  }

  const li = document.createElement('li');
  li.className = 'columns__item';

  const newTask = inputNewTask.value;
  const p = document.createElement('p');
  p.className = 'paragraph';
  p.innerText = newTask;

  li.appendChild(p);


  const div = document.createElement('div');
  div.className = 'btns';

  const btnDone = document.createElement('button');
  btnDone.className = 'btns__btn-done btns__btn-done--js';
  btnDone.innerText = 'done';
  btnDone.addEventListener('click', moveToTaskDoneColumn);
  div.appendChild(btnDone);

  const btnRemove = document.createElement('button');
  btnRemove.className = 'btns__btn-remove btns__btn-remove--js';
  btnRemove.innerText = 'remove';
  btnRemove.addEventListener('click', removeFromTaskWillDoColumn);
  div.appendChild(btnRemove);

  li.appendChild(div);

  taskWillDoColumn.appendChild(li);
  inputNewTask.value = '';
}

function moveToTaskDoneColumn() {
  console.log('moveToTaskDoneColumn');
}

function removeFromTaskWillDoColumn() {
  console.log('removeFromTaskWillDoColumn');
}


//Events ============================================

document.querySelector('.header__btn--js').addEventListener('click', addTask);