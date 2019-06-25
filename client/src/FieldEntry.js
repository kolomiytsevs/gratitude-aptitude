import React from 'react'
import './FieldEntry.css'

const FieldEntry = (props) => (
    <div className='field-entry'>
        <p><strong>{props.field}:</strong></p>
        <p>{props.text}</p>
    </div>
)

export default FieldEntry