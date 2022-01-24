//import from config.js
import Data from "./config.js";

//get inputfield
const searchField = document.getElementById("searchfield");
console.log(searchField);
//create function to get info from api
const event = () => {

    //get value of inputfield
    const searchFieldInput = searchField.value;
    //console.log(searchFieldInput);
    //fetch api + value of input field + metric + api key
    fetch("http://api.openweathermap.org/data/2.5/weather?q="+ searchFieldInput +"&appid="+Data.key +"&units=metric")
    .then(response => response.json())
    .then(data => console.log(data))
}
//addEventListener on keyup use event
searchField.addEventListener('keyup' , event )




