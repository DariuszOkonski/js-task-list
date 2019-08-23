const headerSection = document.querySelector('.header');
const btnAdd = document.querySelector('.header__btn--js');
const inputNewTask = document.querySelector('.header__input--js');
const inputFilter = document.querySelector('.filter__input--js');
const taskWillDoColumn = document.querySelector('.columns__items--one.columns__items--js');
const taskDone = document.querySelector('.columns__items.columns__items--two.columns__items--two-js');

const columnOne = ['aaa', 'aab', 'aac', 'abc', 'aaa'];
const columnTwo = ['bbb', 'bba', 'bbc', 'bbd'];

btnDone = {
  cls: 'btns__btn-done btns__btn-done--js',
  text: 'done',
  evList: moveToTaskDoneColumn,
}

btnRemoveOne = {
  cls: 'btns__btn-remove btns__btn-remove--js',
  text: 'remove',
  evList: removeFromTaskWillDoColumn
}

btnBack = {
  cls: 'btns__btn-back btns__btn-back--js',
  text: 'back',
  evList: backToTaskWillDoColumn,
}

btnRemoveTwo = {
  cls: 'btns__btn-remove btns__btn-remove--two-js',
  text: 'remove',
  evList: removeFromTaskDoneColumn,
}


load();

function load() {
  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemoveOne);
  createColumnElements(taskDone, columnTwo, btnBack, btnRemoveTwo);
}

function addTask() {
  if (inputNewTask.value.length === 0) {
    return alert('Add new Task');
  }

  const newTask = inputNewTask.value.toLowerCase();
  columnOne.push(newTask)
  // localStorage.setItem('column-one', columnOne);

  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemoveOne);
  inputNewTask.value = '';
}

function filter(e) {
  headerState(e);

  const findWorld = e.target.value.toLowerCase();

  const filteredArray = [];
  columnOne.forEach(el => {
    if (el.includes(findWorld))
      filteredArray.push(el);
    else
      filteredArray.push(null);
  });

  createColumnElements(taskWillDoColumn, filteredArray, btnDone, btnRemoveOne);
}

function moveToTaskDoneColumn(e) {
  const index = parseInt(e.target.parentNode.parentNode.dataset.id);
  const removedElement = columnOne.splice(index, 1);

  columnTwo.push(removedElement);

  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemoveOne);
  createColumnElements(taskDone, columnTwo, btnBack, btnRemoveTwo);

  inputFilter.value = '';
  headerState(e);
}

function removeFromTaskWillDoColumn(e) {
  if (confirm('Remove element from column one?')) {
    const index = parseInt(e.target.parentNode.parentNode.dataset.id);
    columnOne.splice(index, 1);

    createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemoveOne);

    inputFilter.value = '';
    headerState(e);
  }
}

function backToTaskWillDoColumn(e) {
  const index = parseInt(e.target.parentNode.parentNode.dataset.id);
  const removedElement = columnTwo.splice(index, 1);

  columnOne.push(removedElement);

  createColumnElements(taskWillDoColumn, columnOne, btnDone, btnRemoveOne);
  createColumnElements(taskDone, columnTwo, btnBack, btnRemoveTwo);

  inputFilter.value = '';
  headerState(e);
}

function removeFromTaskDoneColumn(e) {
  if (confirm('Remove element from column two?')) {
    const index = parseInt(e.target.parentNode.parentNode.dataset.id);
    columnTwo.splice(index, 1);
    createColumnElements(taskDone, columnTwo, btnBack, btnRemoveTwo);
  }
}


// Additional inner functions =======================

function headerState(e) {
  if (e.target.value.length > 0) {
    inputNewTask.disabled = true;
    btnAdd.disabled = true;
    headerSection.classList.add('disactive');
  } else {
    inputNewTask.disabled = false;
    btnAdd.disabled = false;
    headerSection.classList.remove('disactive');
  }
}

function createButton(className, text, eventListener) {
  const newButton = document.createElement('button');
  newButton.className = className;
  newButton.innerText = text;
  newButton.addEventListener('click', eventListener);
  return newButton;
}

function createColumnElements(column, filteredArray, btnOne, btnTwo) {
  column.innerHTML = '';

  filteredArray.forEach((task, index) => {

    // console.log(task)
    // TODO
    if (task !== null) {
      const li = document.createElement('li');
      li.className = 'columns__item';
      li.setAttribute('data-id', `${index}`);

      const p = document.createElement('p');
      p.className = 'paragraph';
      p.innerText = task;

      li.appendChild(p);

      const div = document.createElement('div');
      div.className = 'btns';

      const tempBtnOne = createButton(btnOne.cls, btnOne.text, btnOne.evList);
      div.appendChild(tempBtnOne);

      const tempBtnTwo = createButton(btnTwo.cls, btnTwo.text, btnTwo.evList);
      div.appendChild(tempBtnTwo);

      li.appendChild(div);

      column.appendChild(li);
    }
  });
}

//Events ============================================
btnAdd.addEventListener('click', addTask);
document.querySelector('.filter__input--js').addEventListener('keyup', filter)