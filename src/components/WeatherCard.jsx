import React from 'react';
import { IoIosSunny } from 'react-icons/io';
import { LiaCloudSolid, } from 'react-icons/lia';
import { TbCloudMinus } from 'react-icons/tb';
import{WiRainMix } from 'react-icons/wi';
import{RiMistFill} from 'react-icons/ri';
import { BsClouds } from "react-icons/bs";



function WeatherCard({ weather }) {
  // Define background color and image path based on weather conditions
  const weatherDetails = {
    'clear sky': { 
      image: '/4.jpg' 
    },
    'few clouds': { 
      image: '/6.jpg' 
    },
    'broken clouds': { 
      image: '/5.jpg' 
    },
    'light rain': { 
      image: '/2.jpg' 
    },
    'mist': { 
      image: '/3.jpg' 
    },
    'default': { 
      image: '/7.jpg'  
    }
  };

  // Get the weather condition key, default to 'default' if the condition is unknown
  const weatherCondition = weather.weather.toLowerCase();
  const weatherInfo = weatherDetails[weatherCondition] || weatherDetails['default'];

  // Determine the icon based on the weather condition
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'clear sky':
        return <IoIosSunny className="text-white w-10 h-10" />;
      case 'few clouds':
        return <LiaCloudSolid className="text-white w-10 h-10" />;
      case 'broken clouds':
        return <TbCloudMinus className="text-white w-10 h-10" />;
      case 'light rain':
        return <WiRainMix  className="text-white w-10 h-10" />;
      case 'mist':
        return <RiMistFill className="text-white w-10 h-10" />;
      default:
        return < BsClouds className="text-white w-10 h-10" />;
    }
  };

  return (
    <div className={`w-[320px] h-[200px] bg-gray-800 shadow-lg rounded-md overflow-hidden flex flex-col`}>
      
      {/* Upper part of the card */}
      <div 
        className="w-[320px] h-[130px] flex justify-between items-start p-3"
        style={{
          backgroundImage: `url(${weatherInfo.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Left side: City and Weather Condition */}
        <div className="flex flex-col justify-center items-center w-2/3">
          <h2 className="text-2xl font-bold text-white">{weather.city}</h2> {/* City and Country */}
          <p className="text-md text-white mt-2">{weather.weather}</p> {/* Weather condition */}
          {getWeatherIcon(weatherCondition)}
        </div>

        {/* Right side: Temperature and Icon */}
        <div className="flex flex-col w-2/3 items-center">
          <p className="text-4xl mt-5 font-semibold text-white">{weather.temperature} °C</p>


        </div>
      </div>

      {/* Lower part of the card */}
      <div className="flex justify-between text-white bg-gray-800 w-[320px] h-[70px] p-1">
        {/* Left section: Pressure, Humidity, and Visibility */}
        <div className="flex flex-col items-center w-1/2 text-xs justify-center">
          <p>Humidity: {weather.humidity || 'N/A'} %</p>
        </div>

        {/* Middle section: Wind Speed with Icon */}
        <div className="flex flex-col items-center w-1/2 text-sm justify-center">
          <p>Wind Speed: {weather.windSpeed || 'N/A'} m/s</p>
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
