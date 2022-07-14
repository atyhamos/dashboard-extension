const crpytoCoinEl = document.getElementById('crypto-coin')
const cryptoPricesEl = document.getElementById('crypto-prices')
const weatherEl = document.getElementById('weather')
const clockEl = document.getElementById('time')
const authorEL = document.getElementById('author')

// set clock
clockEl.innerText = new Date()
  .toLocaleTimeString('en-SG', { timeStyle: 'short' })
  .toUpperCase()
setInterval(
  () =>
    (clockEl.innerText = new Date()
      .toLocaleTimeString('en-SG', { timeStyle: 'short' })
      .toUpperCase()),
  1000
)

// get weather data
navigator.geolocation.getCurrentPosition((position) => {
  fetch(
    `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error('Weather data unavailable')
      }
      return res.json()
    })
    .then((data) => {
      const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      weatherEl.innerHTML = `<div id='weather-top'><img src=${iconUrl} alt=${
        data.weather[0].main
      } />
      <p id='weather-temp'>${Math.round(data.main.temp)}°C</p></div>
      <p id='weather-city'>${data.name}</p>`
    })
    .catch((err) => {
      weatherEl.innerText = `Failed to load weather info`
      console.error(err)
    })
})

// load background image
fetch(
  'https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature'
)
  .then((res) => res.json())
  .then((data) => {
    document.body.style.backgroundImage = `url(${data.urls.full})`
    authorEL.innerHTML = `By: <a href=${data.urls.full} target='__blank'/>${data.user.name}</a>`
  })
  .catch((err) => {
    // Fallback to default image
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1494564605686-2e931f77a8e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc3MDI2ODI&ixlib=rb-1.2.1&q=80&w=1080)`
    authorEL.innerHTML = `By: <a href='https://images.unsplash.com/photo-1494564605686-2e931f77a8e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTc3MDI2ODI&ixlib=rb-1.2.1&q=80&w=1080' target='__blank'>Jeremy Bishop</a>`
    console.error(err)
  })

// get Bitcoin data
fetch('https://api.coingecko.com/api/v3/coins/bitcoin')
  .then((res) => {
    if (!res.ok) {
      throw Error(`Something went wrong: ${res.status}`)
    }
    return res.json()
  })
  .then((data) => {
    crpytoCoinEl.innerHTML = `<img src=${data.image.small} alt=${data.name} />
    <p>${data.name}</p>`
    cryptoPricesEl.innerHTML = `<p>🎯: $${data.market_data.current_price.sgd}</p>
    <p>☝️: $${data.market_data.high_24h.sgd}</p>
    <p>👇: $${data.market_data.low_24h.sgd}</p>`
  })
  .catch((err) => {
    crpytoCoinEl.innerHTML = `<p>Failed to load crypto details</p>`
    console.error(err)
  })
