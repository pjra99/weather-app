import './App.css';
import React, {useEffect, useState} from 'react'
import {AiOutlineSearch} from 'react-icons/ai'

function App() {

  const APIKEY = "2a61d68724c0c981652d47106c4c5c18";
  const [city, setCity] = useState("Mumbai");

  const [temporary, setTemporary] = useState("");
  const [search, setSearch] = useState("Mumbai"); 
  const [flag, setFlag] = useState(1);

  useEffect(() => {
    const fetchApi = async()=> {

      const url =`http://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${APIKEY}`
      const response = await fetch(url);

      const resJson = await response.json();

      if(resJson.main!=undefined){
        setCity(resJson.main);
        console.log(resJson.main);
        setFlag(1);
      }
      else {
        setFlag(0);
        alert("City not found!")
        
      }
    
    };
 
    fetchApi();
  }, [search])

  const monthName = ["January", "February", "March", "April",
  "May", "June", "July", "August", "September", "October","November", "December"];
  const weekDay = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dateDay = new Date().getDate().toString();
  const dateMonth = new Date().getUTCMonth();
  const day = new Date().getDay();
  return(
    <div className="container-fluid">
<div className="row main-template">
  <div className="col-md-8 left-column">
    <div className="row left-column-upper">
      <div className="col-md-12"> <h6 className="date">{dateDay} {monthName[dateMonth]}, {weekDay[day]}</h6> </div>
    </div>
    <div className="row">
      <div className="col-md-12 left-column-middle">

      </div>
    </div>
<div className="row left-column-lower">
  <div className="col-md-2">

  </div>
  <div className="col-md-3 temperature"> 
  { flag==0? (<span>__°C</span>): (<span>{city.temp}°C</span>)}
   </div>
    <div className="col-md-2 weather-location">
   {search}
    </div>
    <div className="col-md-2 weather-condition">
{<span> Humidity:{city.humidity}</span>}
        </div>
    <div className="col-md-3">
    
    </div>
</div>

  </div>
  <div className="col-md-4  right-column">
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
     <li>Humidity: {flag==0? <span>_</span>:<span>{city.humidity}</span>}</li>
     <li>Pressure:  {flag==0? <span>_</span>:<span>{city.pressure}</span>}</li>
     <li>Max Temperature:  {flag==0? <span>_</span>:<span>{city.temp_max}</span>}°C</li>
     <li>Min Temperature:  {flag==0? <span>_</span>:<span>{city.temp_min}</span>}°C</li>
   </ul>
    </div>
  </div>
    </div>
    </div>
  );
}

export default App;
