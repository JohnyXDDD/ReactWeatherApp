export default function HourlyWeather({ hourly, datetime }) {
    const date = new Date(datetime * 1000)
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    const hourlyWeather = []
    for (let i = 0; i < 7; i++) {
        const element = hourly[i]
        const icon = element.weather[0].icon
        const date = new Date(element.dt * 1000)
        const hour = date.getHours() < 10 ? `0${date.getHours() + 1}` : date.getHours() + 1
        const hourlyElement = (
            <div className="hour" key={element.dt}>
                <p>{Math.round(element.temp)}°C</p>
                <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt="" />
                <p>{hour}:00</p>
            </div>
        )
        hourlyWeather.push(hourlyElement)
    }
    return (
        <div className="hourly-weather box">
            <div className="flexbox">
                <h3>Najbliższe godziny</h3>
                <p>{day}.{month}</p>
            </div>
            <div className="hourly-weather-wrapper flexbox">
                {hourlyWeather}
            </div>
        </div>
    )
}