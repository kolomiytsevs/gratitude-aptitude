import React from 'react'
import './DailyEntry.css'
import FieldEntry from './FieldEntry';


const DailyEntry = (props) => (
    <div className='daily-container'>
        
        <span><h3 style={{float:'left', marginRight:'10px', fontFamily:'Courier New', fontStyle:'normal'}}>Date:</h3><h3>{props.date}</h3></span>
        {props.submittedFields.map(field => <FieldEntry submittedFields={props.submittedFields} dateId={field.dateId} getDiaryEntries={props.getDiaryEntries} uid={field.uid} email={props.email} field={field.field} text={field.text} token={props.token} key={field.uid} />)}
        
    </div>
)

export default DailyEntry