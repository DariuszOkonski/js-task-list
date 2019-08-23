const headerSection = document.querySelector('.header');
const btnAdd = document.querySelector('.header__btn--js');
const inputNewTask = document.querySelector('.header__input--js');
const taskWillDoColumn = document.querySelector('.columns__items--one.columns__items--js');

const columnOne = ['aaa', 'aab', 'aac', 'abc', 'aaa'];
const columnTwo = ['bbb', 'bba'];

btnDone = {
  cls: 'btns__btn-done btns__btn-done--js',
  text: 'done',
  evList: moveToTaskDoneColumn,
}

btnRemove = {
  cls: 'btns__btn-remove btns__btn-remove--js',
  text: 'remove',
  evList: removeFromTaskWillDoColumn
}

load();

function load() {
  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemove);
}

function addTask() {
  if (inputNewTask.value.length === 0) {
    return alert('Add new Task');
  }

  const newTask = inputNewTask.value.toLowerCase();
  columnOne.push(newTask)
  // localStorage.setItem('column-one', columnOne);

  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemove);
  inputNewTask.value = '';
}

function filter(e) {
  // console.log(e.target.value.length)
  if (e.target.value.length > 0) {
    inputNewTask.disabled = true;
    btnAdd.disabled = true;
    headerSection.classList.add('disactive');
  } else {
    inputNewTask.disabled = false;
    btnAdd.disabled = false;
    headerSection.classList.remove('disactive');
  }

  const findWorld = e.target.value.toLowerCase();
  const filteredArray = columnOne.filter(el => el.includes(findWorld))
  createColumnElements(taskWillDoColumn, filteredArray, btnDone, btnRemove);
}

function moveToTaskDoneColumn() {
  console.log('moveToTaskDoneColumn');
}

function removeFromTaskWillDoColumn(e) {
  const index = parseInt(e.target.parentNode.parentNode.dataset.id);
  columnOne.splice(index, 1);

  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemove);
}

// Additional inner functions =======================

function createButton(className, text, eventListener) {
  const newButton = document.createElement('button');
  newButton.className = className;
  newButton.innerText = text;
  newButton.addEventListener('click', eventListener);
  return newButton;
}

function createColumnElements(column, filteredArray, btnOne, btnTwo) {
  taskWillDoColumn.innerHTML = '';

  filteredArray.forEach((task, index) => {

    const li = document.createElement('li');
    li.className = 'columns__item';
    li.setAttribute('data-id', `${index}`);

    const p = document.createElement('p');
    p.className = 'paragraph';
    p.innerText = task;

    li.appendChild(p);

    const div = document.createElement('div');
    div.className = 'btns';

    const btnDone = createButton(btnOne.cls, btnOne.text, btnOne.evList);
    div.appendChild(btnDone);

    const btnRemove = createButton(btnTwo.cls, btnTwo.text, btnTwo.evList);
    div.appendChild(btnRemove);

    li.appendChild(div);

    column.appendChild(li);
  });
}

//Events ============================================

btnAdd.addEventListener('click', addTask);
document.querySelector('.filter__input--js').addEventListener('keyup', filter)