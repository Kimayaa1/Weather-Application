const apikey = "7cb09121ae1ba5eb0409ec2c1d39e587";
        const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        const searchBox = document.querySelector(".search input");
        const searchBtn = document.querySelector(".search button");
        const weatherIcon = document.querySelector(".weather-icon");

        async function checkWeather(city) {
            const response = await fetch(apiurl + city + `&appid=${apikey}`);
            if(response.status == 404){
                document.querySelector(".error").style.display = "block";
                document.querySelector(".weather").style.display = "none";
            }
            else{
                var data = await response.json();

                localStorage.setItem("lastWeather", JSON.stringify(data));

            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
            document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";

            if(data.weather[0].main == "Clouds"){
                weatherIcon.src = "images/clouds.png";
            }
            else if(data.weather[0].main == "Rain"){
                weatherIcon.src = "images/rain.png";
            }
            else if(data.weather[0].main == "Clear"){
                weatherIcon.src = "images/clear.png";
            }
            else if(data.weather[0].main == "Drizzle"){
                weatherIcon.src = "images/drizzle.png";
            }
            else if(data.weather[0].main == "Mist"){
                weatherIcon.src = "images/mist.png";
            }
            else if(data.weather[0].main == "Snow"){
                weatherIcon.src = "images/snow.png";
            }

            document.querySelector(".weather").style.display = "block";
            document.querySelector(".error").style.display = "none";
            }
            updateFavoriteIcon(data.name);
        }

        searchBtn.addEventListener("click", ()=>{
            checkWeather(searchBox.value);
        })

        window.addEventListener("load", () => {
            const lastWeather = localStorage.getItem("lastWeather");
            if (lastWeather) {
                const data = JSON.parse(lastWeather);
                document.querySelector(".city").innerHTML = data.name;
                document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
                document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
                document.querySelector(".wind").innerHTML = data.wind.speed + " Km/h";
        
                if (data.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/clouds.png";
                } else if (data.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png";
                } else if (data.weather[0].main == "Clear") {
                    weatherIcon.src = "images/clear.png";
                } else if (data.weather[0].main == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png";
                } else if (data.weather[0].main == "Mist") {
                    weatherIcon.src = "images/mist.png";
                } else if (data.weather[0].main == "Snow") {
                    weatherIcon.src = "images/snow.png";
                }
        
                document.querySelector(".weather").style.display = "block";
                document.querySelector(".error").style.display = "none";
            }
        });
        
        const clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener("click", () => {
    localStorage.removeItem("lastWeather");
    document.querySelector(".weather").style.display = "none";
});

window.addEventListener("load", () => {
    const lastWeather = localStorage.getItem("lastWeather");
    if (!lastWeather) {
        clearBtn.style.display = "none";
    }
});

const addToFavoritesBtn = document.getElementById("addToFavorites");
const favoritesList = document.getElementById("favoritesList");

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function updateFavoriteIcon(city) {
    const favorites = getFavorites();
    if (favorites.includes(city)) {
      addToFavoritesBtn.classList.add("added");
    } else {
      addToFavoritesBtn.classList.remove("added");
    }
  }

function renderFavorites() {
    const favorites = getFavorites();
    favoritesList.innerHTML = ""; // Clear the existing list
  
    favorites.forEach(city => {
      const li = document.createElement("li");
  
      // Create a span to display the city name
      const citySpan = document.createElement("span");
      citySpan.innerHTML = `<i class="fa-solid fa-map-pin"></i> ${city}`; // Add location icon
      citySpan.style.cursor = "pointer";
      citySpan.style.flexGrow = "1";
      citySpan.style.fontWeight = "500"; // Optional styling

      citySpan.style.cursor = "pointer";
      citySpan.style.flexGrow = "1";
  
      // When user clicks on city name, fetch weather
      citySpan.addEventListener("click", () => {
        searchBox.value = city;
        checkWeather(city);
      });
  
      // Create the remove button
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "❌";
      removeBtn.classList.add("remove-favorite");
      removeBtn.title = "Remove from favorites";
  
      // Prevent city click when removing
      removeBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        removeFromFavorites(city);
      });
  
      // Add everything to li and append to list
      li.style.display = "flex";
      li.style.justifyContent = "space-between";
      li.appendChild(citySpan);
      li.appendChild(removeBtn);
      favoritesList.appendChild(li);
    });
      
  }

  
function removeFromFavorites(city) {
  let favorites = getFavorites();
  favorites = favorites.filter(favorite => favorite !== city); // Remove city from array
  saveFavorites(favorites); // Save updated list
  renderFavorites(); // Re-render favorites list
  updateFavoriteIcon(document.querySelector(".city").innerText);
}

addToFavoritesBtn.addEventListener("click", () => {
  const city = document.querySelector(".city").innerText;
  let favorites = getFavorites();
  if (!favorites.includes(city)) {
    favorites.push(city);
    saveFavorites(favorites);
    renderFavorites();
  }
});

// Call renderFavorites on page load
renderFavorites();

const toggleFavoritesBtn = document.getElementById("toggleFavorites");
const favoritesListElement = document.getElementById("favoritesList");

toggleFavoritesBtn.addEventListener("click", () => {
  if (favoritesListElement.style.display === "none") {
    favoritesListElement.style.display = "block";
    toggleFavoritesBtn.textContent = "Hide Favorites";
  } else {
    favoritesListElement.style.display = "none";
    toggleFavoritesBtn.textContent = "Show Favorites";
  }
});
