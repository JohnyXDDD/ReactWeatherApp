export default function DailyWeather({ daily }) {
    const dailyArray = daily.slice(1)
    const weekdays = ['nd', 'pon', 'wt', 'śr', 'czw', 'pt', 'sob']
    const weatherArray = dailyArray.map(day => {
        const date = new Date(day.dt * 1000)
        const dayNum = date.getDay()
        const dayName = weekdays[dayNum]
        const icon = day.weather[0].icon
        const desc = day.weather.description
        const dayDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
        const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
        return (
            <div key={`${day.dt}-d`} className="dailyWeather">
                <h4>{dayName}. ({dayDate}.{month})</h4>
                <div className="dailyWeather--imgBox">
                    <img src={`https://openweathermap.org/img/wn/${icon}.png`} alt={desc} />
                </div>
                <p>{Math.round((day.pop) * 100)}%</p>
                <p>{day.pressure} hPa</p>
                <p>{Math.round(day.temp.day)}°C / {Math.round(day.temp.night)}°C</p>
            </div>
        )
    })
    return (
        <div className="daily-weather box">
            <h3>Najbliższe dni</h3>
            {weatherArray}
        </div>
    )
}