require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.get("/", function(req, res){
    //Default weather for city London
    const query = "London";
    const units = "metric";
    const appid = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +
                "&units=" + units + "&appid=" + appid;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", (data) => {
            //Getting details from weather API
            const weatherData = JSON.parse(data);
            const currentTemp = weatherData.main.temp;
            const cityName = weatherData.name;
            const currentTime = weatherData.dt;
            const sunrise = weatherData.sys.sunrise;
            const sunset = weatherData.sys.sunset;
            const currentFeel = weatherData.main.feels_like;
            const pressure = weatherData.main.pressure;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const description = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@4x.png";
            
            //Getting Sunrise Time
            let riseTime = new Date(sunrise * 1000);
            let riseHrs = riseTime.getHours();
            let riseMins = riseTime.getMinutes();
            let riseSecs = riseTime.getSeconds();
            let riseSession = "AM";

            
            if(riseHrs == 0){
                riseHrs = 12;
            }
            if(riseHrs > 12){
                riseHrs = riseHrs - 12;
                riseSession = "PM";
            }

            riseHrs = (riseHrs < 10) ? "0" + riseHrs : riseHrs;
            riseMins = (riseMins < 10) ? "0" + riseMins : riseMins;
            riseSecs = (riseSecs < 10) ? "0" + riseSecs : riseSecs;
            
            let sunriseTime = riseHrs + ":" + riseMins + " " + riseSession;
         
            //Getting Sunset Time
            let setTime = new Date(sunset * 1000);
            let setHrs = setTime.getHours();
            let setMins = setTime.getMinutes();
            let setSecs = setTime.getSeconds();
            let setSession = "AM";


            if(setHrs == 0){
                setHrs = 12;
            }
            if(setHrs > 12){
                setHrs = setHrs - 12;
                setSession = "PM";
            }

            setHrs = (setHrs < 10) ? "0" + setHrs : setHrs;
            setMins = (setMins < 10) ? "0" + setMins : setMins;
            setSecs = (setSecs < 10) ? "0" + setSecs : setSecs;

            let sunsetTime = setHrs + ":" + setMins + " " + setSession;

            //Getting Current Time
            let time = new Date(currentTime * 1000);
            let hrs = time.getHours();
            let mins = time.getMinutes();
            let secs = time.getSeconds();
            let session = "AM";

            
            if(hrs == 0){
                hrs = 12;
            }
            if(hrs > 12){
                hrs = hrs - 12;
                session = "PM";
            }

            hrs = (hrs < 10) ? "0" + hrs : hrs;
            mins = (mins < 10) ? "0" + mins : mins;
            secs = (secs < 10) ? "0" + secs : secs;
            
            let currTime = hrs + ":" + mins + " " + session;

            //Rendering Data to weather page
            res.render("weather", {
                        city: cityName,
                        time: currTime,
                        temp: currentTemp,
                        feel: currentFeel,
                        description: _.capitalize(description),
                        sunrise: sunriseTime,
                        sunset: sunsetTime,
                        pressure: pressure,
                        humid: humidity,
                        wind: windSpeed,
                        icon: imageURL
            });
        });
    });

});

app.post("/", function(req, res){
    //Weather for city from user 
    const query = req.body.userCity;
    const units = "metric";
    const appid = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +
                "&units=" + units + "&appid=" + appid;

    if(query =="" || query == null){
        return 
    } else {
        https.get(url, function(response){
            console.log(response.statusCode);
    
            response.on("data", (data) => {
                //Getting details from weather API
                const weatherData = JSON.parse(data);
                const currentTemp = weatherData.main.temp;
                const cityName = weatherData.name;
                const currentTime = weatherData.dt;
                const sunrise = weatherData.sys.sunrise;
                const sunset = weatherData.sys.sunset;
                const currentFeel = weatherData.main.feels_like;
                const pressure = weatherData.main.pressure;
                const humidity = weatherData.main.humidity;
                const windSpeed = weatherData.wind.speed;
                const description = weatherData.weather[0].description;
                const weatherIcon = weatherData.weather[0].icon;
                const imageURL = "http://openweathermap.org/img/wn/" + weatherIcon + "@4x.png";
                
                //Getting Sunrise Time
                let riseTime = new Date(sunrise * 1000);
                let riseHrs = riseTime.getHours();
                let riseMins = riseTime.getMinutes();
                let riseSecs = riseTime.getSeconds();
                let riseSession = "AM";
    
                
                if(riseHrs == 0){
                    riseHrs = 12;
                }
                if(riseHrs > 12){
                    riseHrs = riseHrs - 12;
                    riseSession = "PM";
                }
    
                riseHrs = (riseHrs < 10) ? "0" + riseHrs : riseHrs;
                riseMins = (riseMins < 10) ? "0" + riseMins : riseMins;
                riseSecs = (riseSecs < 10) ? "0" + riseSecs : riseSecs;
                
                let sunriseTime = riseHrs + ":" + riseMins + " " + riseSession;
             
                //Getting Sunset Time
                let setTime = new Date(sunset * 1000);
                let setHrs = setTime.getHours();
                let setMins = setTime.getMinutes();
                let setSecs = setTime.getSeconds();
                let setSession = "AM";
    
    
                if(setHrs == 0){
                    setHrs = 12;
                }
                if(setHrs > 12){
                    setHrs = setHrs - 12;
                    setSession = "PM";
                }
    
                setHrs = (setHrs < 10) ? "0" + setHrs : setHrs;
                setMins = (setMins < 10) ? "0" + setMins : setMins;
                setSecs = (setSecs < 10) ? "0" + setSecs : setSecs;
    
                let sunsetTime = setHrs + ":" + setMins + " " + setSession;
    
                //Getting Current Time
                let time = new Date(currentTime * 1000);
                let hrs = time.getHours();
                let mins = time.getMinutes();
                let secs = time.getSeconds();
                let session = "AM";
    
                
                if(hrs == 0){
                    hrs = 12;
                }
                if(hrs > 12){
                    hrs = hrs - 12;
                    session = "PM";
                }
    
                hrs = (hrs < 10) ? "0" + hrs : hrs;
                mins = (mins < 10) ? "0" + mins : mins;
                secs = (secs < 10) ? "0" + secs : secs;
                
                let currTime = hrs + ":" + mins + " " + session;
    
                //Rendering Data to weather page
                res.render("weather", {
                            city: cityName,
                            time: currTime,
                            temp: currentTemp,
                            feel: currentFeel,
                            description: _.capitalize(description),
                            sunrise: sunriseTime,
                            sunset: sunsetTime,
                            pressure: pressure,
                            humid: humidity,
                            wind: windSpeed,
                            icon: imageURL
                });
            });
        });
    
    }
    
});

let port = process.env.PORT;
if(port == null || port == "") {
 port = 3000;
}

app.listen(port, () => {
 console.log("Server started on port successfully")
});