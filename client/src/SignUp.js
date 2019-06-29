import React from 'react'

import SignUpForm from './SignUpForm'

const SignUp = (props) =>(
    <div>
        <h1>Sign Up</h1>
        <SignUpForm handleSignUp={props.handleSignUp} message={props.signUpMessage} loading={props.loading}/>
    </div>
)

export default SignUp