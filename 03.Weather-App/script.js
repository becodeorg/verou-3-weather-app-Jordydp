//import from config.js
import Data from "./config.js";


//array of weekdays
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday","Saturday"];

//d = date
let d = new Date();
// n = date in number 0->6
let n = d.getDay();
console.log(n)
/*for(let i = 0; i < weekdays.length; i++){
    let x = (n+i) % weekdays.length;

    let weekday = weekdays[x];

 let weekDaysInOrder = weekday;
}*/
//get weekdays slice is used to split the array started from n and n = today
//then i concat = combine 2 arrays  my weekdays slice them again start from 0(so start) till n
const weekDaysInOrder = weekdays.slice(n).concat(weekdays.slice(0,n));
console.log(weekDaysInOrder);



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
                        cardCreater(days[i], i);
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

const cardCreater = (day, i) => {
    console.log(day);
    
    // create a card
    const searchFieldInput = searchField.value;
    console.log(searchFieldInput);

    const newCard = document.createElement("article");
    newCard.classList.add("card");
    section.appendChild(newCard);

    //create cardTitle
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add('cardTitle');
    cardTitle.innerText = searchFieldInput;
    newCard.appendChild(cardTitle);

    const dayTitle = document.createElement("h3");
    dayTitle.innerText= weekDaysInOrder[i];
    newCard.appendChild(dayTitle);


    
    
 
    



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



const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
