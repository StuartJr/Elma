export function setUserList(users, tasks) {
  const list = document.querySelector('.calendar__users');

  const setDateForTask = () => {
    const tables = document.querySelectorAll('.calendar__table');
    const date = document.querySelectorAll('.calendar__date-text');

    if (tables) {
      tables.forEach((table) => {
        const items = table.querySelectorAll('.calendar__table-item');
        if (items) {
          date.forEach((elem, index) => {
            items[index].dataset.date = `${elem.textContent.split(' ')[0]}`;
            items[index].dataset.year = elem.dataset.year;
          });
        }
      });
    }
  };

  const setUserAndTask = (list, blocks) => {
    list.forEach((item) => {
      const userId = item.executor;
      const status = item.status;
      const title = item.subject;
      const date = new Date(item.planEndDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const currentData = `${day < 10 ? '0' + day : day}.${
        month < 10 ? '0' + month : month
      }`;

      if (blocks) {
        blocks.forEach((block) => {
          const dateData = block.dataset.date;
          const userIdData = block.dataset.userId;
          if (+currentData === +dateData && +userId === +userIdData) {
            const div = document.createElement('div');
            div.classList.add('calendar__task');
            status === 1
              ? div.classList.add('error')
              : div.classList.add('success');
            div.dataset.title = `${title}`;

            const p = document.createElement('div');
            p.classList.add('calendar__task-text');
            p.textContent = 'Задача';

            div.appendChild(p);
            block.appendChild(div);
          }
        });
      }
    });
  };

  const getLocalList = () => {
    const storage = localStorage.getItem('TasksList');
    const list = storage ? JSON.parse(storage) : [];

    return list;
  };

  const setTaskForUser = () => {
    const list = tasks.filter((task) => task.executor);
    const blocks = document.querySelectorAll('.calendar__table-item');

    blocks.forEach((block) => {
      block.innerHTML = '';
    });

    setUserAndTask(list, blocks);
    setUserAndTask(getLocalList(), blocks);
  };

  const setButton = () => {
    const next = document.querySelector('.calendar__button--right');
    const prev = document.querySelector('.calendar__button--left');

    if (prev && next) {
      next.addEventListener('click', () => {
        setDateForTask();
        setTaskForUser();
      });
      prev.addEventListener('click', () => {
        setDateForTask();
        setTaskForUser();
      });
    }
  };

  if (list) {
    users.forEach((user) => {
      let html = `
				<li class="calendar__user">
					<p class="calendar__user-name" data-user-id="${user.id}" data-username="${user.username}">
						${user.firstName} <br> ${user.surname}
					</p>
					<div class="calendar__table">
			`;
      //const li = document.createElement('li');
      //li.classList.add('calendar__user');

      //const name = document.createElement('p');
      //name.classList.add('calendar__user-name');
      //name.innerHTML = `${user.firstName} <br> ${user.surname}`;
      //name.dataset.userId = user.id;
      //name.dataset.username = user.username;

      //const table = document.createElement('div');
      //table.classList.add('calendar__table');

      for (let index = 0; index < 7; index++) {
        const htmlItem = `
					<div class="calendar__table-item" 
							 data-user-id="${user.id}" 
							 data-username="${user.username}">
					</div>
				`;

        html += htmlItem;

        //const item = document.createElement('div');
        //item.classList.add('calendar__table-item');
        //item.dataset.userId = user.id;
        //item.dataset.username = user.username;

        //table.appendChild(item);
      }
			html += `</div></div>`;
			list.innerHTML += html;
      //li.appendChild(name);
      //li.appendChild(table);
      //list.appendChild(li);
    });

    setDateForTask();
    if (tasks) {
      setTaskForUser();
    }
    setButton();
  }
}
