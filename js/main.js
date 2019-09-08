"use strict";

function fetchGreeting() {
    const body = new URLSearchParams({
        wishersNames: 'בן',
        coupleNames: 'מאור ומאיה',
        eventLocation: 'צל החורש מקף בית ברל',
        eventDate: '09/09/2019'
    });

    fetch('https://www.easy2gift.co.il/umbraco/surface/Easy2GiveSurface/getGreeting', {
        method: 'POST',
        cache: 'no-cache',
        referrer: 'no-referrer',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body
    })
    .then(response => response.json())
    .then(data => {
            const text = data.jsonData;
            const heading = text.shift();
            writeGreeting(heading, text)
    });
}

function writeGreeting(heading, body) {
    const titleElement = document.querySelector('.text-container .head');
    titleElement.innerText = heading;
    titleElement.nextElementSibling.innerHTML = body.join('<br />');
}

document.addEventListener('click', function () {
    fetchGreeting();
});
