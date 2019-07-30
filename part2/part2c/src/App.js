import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Body from './components/Body';


function App() {
  

  const [newFilter, setFilter] = useState('')
  
  const [newBody, setBody] = useState([{name:''},{},{},{},{},{},{},{},{},{},{}])

  const [newWeather, setWeather] = useState({})


  const hook = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${newFilter}`)
      .then(response => {
        setBody(response.data)
        console.log(newBody)
      })
  }

  const weather = () => {
    axios
      .get(`http://api.apixu.com/v1/current.json?key=df52a8ede27c496482020455192707&q=${newBody[0].name}`)
      .then(response => {
        setWeather(response.data)
        console.log(newWeather)
      })
  }

  useEffect(hook, [newFilter])
  useEffect(weather, [newBody])


  const handleNewFilter = event => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }


  return ( 
    <div> 
      find countries
      <input onChange= {handleNewFilter} />

      <Body newBody={newBody} setFilter={setFilter} newWeather={newWeather}/>

    </div>
  )
}

export default App;
