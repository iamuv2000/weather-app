const $nav = document.querySelector('#nav')


const weatherForm = document.querySelector('#weather-form')
const search = document.querySelector('#search-input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    fetch('/weather?address=' +location)
    .then((response) => {
        response.json().then((data) => { 
            if (data.error) {
                messageOne.textContent = data.error
                messageTwo.textContent = '' 
            } 
        else {
            messageOne.textContent = data.location
            $nav.innerHTML = '<span class="glyphicon glyphicon-map-marker"></span>'
            messageTwo.textContent = data.forecastData
            }
        }) 
    })
})
