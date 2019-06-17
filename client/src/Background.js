import React from 'react'
import './Background.css'



const Background = (props) =>(
    
    <div className='background-img' >
        {/*<img alt='' src="https://source.unsplash.com/weekly?desktop-background"></img>*/}
        <img alt={props.imgAuthor} src={props.backgroundUrl}></img>
    </div>
)

export default Background