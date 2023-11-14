import { useState } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState({})
  const [location,setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=1d0c8b16e915748055465ac0df20345f`

  const searchLocation = (event) =>{
    if(event.key ==="Enter")
    {
      axios.get(url).then(res=>{
        setData(res.data)
        console.log(res.data);
      })
      setLocation('')
    }
  }

  return (
    
    <div className="app">
      <div className="search">
        <input type="text" 
        value={location}
        placeholder='Enter Location' 
        onChange={event=>setLocation(event.target.value)} 
        onKeyPress={searchLocation} />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
           <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{Math.floor(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>



        { data.name != undefined &&
          <div className="bottom">
          <div className="feels">
            {data.main ? <p className='bold'>{Math.floor(data.main.feels_like)}°C</p> : null}
            <p className='text'>Feels Like</p>
          </div>
          <div className="humidity">
          {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            <p className='text'>Humidity</p>
          </div>
          <div className="wind">
          {data.wind ? <p className='bold'>{Math.floor(data.wind.speed)}MPH</p> : null}
            <p className='text'>Wind Speed</p>
          </div>
        </div>
        }

      </div>
    </div>
  )
}

export default App
