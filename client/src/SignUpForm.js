import React from 'react'
import axios from 'axios'
import localStorage from 'local-storage'

class SignUpForm extends React.Component{
    constructor(props){
        super()
        this.state={
            name:'',
            email:'',
            password:'',
            user:'',
            message:''
        }
        //this.handleSignUp=this.handleSignUp.bind(this)
        this.handleInputChange=this.handleInputChange.bind(this)
        this.setLocalStorage=this.setLocalStorage.bind(this)
    }

    setLocalStorage(localStorageKey){
        const value = this.state[`${localStorageKey}`]
        localStorage.set(`${localStorageKey}`, value)        
    }

    /*handleSignUp = async (event) => {
        event.preventDefault()
        try{
            let res = axios({
                method:'post',
                url:'http://localhost:5000/api/user/signup',
                data: {
                    name:this.state.name,
                    email:this.state.email,
                    password:this.state.password
                }
            })
            
            let {data} = await res
            console.log(data)
            let {name, email, token, message} = data
            this.setState({
                name: '',
                email:'',
                password:'',
                user: {
                   name,
                   email,
                   token 
                },
                message
            },
                ()=>{this.setLocalStorage('user')}
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
                <form onSubmit={(event)=>{this.props.handleSignUp(event, this.state.name, this.state.email, this.state.password)}}>
                    <input className="form-textbox" type="name" value={this.state.name} name="name" id="name" placeholder="first name" onChange={this.handleInputChange}/>
                    <input className="form-textbox" type="email" value={this.state.email} name="email" id="email" placeholder="email address" onChange={this.handleInputChange}/>
                    <input className="form-textbox" type="password" value={this.state.password} name="password" id="password" placeholder="password" onChange={this.handleInputChange}/>
                    <button type='submit' style={{backgroundColor:'rgba(255, 136, 0, 1)'}}>Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUpForm