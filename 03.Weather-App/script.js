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
const fetchImage = () => {
    fetch("https://api.unsplash.com/search/photos?query="
        + getSearchfieldInput() + 
        "&client_id=" + Data[1].UnsplashData)
        .then(response => response.json())
        .then(CreateImgOfCity);
}

const getSearchfieldInput = () => {
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
    //console log this info
    // console.log(lonAndLat);
    // get longitude from first api and stor in variable
    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + Data[0].key + "&units=metric")
    .then(response => response.json())
    .then(data => {
        //store data from fetch inside a variable
        const firstApi = data;
        fetchWeatherdata(firstApi);
        
        return firstApi;
    });
    
}

const fetchWeatherdata = (firstApi) => {
    
    //get Longitude from first api and store in variable
    const lon = firstApi.coord.lon;
    //get latitude from first api and store in variable
    const lat = firstApi.coord.lat;

    fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + Data[0].key + "&units=metric")
    .then(response => response.json())
    .then(info => {
        let weatherInfo = info;
        const days = weatherInfo.daily;
        getWeekDaysInOrder(days, firstApi); 
    });
}


const getWeekDaysInOrder = (days, firstApi) => {
    //array of weekdays
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    //d = date
    let d = new Date();
    // n = date in number 0->6
    let n = d.getDay();
    for(let i = 0; i < 5 ; i++){
        let x = (n+i) % weekdays.length;
        let weekday = weekdays[x];
        cardCreater(days[i],weekday, firstApi);
    }

}

//create a card 
const cardCreater = (day, weekday, firstApi) => {
    console.log(day);
    console.log(firstApi);
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
    console.log({day});
    let sunrise = day.sunrise;
    console.log({sunrise});
    let sunset = day.sunset;
    let timezone = firstApi.timezone;
    console.log({timezone});
    let sunriseOffset = (sunrise + timezone) - 3600 ;
    console.log({sunriseOffset});
    let sunsetOffset = (sunset + timezone)-3600 ;


    const sunriseDisplay = document.createElement("span");
    sunriseDisplay.innerText = "The sun will rise @" + " " + getSunriseTime(sunriseOffset);
    textContainerRight.appendChild(sunriseDisplay);
    //sunset
    const sunsetDisplay = document.createElement("span");
    sunsetDisplay.innerText = "The sun will set @" + " " + getSunsetTime(sunsetOffset);
    textContainerRight.appendChild(sunsetDisplay);
}





const getSunriseTime = (sunriseOffset) => {
    
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(sunriseOffset * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    //let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2)
    return formattedTime;
}

const getSunsetTime = (sunsetOffset) =>{

    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    let date = new Date(sunsetOffset * 1000);
    // Hours part from the timestamp
    let hours = date.getHours();
    // Minutes part from the timestamp
    let minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    //let seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    let formattedTime = hours + ':' + minutes.substr(-2)
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