//import from config.js
import Data from "./config.js";

//get inputfield
const searchField = document.getElementById("searchfield");
//console.log(searchField);

const submit = document.querySelector("button")

//get section
const section = document.querySelector("section");
//date creation

//create function to get info from api
const fetchData = (event) => {
    //prevent default
    event.preventDefault();

    //get value of inputfield
    const searchFieldInput = searchField.value;

    //console.log(searchFieldInput);
    //fetch api + value of input field + metric + api key

    fetch("http://api.openweathermap.org/data/2.5/weather?q=" + searchFieldInput + "&appid=" + Data.key + "&units=metric")
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
            //console.log(lat);

            //fetch new api with lat en lon + api key from config
            fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=&appid=" + Data.key + "&units=metric")
                .then(response => response.json())
                .then(info => {
                    let weatherInfo = info;
                    // console.log(weatherInfo);
                    const days = weatherInfo.daily;
                    //console.log(days);
                    for (let i = 0; i < 5; i++) {
                        cardCreater(days[i]);
                    }











                });
        });

}
//addEventListener on click use event
submit.addEventListener('click', fetchData)


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

const cardCreater = (day) => {
    console.log(day);
    // create a card
    const searchFieldInput = searchField.value;
    console.log(searchFieldInput);

    const newCard = document.createElement("article");
    newCard.classList.add("card");
    section.appendChild(newCard);

    //create cardTitle
    const cardTitle = document.createElement("h3");
    cardTitle.classList.add('cardTitle');
    cardTitle.innerText = searchFieldInput;
    newCard.appendChild(cardTitle);

    //card icon
    const icon = document.createElement("img");
    icon.src = "http://openweathermap.org/img/wn/" + day.weather[0].icon + "@2x.png";
    newCard.appendChild(icon);

    //container for text containers
    const textContainer = document.createElement("div");
    textContainer.classList.add("textcontainer");
    newCard.appendChild(textContainer);

    // text container left = temp + description
    const textContainerLeft = document.createElement("div");
    textContainerLeft.classList.add("textcontainerleft");
    textContainer.appendChild(textContainerLeft);
    const temp = document.createElement("p");
    temp.innerText = day.temp.day + "°";
    textContainerLeft.appendChild(temp);

    //weather description
    const description = document.createElement("p");
    description.innerText = day.weather[0].description;
    textContainerLeft.appendChild(description);

    //create textcontainer right for spans
    const textContainerRight = document.createElement("div");
    textContainerRight.classList.add("textcontainerright");
    textContainer.appendChild(textContainerRight);



    let sunriseTime = day.sunrise
    let sunsetTime = day.sunset

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
    //create sunrise
    const sunrise = document.createElement("span");
    sunrise.innerText = "sunrise:" + " " + getTime(sunriseTime);
    textContainerRight.appendChild(sunrise);
    //sunset
    const sunset = document.createElement("span");
    sunset.innerText = "sunset:" + " " + getTime(sunsetTime);
    textContainerRight.appendChild(sunset);
    //min max temp
    const minMaxTemp = document.createElement("span");
    minMaxTemp.innerText = day.temp.min + "°" + " | " + day.temp.max + "°"; 
    textContainerRight.appendChild(minMaxTemp);
    



}