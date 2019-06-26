import React from 'react'
import './GoogleDropdown.css'


const GoogleDropdown = () =>(
    <div className='dropdown-wrap'>
        <div className='arrow'></div>
        <ul className="product-dropdown">
            <li><a className='search' href="https://www.google.com/"></a><p>Search</p></li>
            <li><a className='youtube' href="https://www.youtube.com/"></a><p>YouTube</p></li>
            <li><a className='maps' href="https://www.google.com/maps"></a><p>Maps</p></li>
            <li><a className='play' href="https://play.google.com/store"></a><p>Play</p></li>
            <li><a className='news' href="https://news.google.co.uk/"></a><p>News</p></li>
            <li><a className='mail' href="https://mail.google.com"></a><p>Gmail</p></li>
            <li><a className='drive' href="https://drive.google.com"></a><p>Drive</p></li>
            <li><a className='calendar' href="https://calendar.google.com"></a><p>Calendar</p></li>
            <li><a className='photos' href="https://photos.google.com/"></a><p>Photos</p></li>
        </ul>
    </div>
)

export default GoogleDropdown