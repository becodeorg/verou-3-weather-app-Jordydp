//import from config.js
import Data from "./config.js";

//get inputfield
const searchField = document.getElementById("searchfield");
console.log(searchField);

const submit = document.querySelector("button")

//create function to get info from api
const fetchData = (event) => {
    //prevent default
    event.preventDefault();

    //get value of inputfield
    const searchFieldInput = searchField.value;

    //console.log(searchFieldInput);
    //fetch api + value of input field + metric + api key

    fetch("http://api.openweathermap.org/data/2.5/weather?q="+ searchFieldInput +"&appid="+Data.key +"&units=metric")
    .then(response => response.json())
    .then(data => {
        let weatherinfo = data;
        console.log(weatherinfo);
        const lon = weatherinfo.coord.lon;
        console.log(lon);
        const lat = weatherinfo.coord.lat;
        console.log(lat);
        fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&exclude=&appid="+ Data.key+"&units=metric")
        .then(response => response.json())
        .then(info => console.log(info))
    });


        
        
}
//addEventListener on keyup use event
submit.addEventListener('click' , fetchData )




