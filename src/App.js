import { useEffect, useState } from "react" //data do dnia
import MainWeather from "./components/MainWeather"
import HourlyWeather from "./components/HourlyWeather"
import DailyWeather from "./components/DailyWeather"
import SearchBox from "./components/SearchBox"
import loadingGif from "./images/Loading.gif"
import axios from "axios"
function App() {
    const [weatherData, setWeatherData] = useState(null)
    const [location, setLocation] = useState(() => {
        const lsLocation = JSON.parse(localStorage.getItem('location'))
        return lsLocation || {
            city: "Warsaw",
            id: 92150,
            lat: "52.230",
            long: "21.011"
        }
    })
    useEffect(() => {
        if (location) {
            const localStorageLocation = JSON.stringify(location)
            localStorage.setItem("location", localStorageLocation)
            const localStorageHints = JSON.parse(localStorage.getItem('hints'))
            const hints = localStorageHints || []
            const newHints = hints.filter(h => {
                let condition = false
                if (h.id !== location.id) {
                    if (h.lat !== location.lat && h.long !== location.long) {
                        condition = true
                    }
                }
                return h && condition
            })
            newHints.unshift(location)
            localStorage.setItem("hints", JSON.stringify(newHints.slice(0, 5)))
            const options = {
                method: 'GET',
                url:'https://weatherappapiserver.onrender.com/weather',
                params:{lat:location.lat,long:location.long}
            }
            axios.request(options).then(response =>{
                const data=response.data
                setWeatherData(data)
            }).catch(err => {})
        }
    }, [location])
    const city = location ? location.city : ""
    return (
        <main className="weather-app">
            <div className="weather-screen">
                <SearchBox setLocation={setLocation} city={city} />
                {weatherData ?
                    <>
                        <MainWeather
                            data={weatherData.current}
                            temp={weatherData.daily[0].temp}
                            currentHour={weatherData.hourly[0]}
                        />
                        <HourlyWeather hourly={weatherData.hourly} datetime={weatherData.current.dt} />
                        <DailyWeather daily={weatherData.daily} />
                    </>
                    :
                    <div className="loading">
                        <img src={loadingGif} alt="loadingGif" />
                    </div>
                }
            </div>
        </main>

    )
}

export default App;
