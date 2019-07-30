import React from 'react'

const Course = ({course}) => (
  <div>
    <Header course={course.name} />
    <Content course={course.parts} />
    <Total course={course.parts} />
  </div>
 )

const Header = ({course}) =>
  <h1>{course}</h1>

const Total = ({course}) => {
  const total = course.reduce((s,p) => {
      s += p.exercises
      return s
    }, 0)  
  return (
    <b> total of {total} exercises</b>
  )
}
  

const Part = ({part}) =>
  <p>{part.name} {part.exercises}</p>

const Content = ({course}) => {
  return (
    <div>
      {course.map(part => <Part key ={part.id} part={part} />)}
    </div>
  )
} 

 export default Course