import React from 'react'

import './InputSelectIcon.css'

const InputSelectIcon = (props) => (
    <div className={props.selectedField===props.field? 'selected-icon-container': 'icon-container'} onClick={()=>props.handleIconClick(props.field)}>
        <div className='icon-wrapper' >
            {props.icon}

        </div>
        <p>{props.field}</p>
    </div>
)

export default InputSelectIcon