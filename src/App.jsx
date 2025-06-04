import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const key = "636ee87aad4778c0051159b4d45de526";

function App() {

  const [weather, setWeather] = useState("")
  const [nameUi, setNameUi] = useState("");
  const [time, setTime] = useState("");
  const [temp, setTemp] = useState("");
  const [name, setName] = useState("");
  const [response, setReponse] = useState("");
  const [userLocation, setUserLocation] = useState("");
  const [lon, setLon] = useState("")
  const [lat, setLat] = useState("")
  const [icon, setIcon] = useState("")
 

  useEffect(() => {
    getUserLocation()
  }, []);

  const getBackgroundImage = (weatherType) => {
  const weatherImages = {
    Clear: "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=",
    Rain: "https://static.vecteezy.com/system/resources/thumbnails/042/146/518/small_2x/ai-generated-beautiful-rain-day-view-photo.jpg",
    Drizzle: "https://media.istockphoto.com/id/1257951336/photo/transparent-umbrella-under-rain-against-water-drops-splash-background-rainy-weather-concept.jpg?s=612x612&w=0&k=20&c=lNvbIw1wReb-owe7_rMgW8lZz1zElqs5BOY1AZhyRXs=",
    Thunderstorm: "https://media.istockphoto.com/id/517643357/photo/thunderstorm-lightning-with-dark-cloudy-sky.jpg?s=612x612&w=0&k=20&c=x3G3UijRPVGFMFExnlYGbnQtnlH6-oUoMU48BTkc0Os=",
    Clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63?auto=format&fit=crop&w=1950&q=80",
    Mist: "https://www.shutterstock.com/image-photo/landscape-heavy-foggy-road-winter-260nw-1594521517.jpg",
    Fog: "https://www.ksla.com/resizer/LU_xFilxTouXsrgXzyyq0irEdNs=/arc-photo-gray/arc3-prod/public/JFDZ7U577FFBTCTSLUKDQDSAYQ.png",
    Haze: "https://d2h8hramu3xqoh.cloudfront.net/blog/wp-content/uploads/2022/08/Hazy-Skies-scaled.webp",
    Smoke: "https://media.9news.com/assets/KUSA/images/adcfd173-dd79-480b-9f78-f26b2fa254c1/adcfd173-dd79-480b-9f78-f26b2fa254c1_1920x1080.jpg",
  };

 return `url(${weatherImages[weatherType] || "https://images.unsplash.com/photo-1508923567004-3a6b8004f3d9?auto=format&fit=crop&w=1950&q=80"})`;
};
  useEffect(()=>{
    setBgImage(getBackgroundImage(weather))
  },[weather])

   const [bgImage, setBgImage] = useState(getBackgroundImage("clear"))
  


  const fetchData = async () => {
    if (!name.trim()) {
    alert("Please enter a city name");
    return;
  }
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${
          name || "karachi"
        }&appid=${key}&units=metric`
      );
      console.log(response.data);
      setNameUi(response.data.name);
      setTime(response.data.timezone);
      setTemp(response.data.main.temp);
      setWeather(response.data.weather[0].main)
      setName("");
setBgImage(getBackgroundImage(response.data.weather[0].main));
    } catch (err) {
      console.log(err);
      alert("Invalid city name. Please try again.");
    }
  };

  const fetchDataByLocation = async () => {
    try {
      const lat = userLocation.latitude;
      const lon = userLocation.longitude;
      console.log(lat);
      console.log(lon);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
      );
      setReponse(response.data)
      setNameUi(response.data.name);
      setTime(response.data.timezone);
      setTemp(response.data.main.temp);
      setWeather(response.data.weather[0].main)
setBgImage(getBackgroundImage(response.data.weather[0].main));
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }

    function success(position) {
      console.log("position", position);
      setUserLocation(position.coords);
      setLat(position.coords.latitude)
      setLon(position.coords.latitude)
    }

    function error() {
      // alert("Sorry, no position available.");
      fetchDataByLocation();
    }
  };

  useEffect(() => {
    if (userLocation) {
      fetchDataByLocation();
    }
  }, [userLocation]);
  return (
    <>
    <div style={{
      backgroundImage:bgImage,
      height: "100vh",
  width: "100vw",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize:" 100% 100%"
    }}>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
        >
        <div className="weather-container"
          style={{
            width: "350px",
            height: "300px",
            border:"2px solid black",
            borderRadius:"10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: "20px",
            boxShadow:"4px 4px 3px 2px"
          }}
          >
          <h1 style={{
            color:"#FFFFFF"
          }}>Weather App</h1>
          <div className="weather-input" style={{
            display:"flex",
            gap:"5px"
          }}>
            <input
              type="text"
              placeholder="Enter City Name"
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key == "Enter" && fetchData()}
              value={name}
              style={{
                textAlign:"center",
                height:"30px",
                borderRadius:"5px",
                border:"none",
              }}
              />
            <button onClick={fetchData} style={{
              cursor:"pointer",
              border:"none",
              borderRadius:"5px"
            }}>Search</button>
          </div>
          <h3>Name:{nameUi || "karachi"}</h3>
          <h3>Temp:{temp}</h3>
          <h3>Date:{new Date().toDateString()}</h3>
        </div>
      </div>
              </div>
    </>
  );
}

export default App;