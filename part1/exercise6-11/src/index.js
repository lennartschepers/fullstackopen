import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => (
    <h1>{text}</h1>
)
const Button = ({onClick,text}) => (
  <button onClick={onClick}>
    {text}
  </button>
 )


const Statistic = ({text,value}) => <tr><td>{text}</td><td>{value}</td></tr>
 


const Statitics = (props) => {
  console.log(props)
  const { good, neutral, bad } = props
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = good/total*100
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
        <table>
          <tbody>
            <Statistic text='good' value = {good}  />
            <Statistic text='neutral' value = {neutral} />
            <Statistic text='bad' value={bad} />
            <Statistic text='total' value={total} />
            <Statistic text='average' value={average} />
            <Statistic text='positive' value={positive} />
          </tbody>
        </table>
    </div>
    
  )
}


const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good+1)
  }

  const handleNeutral = () => {
    setNeutral(neutral+1)
  }

  const handleBad = () => {
    setBad(bad+1)
  }
  return (
    <div>
        <Header text={'give feedback'} />
        <Button onClick={handleGood} text='good' />
        <Button onClick={handleNeutral} text='neutral' />
        <Button onClick={handleBad} text='bad' />
        <Statitics good={good} neutral={neutral} bad={bad} />


    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)