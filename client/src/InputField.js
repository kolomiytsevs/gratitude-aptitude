import React from 'react'
import './InputField.css'

const InputField = (props) => (
    <div>
        <input 
            type='text' 
            id={props.label} 
            name={props.label} 
            onChange={props.handleInputChange} 
            value={props.value} 
            placeholder='something general you are grateful for'
            className={`${props.label}-input`}
            >
        </input>
        <br></br>
        <label for={props.label}>{props.label}</label>
    </div>
)

export default InputField