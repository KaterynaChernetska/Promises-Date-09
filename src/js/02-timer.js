import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysSpan = document.querySelector('[data-days]');
const hoursSpan = document.querySelector('[data-hours]');
const minSpan = document.querySelector('[data-minutes]');
const secSpan = document.querySelector('[data-seconds]');
startBtn.classList.add('js-start');
startBtn.setAttribute('disabled', '');
input.classList.add('js-input');

let pickedTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    pickedTime = selectedDates[0].getTime();

    if (options.defaultDate > pickedTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.setAttribute('disabled', '');
      return;
    }
    startBtn.removeAttribute('disabled');
    startBtn.addEventListener('click', onStartBtnClick);
  },
};

flatpickr(input, options);

function onStartBtnClick() {
  if (pickedTime === null) {
    return;
  }
  const timerId = setInterval(() => {
    startBtn.setAttribute('disabled', '');
    const currentTime = Date.now();
    const timeDiffrence = pickedTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(timeDiffrence);
    daysSpan.textContent = days;
    hoursSpan.textContent = hours;
    minSpan.textContent = minutes;
    secSpan.textContent = seconds;

    if (timeDiffrence <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
