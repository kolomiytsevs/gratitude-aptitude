import React from 'react'
import './AuthorDetails.css'

const AuthorDetails = (props) => (
    <div className='author-details'><h5>Photo by {props.authorName}</h5></div>
)

export default AuthorDetails