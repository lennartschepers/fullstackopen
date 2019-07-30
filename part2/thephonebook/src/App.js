import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import DelButton from './components/DelButton'
import Notification from './components/Notification'

const App = () => {

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  const [ persons, setPersons] = useState([]) 

  const [ newName, setNewName ] = useState('')

  const [ newNumber, setNewNumber ] = useState('')

  const [newFilter, setFilter] = useState('')

  const [message, setMessage] = useState(null)

  const handleNewFilter = event => {
    console.log('filter click', event.target.value)
    setFilter(event.target.value)
  }

  const personsToShow = newFilter === ''
    ? persons
    : persons.filter(person => person.name.toUpperCase().includes(newFilter.toUpperCase()))

  const handleNewName = event => {
    console.log('name click', event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = event => {
    console.log('number click', event.target.value)
    setNewNumber(event.target.value)
  }

  const addPersons = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map((person) => person.name).includes(newName) ) {
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
        const person =persons.find((person) => person.name === newName)
        personService
          .update(person.id, {...person, number: newNumber})
          .then(response => {
            setPersons(persons.map(item => item.id !== person.id ? item : response.data))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log('fail')
            setPersons(persons.filter(p => p.id !== person.id))
            
            setMessage(
              `information of ${newName} has already been removed from the server`
            )
            setTimeout(() => {
              setMessage(null)
            },5000)

          })
      }

    } else if (personObject.name === "" || personObject.number ==="") {
      window.alert('one or more fields are missing')
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setMessage(
            `added ${newName}`
          )
          setTimeout(() => {
            setMessage(null)
          },5000)
        })
    }
  }
  
  const rows = () => personsToShow.map(person =>
    <Person 
      name={person.name}
      number={person.number}
      key={person.name} 
      button={<DelButton del={ () => {
        if (window.confirm(`Delete ${person.name}?`)) {
          personService
            .del(person.id)
            .then(response => {
              setPersons(persons.filter(item => item.id !== person.id ))
              console.log('delete', response)
              }
            )
          }
        }
      } />}
    /> 
    )
    
  

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter} />
      <h3>add a new</h3>
      <PersonForm addPersons={addPersons} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />

      <h3>Numbers</h3>
      <Persons rows={rows()} />
      
    </div>
  )
}

export default App