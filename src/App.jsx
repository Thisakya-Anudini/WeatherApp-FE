import React from 'react';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import WeatherDetails from './components/WeatherDetails';

// Access environment variables from Vite
const domain = import.meta.env.VITE_AUTH0_DOMAIN ;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID ;

function App() {
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: "https://my-weather-api.com",
        scope: "read:current_weather",
      }}
      cacheLocation="localstorage"
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather/:cityCode" element={<WeatherDetails />} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;