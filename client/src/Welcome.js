import React from 'react'
import SignUp from'./SignUp'
import SignIn from './SignIn'
import './Welcome.css'

const Welcome = (props) => (
    <div className='welcome-container'>
        <div className='signin-container'>
            <SignIn handleSignIn={props.handleSignIn} signInMessage={props.signInMessage}/>
        </div>
        <div className='signup-container'>
            <SignUp handleSignUp={props.handleSignUp} signUpMessage={props.signUpMessage}/> 
        </div>
    </div>
)

export default Welcome