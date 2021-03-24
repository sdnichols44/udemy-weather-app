const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const message = document.querySelectorAll('.message-output');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    message[0].textContent = 'Loading...';
    message[1].textContent = '';
    fetch(`/weather?address=${search.value}`)
    .then(response => response.json()
    .then(data => {
        if (data.errorMessage) {
            return message[0].textContent = data.errorMessage;
        }
        message[0].textContent = data.location;
        message[1].textContent = data.currentWeather;
    }));
})