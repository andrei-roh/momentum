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
time.innerHTML = `${(weekDays[weekDay])}<span> </span>${(day)}<span> </span>${(yearMonths[month])}<span> </span>${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;
setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let i = 1;
  let today = new Date(),
    hour = today.getHours();
  const base_morning = 'assets/images/morning/';
  const base_day = 'assets/images/day/';
  const base_evening = 'assets/images/evening/';
  const base_night = 'assets/images/night/';
  const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
  if (hour < 12) {
    // Morning
    base = base_morning;
    let imageSrc = base_morning + images[hour];
    document.body.style.backgroundImage = `url(${imageSrc})`;
    document.body.style.color = 'white';
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Day
    base = base_day;
    let imageSrc = base_day + images[hour];
    document.body.style.backgroundImage = `url(${imageSrc})`;
    document.body.style.color = 'white';
    greeting.textContent = 'Good Day, ';
  } else if (hour < 24) {
    // Evening
    base = base_evening;
    if (hour >= 19){ hour = 0 }
    let imageSrc = base_evening + images[hour];
    document.body.style.backgroundImage = `url(${imageSrc})`;
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  } else {
    // Night
    base = base_night;
    let imageSrc = base_night + images[hour];
    document.body.style.backgroundImage = `url(${imageSrc})`;
    greeting.textContent = 'Good Night, ';
    document.body.style.color = 'white';
  }

  function getImage() {
    if (hour + i === 19){
      hour = 0;
      i = 0;
    }
    let imageSrc = base + images[hour + i];
    document.body.style.backgroundImage = `url(${imageSrc})`;
    i++;
  }
  btn.addEventListener('click', getImage);
}

//Set Figcaaption
const blockquote = document.querySelector('blockquote');
const figcaption = document.querySelector('figcaption');

async function getQuote() {
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en`;
  const res = await fetch(url);
  const data = await res.json();
  blockquote.textContent = data.quoteText;
  figcaption.textContent = data.quoteAuthor;
}

const btn = document.querySelector('.btn');
btn.addEventListener('click', getQuote);

//Get Weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const windSpeed = document.querySelector('.windSpeed')
const humidity = document.querySelector('.humidity')
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

//Check localStorage for load last City
if (localStorage.getItem('city') != 'Minsk') {
  city.textContent = localStorage.getItem('city');
}

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=bffd331380de75029aefc8b85884024b&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  windSpeed.textContent = `${data.wind.speed} meter/sec`;
  humidity.textContent = `${data.main.humidity}%`
}

function setCity(event) {
  if (event.code === 'Enter') {
    if (city.textContent === '') {
      city.textContent = localStorage.getItem('city');
    }
    getWeather();
    localStorage.setItem('city', this.innerText);
    city.blur();
  }
}

city.addEventListener('keypress', setCity);
document.addEventListener('DOMContentLoaded', getWeather);

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
