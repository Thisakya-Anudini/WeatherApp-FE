import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';  
import axios from 'axios';
import WeatherCard from '../components/WeatherCard';
import { IoIosPartlySunny } from "react-icons/io";
import { Link } from 'react-router-dom';

function Home() {
  const { loginWithRedirect, logout, isAuthenticated } = useAuth0();  // Auth0 hooks
  const [weatherData, setWeatherData] = useState([]);
  const [cityCodes, setCityCodes] = useState([]);
  const [cityInput, setCityInput] = useState('');

  // Fetch city codes when component mounts
  useEffect(() => {
    const fetchCityCodes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather/cities');
        setCityCodes(response.data);
      } catch (error) {
        console.error('Error fetching city codes:', error);
      }
    };

    fetchCityCodes();
  }, []);

  // Fetch weather data for all cities
  useEffect(() => {
    if (cityCodes.length > 0) {
      const fetchWeatherData = async () => {
        try {
          const responses = await Promise.all(
            cityCodes.map(cityCode =>
              axios.get(`http://localhost:5000/api/weather/${cityCode}`)
            )
          );
          setWeatherData(responses.map(response => response.data));
        } catch (error) {
          console.error('Error fetching weather data:', error);
        }
      };

      fetchWeatherData();
    }
  }, [cityCodes]);

  // Handle adding a city to the list
  const handleAddCity = async () => {
    if (cityInput.trim()) {
      try {
        const response = await axios.get(`http://localhost:5000/api/weather/${cityInput}`);
        setWeatherData([...weatherData, response.data]);
        setCityInput(''); 
      } catch (error) {
        console.error('Error adding city:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[url(./1.jpg)] bg-cover bg-center flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold text-white mt-8 flex items-center justify-center">
        <IoIosPartlySunny className="w-10 h-10 mr-4 text-white" />
        Weather App
      </h1>

      {/* Log Out Button positioned in the top-right corner */}
      {isAuthenticated && (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-blue-600 text-white py-1 px-4 rounded-md"
          >
            Log Out
          </button>
        </div>
      )}

      {/* Log In Button */}
      {!isAuthenticated && (
        <div className="mt-4 flex justify-center w-full">
          <button
            onClick={() => loginWithRedirect()}
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
          >
            Log In
          </button>
        </div>
      )}

      {/* Weather Data Section */}
      {isAuthenticated && (
        <div className="w-full mt-6 flex flex-col items-center justify-center">
          {/* Search Bar */}
          <div className="w-full flex flex-col sm:flex-row items-center justify-center mt-2 gap-4 sm:gap-8 relative">
            <input
              type="text"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              className="w-[250px] sm:w-[250px] p-2 rounded-md bg-stone-950 text-white"
              placeholder="Enter a city"
            />
            <button
              onClick={handleAddCity}
              className="bg-purple-500 text-white py-2 px-2 rounded-md w-[120px]"
            >
              Add City
            </button>
          </div>

          {/* Weather Cards Display */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 sm:gap-8 md:gap-10 w-full">
            {weatherData.map((data, index) => (
              <Link
                key={index}
                to={`/weather/${data.cityCode}`}
                state={{ weatherData: data }}  
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 flex justify-center"
              >
                <WeatherCard weather={data} />
              </Link>
            ))}
          </div>
        </div>
      )}

      <footer className="w-full bg-gray-800 text-center text-white py-4 absolute bottom-0">
        <p>2025 Fidenz Technologies</p>
      </footer>
    </div>
  );
}

export default Home;
