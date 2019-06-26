import React from 'react'

import './Spinner.css'

const Spinner = () => (
    <div style={{display:'flex', backgroundColor:'white', textAlign:'center', alignContent:'center', width:'100%', height:'100%',position:'fixed', right:0}}>
        <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
)

export default Spinner