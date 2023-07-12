export default function MainWeather({ data, temp, currentHour }) {
    const { weather } = data
    const todayWeather = weather[0];
    return (
        <div className="mainWeather">
            <img className="weather-icon" src={`https://openweathermap.org/img/wn/${todayWeather.icon}@2x.png`} alt={todayWeather.description} />
            <h2>{Math.round(data.temp)}°C</h2>
            <p className="description">{todayWeather.description}</p>
            <p>Max: {Math.round(temp.max)}°C / Min: {Math.round(temp.min)}°C</p>
            <div className="main-info flexbox box">
                <div><i className="demo-icon icon-rain"></i> {Math.round(currentHour.pop * 100)}%</div>
                <div><i className="demo-icon icon-gauge"></i> {data.pressure} hPa</div>
                <div><i className="demo-icon icon-wind"></i> {Math.round(data.wind_speed * 10) / 10} m/s</div>
            </div>
        </div>
    )
}