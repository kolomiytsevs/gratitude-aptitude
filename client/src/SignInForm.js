import React from 'react'
import axios from 'axios'
import localStorage from 'local-storage'

import './SignInForm.css'
import SubmitSpinner from './SubmitSpinner';

class SignInForm extends React.Component{
    constructor(props){
        super()
        this.state={
            email:'',
            password:'',
            user:'',
            message:'',
            entries:[]
        }
        //this.handleSignIn=this.handleSignIn.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.setLocalStorage=this.setLocalStorage.bind(this)
    }

    setLocalStorage(localStorageKey){
        const value = this.state[`${localStorageKey}`]
        localStorage.set(`${localStorageKey}`, value)        
    }

    /*handleSignIn = async (event) => {
        event.preventDefault()
        try{
            let res = axios({
                method:'post',
                url:'http://localhost:5000/api/user/login',
                data: {
                    email:this.state.email,
                    password:this.state.password
                }
            })
            
            let {data} = await res
            console.log(data)
            let {name, userEmail, token, message, entries} = data
            this.setState({
                name: '',
                email:'',
                password:'',
                user: {
                   name,
                   email: userEmail,
                   token 
                },
                entries,
                message
            },
                ()=>{
                    this.setLocalStorage('user')
                    this.setLocalStorage('entries')
                    window.location.reload()
                }
            )
        }
        catch(error){
            console.log(error)
        }
    }*/
    
    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        })        
    }
    
    render(){
        return(
            <div>
                <form onSubmit={(event)=>this.props.handleSignIn(event, this.state.email, this.state.password)}>
                    <input className="form-textbox" type="email" value={this.state.email} name="email" id="email" placeholder="email address" onChange={this.handleInputChange}/>
                    <input className="form-textbox" type="password" value={this.state.password} name="password" id="password" placeholder="password" onChange={this.handleInputChange}/>
                    <p style={{color:'maroon', fontSize:'12px'}}>{this.props.message}</p>
                    {this.props.loading===true?
                    <SubmitSpinner />
                    :
                    <button type='submit'>Sign In</button>
                    }
                </form>
            </div>
        )
    }
}

export default SignInForm