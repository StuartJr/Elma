import { dragDrop } from './dragDrop';

export function setBacklogTasks(list) {
  const wrapper = document.querySelector('.backlog__list');
  const input = document.querySelector('.backlog__input');

  const searchTask = () => {
    const tasks = document.querySelectorAll('.backlog__item');
    input.addEventListener('input', (e) => {
      const str = e.target.value.toLowerCase();
      if (tasks) {
        tasks.forEach((task, index) => {
          const text = task.textContent.toLowerCase();
          task.style.height = !!text.includes(str) ? '76px' : '0';
          task.style.marginBottom =
            !!text.includes(str) && (index + 1 !== tasks.length) ? '15px' : '0';
        });
      }
    });
  };

	const getLocalTask = (item) => {
		const storage = localStorage.getItem('TasksList');
    const list = storage ? JSON.parse(storage) : [];
		const id = `${item.subject}_${item.planStartDate}_${item.planEndDate}_${item.description}`;

		return !list.find(element => element.id === id);
	}

	const setClearTable = () => {
		const tasks = document.querySelectorAll('.backlog__item');

		if (tasks) {
			if (tasks.length <= 0) {
				const containerBacklog = document.querySelector('.backlog__wrapper');
				const clearButton = document.querySelector('.backlog__clear');
				if (containerBacklog && !clearButton) {
					const div = document.createElement('div');
					div.classList.add('backlog__clear');

					const button = document.createElement('button');
					button.classList.add('backlog__clear-btn');
					button.textContent = 'Очистить таблицу';

					div.appendChild(button);
					containerBacklog.append(div)
				}
			}
		}
	}

  if (wrapper) {
    const backlog = list.filter((item) => !item.executor && getLocalTask(item));
    if (!backlog) {
      return;
    }

    backlog.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('backlog__item');

      const div = document.createElement('div');
      div.classList.add('backlog__block');
			div.dataset.date = item.planStartDate;
      div.dataset.id = `${item.subject}_${item.planStartDate}_${item.planEndDate}_${item.description}`;

      const title = document.createElement('p');
      title.classList.add('backlog__title');
      title.textContent = item.subject;

      const desc = document.createElement('p');
      desc.classList.add('backlog__desc');
      desc.textContent = item.description ? item.description : '-';

      li.appendChild(div);
      div.appendChild(title);
      div.appendChild(desc);
      wrapper.appendChild(li);
    });

    input.removeAttribute('disabled');
    searchTask();
    dragDrop();

  }

	setInterval(() => {
		setClearTable();
	}, 0)
}
