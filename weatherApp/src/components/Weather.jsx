import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

function Weather() {
    const inputref = useRef()
    const [weatherData, setWeatherData] = useState(false)
    const allIcons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,
    }


    const  search = async (city)=>{
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const res = await fetch(url)
            const data = await res.json()
            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity:data.main.humidity,
                windSpeed: data.wind.speed,
                temperature:Math.floor(data.main.temp),
                location: data.name,
                icon: icon
            })

        } catch (error) {
            throw error
        }
    }


    useEffect(()=> {
        search("london")
    }, [])

  return (
    <div className='self-center  p-10 rounded-md bg bg-gradient-to-tr from-[#2f4680] to-[#500ae4] flex items-center flex-col mx-auto'>
        <div className='flex items-center gap-3'>
            <input ref={inputref} className='h-12 border-none outline-none rounded-md pl-6 text-[#626262] bg-[#ebfffc] text-xl' type="text" placeholder='Search' />
            <img onClick={()=> search(inputref.current.value)} className='w-12 p-4 rounded-md bg-[#ebfffc] cursor-pointer' src={search_icon} alt="" />
        </div>
        <img className='w-36 my-7 mx-0' src={weatherData.icon} alt="" />
        <p className='text-white text-7xl leading-none'>{weatherData.temperature}°C</p>
        <p className='text-white text-4xl'>{weatherData.location}</p>
        <div className="w-[100%] mt-9 text-white flex justify-between">
            <div className="flex items-start gap-3 text-xl">
                <img src={humidity_icon} alt="" className='w-6 mt-2' />
                <div>
                    <p>{weatherData.humidity} %</p>
                    <span className='block text-xs'>Humidity</span>
                </div>
            </div>
            <div className="flex items-start gap-3 text-xl">
                <img src={wind_icon} alt="" className='w-6 mt-2' />
                <div>
                    <p>{weatherData.windSpeed} km/h</p>
                    <span className='block text-xs'>wind</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
