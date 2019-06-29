import React from 'react'

import SignInForm from './SignInForm'

const SignIn = (props) =>(
    <div>
        <h1>Sign In</h1>
        <SignInForm handleSignIn={props.handleSignIn} message={props.signInMessage} loading={props.loading}/>
    </div>
)

export default SignIn