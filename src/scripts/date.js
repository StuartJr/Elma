const date = new Date();
const weekDay = date.getDay();
let year = date.getFullYear();
let monthDay = date.getDate();
let month = date.getMonth();
let prevMonth = date.getMonth() - 1;
let currentDate = `${year}-${month < 10 ? '0' + (+month + 1) : +month + 1}-${
  monthDay < 10 ? '0' + monthDay : monthDay
}`;

const getLastDay = () => {
  let list = [];
  for (let index = 0; index <= 11; index++) {
    let lastDay = new Date(year, index + 1, 0).getDate();
    list.push(lastDay);
  }
  return list;
};

const getWeek = (current) => {
  let result = [];
  let curr = new Date(current);
  let first = curr.getDate() - curr.getDay() + 1;
  let last = first + 6;

  let firstday = new Date(curr.setDate(first)).toUTCString();
  let lastday = new Date(curr.setDate(last)).toUTCString();

  let firstDayTime = new Date(firstday).getTime();
  let lastDayTime = new Date(lastday).getTime();

  if (firstDayTime > lastDayTime) {
    const lastDayTimeDate = new Date(lastday).getDate();
    const lastdayDayTimeCurrentDate = `${year}-${
      month < 10 ? '0' + (+month + 1) : +month + 1
    }-${lastDayTimeDate < 10 ? '0' + lastDayTimeDate : lastDayTimeDate}`;
    lastDayTime = new Date(lastdayDayTimeCurrentDate).getTime();
  }

  const createObjectDate = (index) => {
    const week = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const dateWeek = new Date(index);
    const currentYear = dateWeek.getFullYear();
    const currentDay = dateWeek.getDate();
    const currentWeekDay = dateWeek.getDay();
    const currentMonth = dateWeek.getMonth();

    const obj = {
      date: `${currentDay < 10 ? '0' + currentDay : currentDay}`,
      month: `${
        currentMonth + 1 < 10 ? '0' + (+currentMonth + 1) : +currentMonth + 1
      }`,
      day: week[currentWeekDay],
      year: currentYear,
    };
    result.push(obj);
  };

  for (let index = firstDayTime; index <= lastDayTime; index += 86400000) {
    createObjectDate(index);
  }

  return result;
};

const setCurrentDate = () => {
  currentDate = `${year}-${month + 1 < 10 ? '0' + (+month + 1) : +month + 1}-${
    monthDay < 10 ? '0' + monthDay : monthDay
  }`;
};

const setDateWeek = () => {
  const list = document.querySelector('.calendar__date');
  if (list) {
    list.innerHTML = '';
    getWeek(currentDate).forEach((item) => {
      const html = `
				<li class="calendar__date-item">
					<p class="calendar__date-text" data-year="${item.year}">
						${item.date}.${item.month} (${item.day})
					</p>
				</li>
			`;

      list.innerHTML += html;
    });
  }
};

const setButton = () => {
  const next = document.querySelector('.calendar__button--right');
  const prev = document.querySelector('.calendar__button--left');

  if (prev && next) {
    next.addEventListener('click', () => {
      monthDay += 7;
      if (monthDay > getLastDay()[month]) {
        month += 1;
        monthDay = monthDay - getLastDay()[month];
      }
      setCurrentDate();
      setDateWeek();
    });
    prev.addEventListener('click', () => {
      monthDay -= 7;
      if (monthDay <= 0) {
        month -= 1;
        monthDay = getLastDay()[month] + monthDay;
      }
      setCurrentDate();
      setDateWeek();
    });
  }
};

setDateWeek();
setButton();
