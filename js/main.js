"use strict";

const WISHERS_NAMES = 'בן';
const COUPLE_NAMES = 'מאור ומאיה';
const EVENT_LOCATION = 'צל החורש בית ברל';
const EVENT_DATE = '9/9/19';

const greetingParameters = {
  wishersNames: WISHERS_NAMES,
  coupleNames: COUPLE_NAMES,
  eventLocation: EVENT_LOCATION,
  eventDate: EVENT_DATE
};

let firstLoad = true;

async function fetchJson(requestParams) {
  return fetch('https://www.easy2gift.co.il/umbraco/surface/Easy2GiveSurface/getGreeting', {
    method: 'POST',
    cache: 'no-cache',
    referrer: 'no-referrer',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(requestParams)
  })
  .then(response => response.json());
}

function writeGreeting(heading, textArr) {
  const titleElement = document.querySelector('.text-container .head');
  titleElement.innerText = heading;
  titleElement.nextElementSibling.innerHTML = textArr.join('<br />');
}

document.querySelector('.card').addEventListener('click', function () {
  fetchJson(greetingParameters)
    .then(data => {
      const text = data.jsonData;
      const heading = text.shift();
      writeGreeting(heading, text);
    });

  // Show temporary 'loading' message on consecutive clicks
  if (!firstLoad) {
    writeGreeting('לא מרוצים?', ['הנה עוד ברכה מגיעה...'])
  }

  firstLoad = false;
});
