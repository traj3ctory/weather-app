import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
/**
* @author
* @function App
**/


const App = (props) => {

  const api = {
    key: "3b25419d01f65e3f70c83d72fa46545e",
    base: "http://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const search = evt => {
    if (evt.key === "Enter") {
      setLoading(true);
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setLoading(false);
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <>
      <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 20) ? 'warm' : 'app') : 'app'}>
        <main className="container-fluid">
          <div className="my-3 search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search...."
              onChange={e => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
              autoFocus
              title="Press enter to search"
              autoComplete="address-level2"
            />

          </div>

          {(typeof weather.main != "undefined") ? (
            <>
              <div className="location-box">
                <div className="location">{weather.name}, {weather.sys.country}</div>
                <div className="date">{dateBuilder(new Date())}</div>
              </div>
              {/* ========= */}
              <div className="weather-box">
                <div className="temp">{Math.round(weather.main.temp)}<sup style={{ fontSize: "3.5rem", fontWeight: "700" }}>&#8451;</sup></div>
                <div className="description">Latitude:&nbsp;{weather.coord.lat}</div>
                <div className="description">Longitude:&nbsp;{weather.coord.lon}</div>
                <div className="weather">{weather.weather[0].main}</div>
                <div className="description">{weather.weather[0].description}</div>
              </div>
            </>
          ) : (!loading && <h3 className="spin text-white">City Not Found</h3>)}
          {loading && <div className="spin"><Spinner animation="grow" variant="info" /></div>}
        </main>
      </div>
    </>
  )

}

export default App