import { setBacklogTasks } from './backlog';
import { setUserList } from './users';

document.addEventListener('DOMContentLoaded', () => {
  let user;
  let tasks;
  async function getUser() {
    const url =
      'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/users';
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      data.json().then((res) => {
        user = res;
        getTask();
      });
    });
  }

  async function getTask() {
    const url =
      'https://varankin_dev.elma365.ru/api/extensions/2a38760e-083a-4dd0-aebc-78b570bfd3c7/script/tasks';
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => {
      data.json().then((res) => {
        tasks = res;
        hiddenLoader();
      });
    });
  }

  const hiddenLoader = () => {
    const loader = document.querySelector('.preloader');
    if (loader) {
			setBacklogTasks(tasks)
			setUserList(user, tasks);
      loader.classList.add('hidden');
    }
  }

  getUser();
});
