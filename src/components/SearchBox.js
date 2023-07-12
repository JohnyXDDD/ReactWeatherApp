import { useState, useEffect } from "react"
export default function SearchBox({ setLocation, city }) {
    const [searchedLocation, setSearchedLocation] = useState(city)
    const [isActive, setIsActive] = useState(false)
    const [hints, setHints] = useState(() => {
        const hints = JSON.parse(localStorage.getItem('hints')) || []
        return hints
    })
    useEffect(() => {
        async function searchLocation() {
            if (searchedLocation) {
                const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?includeDeleted=none&namePrefix=${searchedLocation}&limit=5&sort=-population`
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': 'XXXXXXXXXXXXXXXXXXXXXX',
                        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
                    }
                }
                try {
                    const response = await fetch(url, options);
                    const result = await response.json();
                    result.data && prepareHints(result.data);
                } catch (error) { }
            }
            else {
                const hints = JSON.parse(localStorage.getItem('hints')) || []
                setHints(hints);
            }
        }
        const timer = setTimeout(() => {
            searchLocation()
        }, 500)
        return () => clearTimeout(timer)
    }, [searchedLocation])
    function searchHandler(event) {
        setSearchedLocation(event.target.value)
    }

    function prepareHints(data) {
        const hints = data.map((element) => {
            return {
                city: element.city,
                id: element.id,
                lat: element.latitude.toFixed(3),
                long: element.longitude.toFixed(3)
            }
        })
        setHints(hints)
    }
    const hintsElements = hints.map((hint) => {
        return (
            <button className="hint" key={hint.id} onClick={() => changeLocation(hint)}>{hint.city}</button>
        )
    })
    function changeLocation(location) {
        setIsActive(false)
        setLocation(location)
    }
    function enableIsActive(event) {
        event.target.select()
        setIsActive(true)
    }
    function disableIsActive(event) {
        if (event.relatedTarget !== null && event.relatedTarget.className === "hint") {
            event.preventDefault()
        }
        else {
            setIsActive(false)
        }
    }
    function getLocation() {
        navigator.geolocation.getCurrentPosition(position => {
            updateLocation(position.coords.latitude.toFixed(3), position.coords.longitude.toFixed(3))
        })
    }
    function updateLocation(lat, long) {
        const location = {
            city: `Lokalizacja ${lat}°, ${long}°`,
            id: "userLocation",
            lat: lat,
            long: long
        }
        setSearchedLocation(location.city)
        setLocation(location)
    }
    const searchBoxBorderRadius = {
        borderRadius: isActive ? `16px 16px 0 0` : `16px 16px 16px 0`,
        transition: isActive ? null : "all linear 1350ms"
    }
    const hintsStyle = {
        height: isActive ? `${hints.length * 36}px` : "0px"
    }
    return (
        <div className="flexbox topLine">
            <div className="searchBox" style={searchBoxBorderRadius} >
                <input
                    type="text"
                    value={searchedLocation}
                    onChange={searchHandler}
                    onBlur={(event) => disableIsActive(event)}
                    onFocus={(event) => enableIsActive(event)}
                    placeholder="Wyszukaj lokalizację"
                />
                <div style={hintsStyle} className="hints">{hintsElements}</div>
            </div>
            <button onClick={getLocation}>
                <i className="demo-icon icon-location"></i>
            </button>
        </div>
    )
}