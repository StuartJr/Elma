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
            !!text.includes(str) && index + 1 !== tasks.length ? '15px' : '0';
        });
      }
    });
  };

  const getLocalTask = (item) => {
    const storage = localStorage.getItem('TasksList');
    const list = storage ? JSON.parse(storage) : [];
    const id = `${item.subject}_${item.planStartDate}_${item.planEndDate}_${item.description}`;

    return !list.find((element) => element.id === id);
  };

  const initBacklog = () => {
    if (wrapper) {
      const backlog = list.filter(
        (item) => !item.executor && getLocalTask(item)
      );
      if (!backlog) {
        return;
      }

      backlog.forEach((item) => {
        const html = `
					<li class="backlog__item">
						<div class="backlog__block" 
								 data-date="${item.planStartDate.trim()}" 
								 data-id="${item.subject}_${item.planStartDate}_${item.planEndDate}_${
          item.description
        }">
							<p class="backlog__title">
								${item.subject}
							</p>
							<p class="backlog__desc">${item.description ? item.description : '-'}</p>
						</div>
					</li>
				`;
        wrapper.innerHTML += html;
      });

      input.removeAttribute('disabled');
      searchTask();
      dragDrop();
    }
  };
  initBacklog();
}
