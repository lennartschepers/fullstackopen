import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({onClick, text}) => (
    <button onClick={onClick}> {text} </button>
)


const HighestAnecdote = ({votes, anecdotes}) => {

    const index = votes.indexOf(Math.max.apply(null,votes))
    if (Math.max.apply(null, votes) === 0) {
        return (
            <div>Vote at least once to view the result</div>
        )
    }
    return (
        <div>
            <div>{anecdotes[index]}</div>
            <div>has {Math.max.apply(null,votes)} votes </div>
        </div>
    )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(props.anecdotes.length))


  const handleclick = () => (
    setSelected(Math.floor(Math.random() * ((props.anecdotes.length-1) - 0 + 1)) + 0)
  )
  const handlevote = () => {
      const newState = [...votes]
      newState[selected] += 1
      return (
          setVotes(newState)
      )
    }
  return (
    <div>
        <h1>Anecdote of the day</h1>
        <div>
            {props.anecdotes[selected]}
        </div>
        <div>has {votes[selected]} votes </div>
      <Button onClick={handlevote} text={'vote'} />
      <Button onClick={handleclick} text={'next anecdote'} />
      <h1>Anecdote with the most votes</h1>
      <HighestAnecdote votes={votes} anecdotes={props.anecdotes} />
      

    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  
  document.getElementById('root')
)