import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { IoIosPartlySunny, IoIosArrowBack, IoIosCloudy } from "react-icons/io";
import { LiaCloudSolid } from 'react-icons/lia'; // Additional icon imports
import { TbCloudMinus } from 'react-icons/tb';
import { WiRainMix } from 'react-icons/wi';
import { RiMistFill } from 'react-icons/ri';

function WeatherDetails() {
  const location = useLocation();
  const weatherDetail = location.state?.weatherData;

  // Define background color and image path based on weather conditions
  const weatherDetails = {
    'clear sky': { 
      image: '/4.jpg', 
      colorClass: 'bg-gradient-to-r from-green-400 to-green-600'
    },
    'few clouds': { 
      image: '/6.jpg', 
      colorClass: 'bg-gradient-to-r from-yellow-500 to-yellow-700'
    },
    'broken clouds': { 
      image: '/5.jpg', 
      colorClass: 'bg-gradient-to-r from-purple-500 to-indigo-600'
    },
    'light rain': { 
      image: '/2.jpg', 
      colorClass: 'bg-gradient-to-r from-teal-400 to-teal-500'
    },
    'mist': { 
      image: '/3.jpg', 
      colorClass: 'bg-gradient-to-r from-red-400 to-red-500'
    },
    'default': { 
      image: '/7.jpg',
      colorClass: 'bg-gradient-to-r from-gray-400 to-gray-600'
    }
  };

  // Get the weather condition key, default to 'default' if the condition is unknown
  const weatherCondition = weatherDetail.weather.toLowerCase();
  const weatherInfo = weatherDetails[weatherCondition] || weatherDetails['default'];

  // Determine the icon based on the weather condition
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'clear sky':
        return <IoIosPartlySunny className="text-white w-10 h-10" />;
      case 'few clouds':
        return <LiaCloudSolid className="text-white w-10 h-10" />;
      case 'broken clouds':
        return <TbCloudMinus className="text-white w-10 h-10" />;
      case 'light rain':
        return <WiRainMix className="text-white w-10 h-10" />;
      case 'mist':
        return <RiMistFill className="text-white w-10 h-10" />;
      default:
        return <IoIosCloudy className="text-white w-10 h-10" />;
    }
  };

  if (!weatherDetail) {
    return (
      <div className="min-h-screen bg-[url(./1.jpg)] bg-cover bg-center flex flex-col items-center p-6">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[url(./1.jpg)] bg-cover bg-center flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-white mt-8 flex items-center justify-center">
        <IoIosPartlySunny className="w-10 h-10 mr-4 text-white" />
        Weather App
      </h1>

      <div className="w-[600px] h-[350px] bg-gray-800 shadow-lg rounded-md overflow-hidden flex flex-col relative mt-8">
        {/* Back Button with z-index to bring it to the front */}
        <div className="absolute left-0 top-0 z-10">
          <Link to="/" className="text-white mt-6 flex items-center justify-center text-lg">
            <IoIosArrowBack className="mr-2 text-2xl font-bold" />
          </Link>
        </div>

        {/* Upper part of the card with dynamic background image */}
        <div 
          className="w-[600px] h-[250px] flex flex-col justify-center items-center p-8 relative"
          style={{
            backgroundImage: `url(${weatherInfo.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h2 className="text-6xl font-bold text-white">{weatherDetail.city}</h2> {/* City  */}

          <div className="flex flex-row items-center justify-between gap-30 mt-10">
            <div className="flex flex-col items-center justify-center">
              <p className="text-2xl text-white mt-5">{weatherDetail.weather}</p> {/* Weather condition */}
              {getWeatherIcon(weatherCondition)} {/* Display the weather icon again */}
            </div>

            <p className="text-5xl font-bold text-white">{weatherDetail.temperature}°C</p>
          </div>
        </div>

        {/* Lower part of the card */}
        <div className="flex justify-between text-white bg-gray-800 w-[600px] h-[150px] p-2">
          {/* Left section: Humidity */}
          <div className="flex flex-col items-center justify-center w-1/2 text-md">
            <p>Humidity: {weatherDetail.humidity || 'N/A'} %</p>
          </div>

          {/* Right section: Wind Speed */}
          <div className="flex flex-col items-center w-1/2 text-md justify-center">
            <p>Wind Speed: {weatherDetail.windSpeed || 'N/A'} m/s</p>
          </div>
        </div>
      </div>

      <footer className="w-full bg-gray-800 text-center text-white py-4 absolute bottom-0">
        <p>2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default WeatherDetails;
