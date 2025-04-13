import { useState } from 'react';
import './App.css';

function App() {

  let [city , setCity]=useState('');
  let [data , setData]=useState();
  let [isLoading , setLoading]=useState(false);

  let getCity=(event)=>{
    setLoading(true);
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=751d66e130befad396405dc13796a57c&units=metric`)
    .then((res)=>res.json())
    .then((finalRes)=>{
      if(finalRes.cod == 404){
        setData(undefined);
      }
      else{
        setData(finalRes);
      }
      setLoading(false);
    })
    event.preventDefault();
    setCity('');
  }

  return (
      <div className={`container main-cnt`}>
        <div className='askDiv'>
          <h1><b>Simple Weather App</b></h1>
          <br></br>
          <form onSubmit={getCity}>
            <input type='text' placeholder='Enter the City Name..' value={city} onChange={(e)=>setCity(e.target.value)} required></input>
            <button type="submit" className="btn btn-primary">Check Temp.</button>
          </form>
        </div>
        <div className="container ansDiv"> 
        {isLoading && <img src='loading.gif' alt="Loading..." />}
        {
          !isLoading && data ? (
            <>
              <h3>{data.name}, {data.sys.country}</h3>
              <h3>{data.main.temp}°C</h3>
              <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} alt="Weather Icon" />
              <h2>{data.weather[0].description}</h2>
            </>
          ) :
          <h3>No Data Found</h3>
        }
      </div>
      </div>
  );
}

export default App;
