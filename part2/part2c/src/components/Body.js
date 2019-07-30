import React from 'react'


const Body = ({newBody, setFilter, newWeather}) => {
    if (newBody.length > 10) {
        return (
            <div>
                <p> Too many matches, specify another filter</p>
            </div>
        )
    }
    else if (newBody.length > 1) {
        
       return (
           <p>{newBody.map((country) => <div>{country.name} <button onClick={()=>setFilter(country.name)}>show</button> </div>)} </p>
       )
    }
    else if (newBody.length === 1) {
        
        return (
            <div>
                <h1>{newBody[0].name}</h1>
                <div>capital {newBody[0].capital}</div>
                <div>population {newBody[0].population}</div>
                <h3>languages</h3>
                <ul>
                    {newBody[0].languages.map((language) => <li>{language.name}</li>)}
                </ul>
                <img src={newBody[0].flag} height="100" alt="flag"/>
               <h3>Weather in {newWeather.location.name}</h3>
               <div><b>temperature:</b> {newWeather.current.temp_c}</div>
               <img src={newWeather.current.condition.icon} alt="weather" />
               <div><b>wind: </b>{newWeather.current.wind_kph} kph direction {newWeather.current.wind_dir}</div>
            </div>
        )
    }
    else {
        return (
            <p></p>
        )
    }
    
}


export default Body