import React from 'react';
import './App.css';
import axios from 'axios'
import localStorage from 'local-storage'

import Background from './Background'
import Spinner from './Spinner'
import Auth from './modules/Auth'
//import Body from './Body'
//import SignIn from './SignIn' 
const AuthenticatedView = React.lazy(()=> import('./Body'))
const UnauthenticatedView = React.lazy(()=> import('./Welcome'))

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      backgorundImgUrl:'',
      imgAuthor:'',
      isLoggedIn:false,
      user:{},
      message:'',
      entries:[],
      token:null
    }
    this.getBackgroundImg = this.getBackgroundImg.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.checkForUserData = this.checkForUserData.bind(this)
  } 

  setLocalStorage(localStorageKey){
    const value = this.state[`${localStorageKey}`]
    localStorage.set(`${localStorageKey}`, value)        
}

  getBackgroundImg = async () =>{
    let res = await axios.get('/api/unsplash/unsplash_collection_photo')
    let {data}  = res

    this.setState({
      backgorundImgUrl : data.imgUrl,
      imgAuthor : data.author
    })
  }

  
  isLoggedIn(){
    if(Auth.isUserAuthenticated()===true && !Auth.isTokenExpired()){
      this.setState({
        isLoggedIn: true
      })
    }else{
      this.setState({
        isLoggedIn: false
      })
    }
    
  }

  checkForUserData(){
    let user = localStorage.get('user')
    let entries = localStorage.get('entries')
    let token = localStorage.get('token')
    if(user!==undefined){
      this.setState({
        user,
        token
      })
    }
    if(entries !== undefined){
      this.setState({
        entries
      })
    }
  }
  
  componentDidMount(){
    this.getBackgroundImg()
    this.isLoggedIn()
    this.checkForUserData()
  }

  handleSignIn = async (event, email, password) => {
    event.preventDefault()
    try{
        let res = axios({
            method:'post',
            url:'http://localhost:5000/api/user/login',
            data: {
                email: email,
                password: password
            }
        })
        
        let {data} = await res
        console.log(data)
        let {name, userEmail, token, message, entries} = data
        this.setState({
            name: '',
            //email:'',
           // password:'',
            user: {
               name,
               email: userEmail,
               token 
            },
            token,
            entries,
            message
        },
            ()=>{
              if(token!==undefined){
                this.setLocalStorage('user')
                this.setLocalStorage('entries')
                Auth.authenticateUser(token)
                this.isLoggedIn()
              }
            }
        )
    }
    catch(error){
        console.log(error)
    }
}

handleSignUp = async (event, Name, Email, password) => {
  
  event.preventDefault()
  try{
      let res = axios({
          method:'post',
          url:'http://localhost:5000/api/user/signup',
          data: {
              name: Name,
              email: Email,
              password: password
          }
      })
      
      let {data} = await res
      console.log(data)
      let {name, email, token, message} = data
      this.setState({
          //name: '',
          //email:'',
          //password:'',
          user: {
             name,
             email,
             token 
          },
          message
      },
          ()=>{
            this.setLocalStorage('user')
            Auth.authenticateUser(token)
            this.isLoggedIn()
          }
      )
  }
  catch(error){
      console.log(error)
  }
}


  render(){
    const isLoggedIn = this.state.isLoggedIn
    return (
      <React.Suspense fallback={<Spinner />}>
      <div className="App">
        {isLoggedIn? <AuthenticatedView name={this.state.user.name} token={this.state.token} email={this.state.user.email}/>: <UnauthenticatedView handleSignUp={this.handleSignUp} handleSignIn={this.handleSignIn}/>}
        
        <Background backgroundUrl={this.state.backgorundImgUrl} imgAuthor={this.state.imgAuthor} />
      </div>
      </React.Suspense>
    )
  }

}

export default App;
