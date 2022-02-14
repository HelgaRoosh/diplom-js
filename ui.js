window.addEventListener('load', startGame);/* при загрузке окна='load' запускается функция  startGame*/

let boardEl = document.getElementById('board');/*Возвращает ссылку на элемент по его идентификатору (ID); идентификатор является строкой, которая может быть использована для идентификации элемента; она может быть определена при помощи атрибута id в HTML или из скрипта.*/
let modalEl = document.getElementById('modal');/*играть еще*/
let resetButtons = document.getElementsByClassName('reset');

for (let btn of resetButtons) { /* по клику на кнопку если не скрыта кнопка - скрыть ее и запустить СтартГейм*/
  btn.addEventListener('click', function () {
    if (!modalEl.classList.contains('hidden')) {/*contains - содержит*/
      modalEl.classList.add('hidden');/*add - добавить*/
    }
    startGame();
  });
}

boardEl.addEventListener('click', function (event) {
  let targetClasses = event.target.classList; /*Свойство event.target содержит элемент, на котором сработало событие. Это не тот элемент, к которому был привязан обработчик этого события, а именно самый глубокий тег, на который непосредственно был, к примеру, совершен клик*/
  let targetData = event.target.dataset;/*размещение данных?*/
  if (targetClasses.contains('field') && /*если это поле*/!targetClasses.contains('busy')) {/*и оно не занято*/
    click(targetData.row, targetData.col);
  }
});

function showWinner(winner) {
  let header = modalEl.getElementsByTagName('h2')[0];/*ищет все элементы с заданным внутри скобок тегом и возвращает их в виде коллекции. Коллекция - это массив объектов, которая сама по себе является объектом, то есть имеет свои свойства и методы. = запишет в тег h2 на индекс 0 то, что будет в переменной*/
  header.textContent = `🍾 Победил игрок №${winner + 1}! 🍾`;/*видимо header это объект со свойством textContent в которое запишем победителя. только при чем здесь +1?*/
  modalEl.classList.remove('hidden');/*Метод remove объекта classList удаляет заданный CSS класс элемента. - типа делает видимым h2?*/
}

function renderBoard(board) {/*прорисовывает доску*/
  const fields = [];
  for (let [i, row] of board.entries()) { /*Object.entries() метод возвращает массив собственных перечисляемых свойств указанного объекта в формате [key, value], в том же порядке, что и в цикле for...in (разница в том, что for-in перечисляет свойства из цепочки прототипов). Порядок элементов в массиве который возвращается Object.entries() не зависит от того как объект объявлен. Если существует необходимость в определённом порядке, то  массив должен быть отсортирован до вызова метода, например Object.entries(obj).sort((a, b) => a[0] - b[0]);.*/
    for (let [j, value] of row.entries()) {
      fields.push(`
        <div class="field ${value ? 'busy' : 'free'}" 
            data-row="${i}" 
            data-col="${j}"
            style="grid-row:${i + 1};grid-column:${j + 1};"
        >
          ${value || ''}
        </div>
      `);
    }
  }
  boardEl.innerHTML = fields.join('');
}
