import React from 'react'
import './Body.css'

import Greeting from './Greeting'
import Time from './Time'
import TextInput from './TextInput'

const Body = () => (
    <div className='body'>
    <Greeting />
    <Time />
    <TextInput />
    </div>
)

export default Body