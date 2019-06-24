import React from 'react'
import './Body.css'

import Greeting from './Greeting'
import Time from './Time'
import TextInput from './TextInput'

const Body = (props) => (
    <div className='body'>
    <Greeting name={props.name}/>
    <Time />
    <TextInput token={props.token} name={props.name} email={props.email}/>
    </div>
)

export default Body