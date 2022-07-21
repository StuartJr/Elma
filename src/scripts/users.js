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
            items[index].dataset.date = `${elem.textContent.split(' ')[0].trim()}`;
            items[index].dataset.year = elem.dataset.year;
          });
        }
      });
    }
  };

  const setUserAndTask = (list, blocks) => {
    list.forEach((item) => {
      const userId = item.executor;
      const title = item.subject;
      const date = new Date(item.planEndDate);
      const day = date.getDate();
      const month = date.getMonth() + 1;
			const status = new Date(date).getTime() >= new Date().getTime();
      const currentData = `${day < 10 ? '0' + day : day}.${
        month < 10 ? '0' + month : month
      }`;

      if (blocks) {
        blocks.forEach((block) => {
          const dateData = block.dataset.date;
          const userIdData = block.dataset.userId;
          if (+currentData === +dateData && +userId === +userIdData) {
            const html = `
							<div class="calendar__task ${
								status ? 'success' : 'error'
              }" data-title="${title.trim()}">
								<div class="calendar__task-text">
									Задача
								</div>
							</div>
						`;

            block.innerHTML += html;
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

      for (let index = 0; index < 7; index++) {
        const htmlItem = `
					<div class="calendar__table-item" 
							 data-user-id="${user.id}" 
							 data-username="${user.username}">
					</div>
				`;

        html += htmlItem;
      }

      html += `</div></div>`;
      list.innerHTML += html;
    });

    setDateForTask();
    if (tasks) {
      setTaskForUser();
    }
    setButton();
  }
}
