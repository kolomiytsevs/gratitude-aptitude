import React from 'react'
import './DailyEntry.css'
import FieldEntry from './FieldEntry';

const DailyEntry = (props) => (
    <div className='daily-container'>
        <h3>{props.date}</h3>
        {props.submittedFields.map(field => <FieldEntry field={field.field} text={field.text}/>)}
        
    </div>
)

export default DailyEntry