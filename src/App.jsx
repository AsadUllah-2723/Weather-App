import axios from "axios"
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import React, { useEffect, useState } from 'react'
import banner from "../src/image.jpg"

const App = () => {
  const apikey = "e73d6edf46c3a2e6d6e78ce4042eb7ad"
  const [inputCity, setinputCity] = useState("")
  const [data, setData] = useState({})

  const fetchWeather = (cityName) => {
    if (!cityName) return
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" +cityName+ "&limit=5&appid=" +apikey
    axios.get(apiUrl).then((res) => {
      console.log("response", res)
      setData(res.data)
    }).catch((err) => {
      console.log("error", err)
    })
  }

  const handleSearch = () => {
    fetchWeather(inputCity)
  }

  const inputHandleSearch = (e) => {
    setinputCity(e.target.value)
  }

  useEffect (
    () => {
      fetchWeather()
    },[]
  )


  return (
   <div className="col-md-12">
    <div className='container'>
      <img src={banner} alt="banner" />
      <h1>Weather App</h1>
        <div className='search d-grid gap-3 col-4 mt-4'>
      <input type="text" className='form' value={inputCity} onChange={inputHandleSearch} />
      <button className='btn btn-outline-light' type='button' onClick={handleSearch}>Search</button>
      <div className='col-md-12 text-center mt-5'>
      <div className='shadow rounded wetherBox'>
        <h5 className='weatherCity'>{data?.name}</h5>
        <h6 className='tempCity'>{((data?.main?.temp) - 273.15).toFixed(2)}°C</h6>
      </div>
    </div>
    </div>
    </div>
    </div>
  )
}

export default App
