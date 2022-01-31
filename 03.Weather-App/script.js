//import from config.js
import Data from "./config.js";


//get inputfield
const searchField = document.getElementById("searchfield");
const submit = document.querySelector("button");

//display the data fetched
const displayfetchData = (event) => {
    //prevent default
    event.preventDefault();
    const cityInput = getSearchfieldInput();
    fetchImage(cityInput);
    fetchData(cityInput);
    
}
const fetchImage = () =>{
    fetch("https://api.unsplash.com/search/photos?query="
        + getSearchfieldInput() + 
        "&client_id=" + Data[1].UnsplashData)
        .then(response => response.json())
        .then(CreateImgOfCity);
}

const getSearchfieldInput = () =>{
    //get value of inputfield
    const searchField = document.getElementById("searchfield");
    const searchFieldInput = searchField.value;
    return searchFieldInput;
}

const CreateImgOfCity = (image) =>{
    //select body for background change
    const body = document.querySelector("body");
    let background = image.results[1].urls.raw;
    body.style.backgroundImage = "url(" + background + ")";
}

const fetchData = (cityInput) => {
    
    //fetch api + value of input field + metric + api key
        fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + Data[0].key + "&units=metric")
        .then(response => response.json())
        .then(data => {
            //store data from fetch inside a variable
            let lonAndLat = data;
            //console log this info
            // console.log(lonAndLat);
            // get longitude from first api and stor in variable
            const lon = lonAndLat.coord.lon;
            //console.log(lon);
            //get latitude from first api and store in variable
            const lat = lonAndLat.coord.lat;
            fetchWeatherdata(lat, lon)
        });
        
}

const fetchWeatherdata = (lon, lat) => {
    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + Data[0].key + "&units=metric")
    .then(response => response.json())
    .then(info => {
        let weatherInfo = info;
        const days = weatherInfo.daily;
        getWeekDaysInOrder(days); 
    });
}


function getWeekDaysInOrder(days) {
    //array of weekdays
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //d = date
    let d = new Date();
    // n = date in number 0->6
    let n = d.getDay();
    for(let i = 0; i < 5 ; i++){
        let x = (n+i) % weekdays.length;
        let weekday = weekdays[x];
        cardCreater(days[i],weekday);
    }

}
const cardCreater = (day,weekday) => {
    //get section
    const section = document.querySelector("section");

    const newCard = document.createElement("article");
    newCard.classList.add("card");
    section.prepend(newCard);

    //create cardTitle
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add('cardTitle');
    cardTitle.innerText = "The weather in" + " " + getSearchfieldInput();
    newCard.appendChild(cardTitle);


    //adding days to card
    const dayTitle = document.createElement("h2");
    dayTitle.innerText = "on" + " " + weekday + " is";
    newCard.appendChild(dayTitle);

    //icon + description div
    const iconHolder = document.createElement("div");
    iconHolder.classList.add("iconholder");
    newCard.appendChild(iconHolder);


    //card icon
    const icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
    iconHolder.appendChild(icon);

    //weather description
    const description = document.createElement("p");
    description.innerText = day.weather[0].description;
    iconHolder.appendChild(description);

    //container for text containers
    const textContainer = document.createElement("div");
    textContainer.classList.add("textcontainer");
    newCard.appendChild(textContainer);

    // text container left = temp + description
    const textContainerLeft = document.createElement("div");
    textContainerLeft.classList.add("textcontainerleft");
    textContainer.appendChild(textContainerLeft);

    //create h3 for the temprature
    const temp = document.createElement("h1");
    temp.innerText = day.temp.day + "°C";
    textContainerLeft.appendChild(temp);

    //min max temp
    const feelsLike = document.createElement("span");
    feelsLike.innerText = "Feels like:" + " " + day.feels_like.day + "°C";
    textContainerLeft.appendChild(feelsLike);

    //create textcontainer right for spans
    const textContainerRight = document.createElement("div");
    textContainerRight.classList.add("textcontainerright");
    textContainer.appendChild(textContainerRight);

    //create sunrise
    let sunriseTime = day.sunrise;
    let sunsetTime = day.sunset;    
    const sunrise = document.createElement("span");
    sunrise.innerText = "The sun will rise @" + " " + getTime(sunriseTime);
    textContainerRight.appendChild(sunrise);
    //sunset
    const sunset = document.createElement("span");
    sunset.innerText = "The sun will set @" + " " + getTime(sunsetTime);
    textContainerRight.appendChild(sunset);
}





const getTime = (time) => {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(time * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

//addEventListener on click use event
submit.addEventListener('click', displayfetchData);

//event at Enter
searchField.addEventListener("keyup", function (KeyboardEvent) {
    if (KeyboardEvent === 13) {
        displayfetchData();
        };
    })