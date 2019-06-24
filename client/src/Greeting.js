import React from 'react'
import './Greeting.css'
import Time from './modules/DateTime'

const Greeting = (props) =>(
    
    <div className='greeting'>
        <h1>Good {Time.getTimeOfDay()}, {props.name}.</h1>
    </div>
)

export default Greeting