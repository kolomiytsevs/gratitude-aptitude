import React from 'react'
import './AuthorDetails.css'

const AuthorDetails = (props) => (
    <div className='author-details'><h5><a href={`${props.imagePage}/?utm_source=gratitude_aptitude&utm_medium=referral`}>Photo</a> by <a href={`${props.authorProfile}/?utm_source=gratitude_aptitude&utm_medium=referral`} >{props.authorName}</a> on <a href='https://unsplash.com/?utm_source=gratitude_aptitude&utm_medium=referral'>Unsplash</a></h5></div>
)

export default AuthorDetails