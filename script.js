// DOM Elements
const time = document.querySelector('.time'),
  greeting = document.querySelector('.greeting'),
  name = document.querySelector('.name'),
  focus = document.querySelector('.focus');

// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();
    weekDay = today.getDay();
    day = today.getDate();
    month = today.getMonth();

//Get day of week
const weekDays = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday'
}

//Get month of year
const yearMonths = {
  '0': 'January',
  '1': 'February',
  '2': 'March',
  '3': 'April',
  '4': 'May',
  '5': 'June',
  '6': 'Jule',
  '7': 'August',
  '8': 'September',
  '9': 'October',
  '10': 'November',
  '11': 'December'
}

// 24hr Format
hour = hour % 24;

// Output Time
time.innerHTML = `${(weekDays[weekDay])}<span> </span>${(day)}<span> </span>${(yearMonths[month])}<br>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    document.body.style.backgroundImage =
      "url('assets/images/morning/03.jpg')";
    document.body.style.color = 'white';
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    document.body.style.backgroundImage =
    "url('assets/images/day/03.jpg')";
    document.body.style.color = 'white';
    greeting.textContent = 'Good Day, ';
  } else if (hour < 24) {
    // Evening
    document.body.style.backgroundImage =
    "url('assets/images/evening/02.jpg')";
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    // Night
    document.body.style.backgroundImage =
    "url('assets/images/night/02.jpg')";
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  name.addEventListener ("click", () => {
    if (localStorage.getItem('name') === '[Enter Name]'){
      name.textContent = '';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  });
  name.addEventListener("blur", () => {
    if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
      name.textContent = '[Enter Name]';
    }
    else {
      name.textContent = localStorage.getItem('name');
    }
  });
  if (localStorage.getItem('name') === null || localStorage.getItem('name') === '') {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Focus
function getFocus() {
  focus.addEventListener ("click", () => {
    if (localStorage.getItem('focus') === '[Enter Focus]') {
      focus.textContent = '';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  });
  focus.addEventListener("blur", () => {
    if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
      focus.textContent = '[Enter Focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  });
  if (localStorage.getItem('focus') === null || localStorage.getItem('focus') === '') {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  }
}

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('focus', e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem('focus', e.target.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);

// Run
showTime();
setBgGreet();
getName();
getFocus();
