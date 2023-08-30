


// fetches data from the local host php server with the help of one parameter : city
function weatherData(name) {
    
        fetch("https://api.openweathermap.org/data/2.5/weather?lat=27.58&lon=85.50&appid=4b5c9e30be2d6330c99893c75144aba1&units=metric" + name)
        .then(response => response.json())
        .then(response => {

              const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
              const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
              const da = new Date();
              const m = new Date();
              const d = new Date();
              const y = new Date();
              let day = days[da.getDay()];
              let month = months[m.getMonth()];
              document.getElementById("demoday").innerHTML = day;
              document.getElementById("demomonth").innerHTML = month;
              document.getElementById("demodate").innerHTML = d.getDate();
              document.getElementById("demoyear").innerHTML = y.getFullYear();
              console.log(response);
              // displays the name of the city from search bar
              document.querySelector(".city").innerText = name;
  // displays the weather description of the city mentioned in the search bar
              document.querySelector(".description").innerText = response.weather[0].description;

              // displays the temperature of the city mentioned in the search bar\
                const kelvinTemperature = response.main.temp;
                const celsiusTemperature = kelvinTemperature - 273.15;

                document.querySelector(".temp").innerHTML = celsiusTemperature.toFixed(1) + "°C";
                //  document.querySelector(".temp").innerHTML = response.main.temp + "°F";
              // displays an image which signifies the weather of the city 
              document.querySelector(".iconurl").src ="https://openweathermap.org/img/wn/"+  response.weather[0].icon +"@4x.png";
              // displays the pressure of the city mentioned in the search bar in hPa
              document.querySelector(".pressure").innerText = response.main.pressure + "    mbar";
              // displays the humidity of the city in percentage
              document.querySelector(".humidity").innerText = response.main.humidity + "    %";
              // displays the wind speed in m/s
              document.querySelector(".wind").innerText = response.wind.speed + "    km/h";
            //store datas in the local storage
              localStorage.city= name;
              localStorage.description=response.Description;
              localStorage.temp=response.Temperature + "°C";
              localStorage.iconurl=response.Icon;
              localStorage.pressure=response.Pressure + "    mbar";
              localStorage.humidity= response.Humidity + "    %";
              localStorage.wind= response.Wind_speed + "    km/h";
              localStorage.when=Date.now();
            })

            .catch(err =>{
                console.log(err);
            })

};

function cityName(){
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js').then(function(registration) {
                // Registration was successful
                console.log('ServiceWorker registration successful');
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
        });
    }
     // stores the text content of the search bar in city when the button is pressed
    let city =document.querySelector(".search-bar").value;
    if (city == ""){
        city = "panauti";
    }
    // calls the weatherData function and takes one parameter: city
    weatherData(city);


};
// data is shown when enter key is pressed
cityName();
document
      .querySelector(".search-bar")
      .addEventListener("keyup", function(event) {
          if (event.key == "Enter") {
              // data is shown when enter key is pressed
              cityName();
          }
      });
  // this function is called when the search button is clicked
