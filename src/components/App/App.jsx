import { useState } from "react";
import './App.css';
import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';

function App() {
  const [weatherData, setWeatherData] = useState('clothes');

  return (
 <div className="page">
  <div className="page__content">
    <Header />
    <Main weatherData={weatherData} />
    </div>
 </div>
 );
}

export default App

