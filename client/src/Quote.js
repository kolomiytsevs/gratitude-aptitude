import React from 'react'
import './Quote.css'

const Quote = (props) => (
    <div className='quote-wrap'>
        <p className='quote-span'>"{props.quote}"</p>
        <p className='quote-span'>-{props.quoteSource}</p>
    </div>
)

export default Quote