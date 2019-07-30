import React from 'react'

const Person = ({name, number, button}) => {
    return (
        <li>{name} {number} {button}</li>
    )
}

export default Person