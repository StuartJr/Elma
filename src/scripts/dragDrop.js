export function dragDrop() {
  const tasks = document.querySelectorAll('.backlog__item');

  if (tasks) {
    tasks.forEach((task) => {
      const block = task.querySelector('.backlog__block');

      //Сохоанение данных
      const saveData = (elem) => {
        const storage = localStorage.getItem('TasksList');

        const list = storage ? JSON.parse(storage) : [];
        if (elem.classList.contains('calendar__table-item')) {
          const titleTask = block.querySelector('.backlog__title');
          const userName = elem.dataset.username;
          const date = elem.dataset.date;
          const year = elem.dataset.year;
          const executor = elem.dataset.userId;
          const subject = titleTask.textContent;
          const blockId = block.dataset.id;

          const obj = {
            userName: userName,
            planEndDate: `${year}-${date.split('.')[1]}-${date.split('.')[0]}`,
            executor: +executor,
            subject: subject,
            id: blockId,
            status: 1,
          };

          list.push(obj);
        }

        if (elem.classList.contains('calendar__user-name')) {
          const titleTask = block.querySelector('.backlog__title');
          const userName = elem.dataset.username;
          const date = block.dataset.date;
          const executor = elem.dataset.userId;
          const subject = titleTask.textContent;
          const blockId = block.dataset.id;

          const obj = {
            userName: userName,
            planEndDate: date,
            executor: +executor,
            subject: subject,
            id: blockId,
            status: 1,
          };

          list.push(obj);
          deleteTaskBacklog();
        }

        localStorage.setItem('TasksList', JSON.stringify(list));
      };

      //Центирование элемента по центру
      const moveAt = (pageX, pageY) => {
        block.style.left = pageX - block.offsetWidth / 2 + 'px';
        block.style.top = pageY - block.offsetHeight / 2 + 'px';
      };

      // Удаление класса подсветки элемента в который можно добавить задачу
      const clearItemsHover = () => {
        const items = document.querySelectorAll('.calendar__table-item');
        if (items) {
          items.forEach((item) => {
            item.classList.remove('hover');
          });
        }

        const users = document.querySelectorAll('.calendar__user-name');
        if (users) {
          users.forEach((user) => {
            user.classList.remove('hover');
          });
        }
      };

      // Подсветка элемента в который можно добавить задачу
      const setHoverElem = (elem) => {
        clearItemsHover();
        if (
          elem.classList.contains('calendar__table-item') ||
          elem.classList.contains('calendar__user-name')
        ) {
          elem.classList.add('hover');
        }
      };

      // Удаление элемента из Backlog
      const deleteTaskBacklog = () => {
        task.innerHTML = '';
        task.style.height = 0;
        setTimeout(() => {
          task.remove();
        }, 300);
      };

      // Добавление новой задачи в таблицу
      const addTaskInTable = (elem) => {
        const titleTask = block.querySelector('.backlog__title');

        const div = document.createElement('div');
        div.classList.add('calendar__task');
        div.classList.add('error');
        div.dataset.title = `${titleTask.textContent}`;

        const text = document.createElement('div');
        text.classList.add('calendar__task-text');
        text.textContent = 'Задача';

        div.appendChild(text);
        elem.appendChild(div);

        deleteTaskBacklog();
        saveData(elem);
      };

      const onMouseMove = (e) => {
        moveAt(e.pageX, e.pageY);
        let elem = document.elementFromPoint(e.pageX, e.pageY + 40);
        setHoverElem(elem);
      };

      const setUserTask = (elem) => {
        let isCurrentWeek = false;
        const userId = elem.dataset.userId;
        const userName = elem.dataset.username;
        const date = `${block.dataset.date.split('-')[2]}.${
          block.dataset.date.split('-')[1]
        }`;
        const tableItems = document.querySelectorAll('.calendar__table-item');

        if (tableItems) {
          tableItems.forEach((item) => {
            const dataDate = item.dataset.date;
            const dataUserId = item.dataset.userId;
            const dataUserName = item.dataset.username;

            if (
              dataDate === date &&
              dataUserId === userId &&
              dataUserName === userName
            ) {
              addTaskInTable(item);
              isCurrentWeek = true;
            }
          });
        }

        if (!isCurrentWeek) {
          saveData(elem);
        }
      };

      const setTasks = (e) => {
        let elem = document.elementFromPoint(e.pageX, e.pageY);
        if (elem.classList.contains('calendar__table-item')) {
          addTaskInTable(elem);
        }
        if (elem.parentElement.classList.contains('calendar__table-item')) {
          addTaskInTable(elem.parentElement);
        }

        if (
          elem.parentElement.parentElement.classList.contains(
            'calendar__table-item'
          )
        ) {
          addTaskInTable(elem.parentElement.parentElement);
        }

        if (elem.classList.contains('calendar__user-name')) {
          setUserTask(elem);
        }
      };

      block.addEventListener('mousedown', (e) => {
        block.style.position = 'absolute';
        block.style.zIndex = 2;

        moveAt(e.pageX, e.pageY);

        document.addEventListener('mousemove', onMouseMove);

        block.addEventListener('mouseup', (e) => {
          document.removeEventListener('mousemove', onMouseMove);

          block.onmouseup = null;
          block.style.position = 'inherit';

          clearItemsHover();
          setTasks(e);
        });
      });
    });
  }
}
