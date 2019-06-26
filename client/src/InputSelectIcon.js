import React from 'react'

import './InputSelectIcon.css'

const InputSelectIcon = (props) => (
    <div className={props.selectedField===props.field? 'selected-icon-container': 'icon-container'} onClick={()=>props.handleIconClick(props.field)}>
        <div className='icon-wrapper' >
            {props.icon}

        </div>
        <h6>{props.field}</h6>
    </div>
)

export default InputSelectIcon