import './App.css';
import React, {useEffect, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

function App() {

  const APIKEY = "2a61d68724c0c981652d47106c4c5c18";
  const [city, setCity] = useState("Mumbai");

  const [temporary, setTemporary] = useState("");
  const [search, setSearch] = useState("Mumbai"); 

  useEffect(() => {
    const fetchApi = async()=> {

      const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${APIKEY}`
      const response = await fetch(url);

      const resJson = await response.json();

      setCity(resJson.main);
      console.log(resJson.main);
    };
 
    fetchApi();
  }, [search])

  const dateNTime = new Date().toString();
  return(
    <div className="container-fluid">
<div className="row main-template">
  
  <div className="col-lg-8 left-column">
   <h6 className="date">{dateNTime}</h6> 
<div className="row left-column-row">
  <div className="col-lg-2">

  </div>
  <div className="col-lg-3 temperature"> 
  { !city.temp? (<span>__°C</span>): (<span>{city.temp}°C</span>)}
   </div>
    <div className="col-lg-2 weather-location">
   {search}
    </div>
    <div className="col-lg-2 weather-condition">
      {!city.humidity? (<span>Humidity:_</span>):(<span>Humidity:{city.humidity}</span>)}
        </div>
    <div className="col-lg-3">
    
    </div>
</div>

  </div>
  <div className="col-lg-4  right-column">
    <div className="row locations">
    <input type="text" name="city" className="search-city" onChange={(event)=>{
      setTemporary(event.target.value)
    }} placeholder="Search city" />
    <button className="getWeather" onClick={()=>{
      setSearch(temporary);
    }}>Go</button>
<ul>  
  <li onClick={()=>setSearch("Delhi")}>Delhi </li>
  <li onClick={()=>setSearch("Mumbai")}>Mumbai</li>
  <li onClick={()=>setSearch("Kolkata")}>Kolkata</li>
  <li onClick={()=>setSearch("Patna")}>Patna</li>
</ul>

    </div>
    <div className="row weather-details">
    <ul>
   <h5 className="weather-details-header">Weather Details</h5>
     <li>Humidity: {city.humidity}</li>
     <li>Pressure: {city.pressure}</li>
     <li>Max Temperature: {city.temp_max} °C</li>
     <li>Min Temperature: {city.temp_min} °C</li>
   </ul>
    </div>
  </div>
    </div>
    </div>
  );
}

export default App;
