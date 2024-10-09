const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const iconElement = document.getElementById('weather-icon');

const apiKey = 'e31fa536a60c68daebdb8054f1f81ebc';  // Uusi API-avain
const weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const icon_url = 'http://openweathermap.org/img/wn/'; 

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      getWeather(lat, lon); 
    }, error => {
      console.log("Geolocation error: ", error);
      alert('Sijaintia ei voitu hakea. Tarkista sijaintiasetukset.');
    });
  } else {
    alert('Sijainti ei ole käytettävissä.');
  }
};

const getWeather = (lat, lon) => {
  const url = `${weatherApiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  console.log(url);  
  axios.get(url)
    .then(response => {
      const data = response.data;
      console.log(data);  
      locationElement.textContent = `${data.name}, ${data.sys.country}`;
      temperatureElement.textContent = `${data.main.temp} °C`;
      descriptionElement.textContent = data.weather[0].description;
      iconElement.src = `${icon_url}${data.weather[0].icon}@2x.png`;
    })
    .catch(error => {
      console.log("Weather data error: ", error);
      alert('Säätietoja ei voitu hakea.');
    });
};

window.onload = getLocation;
