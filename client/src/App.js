import React from 'react';
import './App.css';
import axios from 'axios'
import localStorage from 'local-storage'

import Background from './Background'
import Spinner from './Spinner'
import Auth from './modules/Auth'
import Time from './modules/DateTime'

//import Body from './Body'
//import SignIn from './SignIn' 
const AuthenticatedView = React.lazy(()=> import('./Body'))
const UnauthenticatedView = React.lazy(()=> import('./Welcome'))

const today = Time.reverseDate()

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
      token:null,
      diaryDrawerOpen:false,
      backgroundLoaded:0,
      authorProfile:'',
      imagePage:'',
      name:'',
      quote:'', 
      quoteSource:'',
      quoteLoaded:'',
      signInMessage:'',
      singUpMessage:''
    }
    this.getBackgroundImg = this.getBackgroundImg.bind(this)
    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleSignUp = this.handleSignUp.bind(this)
    this.isLoggedIn = this.isLoggedIn.bind(this)
    this.checkForUserData = this.checkForUserData.bind(this)
    this.toggleDiaryDrawer = this.toggleDiaryDrawer.bind(this)
    this.getDiaryEntries = this.getDiaryEntries.bind(this)
    this.shouldBackgroundUpdate = this.shouldBackgroundUpdate.bind(this)
    this.handleSignOut = this.handleSignOut.bind(this)
    this.updateDisplayName = this.updateDisplayName.bind(this)
    this.getRandomQuote = this.getRandomQuote.bind(this)
    this.shouldQuoteUpdate = this.shouldQuoteUpdate.bind(this)
  } 

  

  setLocalStorage(localStorageKey){
    const value = this.state[`${localStorageKey}`]
    localStorage.set(`${localStorageKey}`, value)        
  }

  getRandomQuote = async () =>{
    let res = await axios.get('http://tranquil-vine-245010.appspot.com/api/quotes/random_quote')
    let {data} = res
    let quoteLoaded = Time.reverseDate()
    this.setState({
      quote: data.quote,
      quoteSource: data.source,
      quoteLoaded: quoteLoaded
    },
      ()=>{
        this.setLocalStorage('quote')
        this.setLocalStorage('quoteSource')
        this.setLocalStorage('quoteLoaded')
      }
    )
  }

  shouldQuoteUpdate(){
    if(this.state.quoteLoaded!==today){
      this.getRandomQuote()
    }
  }

  getBackgroundImg = async () =>{
    let res = await axios.get('http://tranquil-vine-245010.appspot.com/api/unsplash/unsplash_collection_photo')
    let {data}  = res
    let backgroundLoaded = Time.reverseDate()
    this.setState({
      backgorundImgUrl : data.imgUrl,
      imgAuthor : data.author,
      backgroundLoaded,
      authorProfile: data.authorProfile,
      imagePage: data.imagePage
    },
      ()=>{
        this.setLocalStorage('backgorundImgUrl')
        this.setLocalStorage('backgroundLoaded')
        this.setLocalStorage('imgAuthor')
        this.setLocalStorage('authorProfile')
        this.setLocalStorage('imagePage')
      }
    )
  }

  shouldBackgroundUpdate(){
    
    if(this.state.backgroundLoaded!==today){
      this.getBackgroundImg()
    }
  }
  
  isLoggedIn(){
    if(Auth.isUserAuthenticated()===true && !Auth.isTokenExpired()){
      this.setState({
        isLoggedIn: true,
        message:'',
        singUpMessage:'',
        signInMessage:''
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
    let backgorundImgUrl = localStorage.get('backgorundImgUrl')
    let backgroundLoaded = localStorage.get('backgroundLoaded')
    let imgAuthor = localStorage.get('imgAuthor')
    let authorProfile = localStorage.get('authorProfile')
    let imagePage = localStorage.get('imagePage')
    let name = localStorage.get('name')
    let quote = localStorage.get('quote')
    let quoteLoaded = localStorage.get('quoteLoaded')
    let quoteSource = localStorage.get('quoteSource')
    if(user!==undefined){
      this.setState({
        user,
        token,
        backgorundImgUrl,
        backgroundLoaded,
        imgAuthor,
        authorProfile,
        imagePage,
        name,
        quote,
        quoteSource,
        quoteLoaded

      })
    }
    if(entries !== undefined){
      this.setState({
        entries
      })
    }
  }

  componentWillMount(){
    this.checkForUserData()
    this.isLoggedIn()
    
    
  }
  
  componentDidMount(){
    if(this.state.user!==null){
      if(this.state.user.length<1){
        
        this.getDiaryEntries()      
      }
    }
    this.shouldBackgroundUpdate()
    this.shouldQuoteUpdate()
  }
  
  updateDisplayName(name){
    this.setState({
      name
    },
    this.setLocalStorage('name')
    )
  }

  handleSignIn = async (event, email, password) => {
    event.preventDefault()
    try{
        let res = axios({
            method:'post',
            url:'http://tranquil-vine-245010.appspot.com/api/user/login',
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
            name,
            token,
            entries,
            signInMessage: message
        },
            ()=>{
              if(token!==undefined){
                this.setLocalStorage('user')
                this.setLocalStorage('entries')
                this.setLocalStorage('name')
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
  handleSignOut = async (event) => {
    event.preventDefault()
    try{
        let res = axios({
            method:'post',
            url:`http://tranquil-vine-245010.appspot.com/api/user/logoutall/`,
            headers: {'Authorization': "Bearer "+this.state.token},
            data: {
            }
        })
        
        let {data} = await res
        console.log(data)
        this.setState({
          name:'',
          user: {},
          isLoggedIn:false,
          token:'',
          entries:[]
        })
      this.isLoggedIn()
      localStorage.clear()
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
          url:'http://tranquil-vine-245010.appspot.com/api/user/signup',
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
          name,
          token,
          signUpMessage: message,
          entries:[]
      },
          ()=>{
            this.setLocalStorage('user')
            this.setLocalStorage('name')
            Auth.authenticateUser(token)
            this.isLoggedIn()
          }
      )
  }
  catch(error){
      console.log(error)
  }
}

getDiaryEntries = async () =>{
  const Token= this.state.token
  const Email = this.state.user.email
    try{
        let res = axios({
            method:'post',
            url:'http://tranquil-vine-245010.appspot.com/api/diary/get_entries',
            headers: {'Authorization': "Bearer "+Token},
            data: {
                email:Email
            }
        })
        
        let {data} = await res
        //console.log(data)
        let {message} = data
        this.setState({
            message,
            entries:data
        },
          ()=>{
            this.setLocalStorage('entries')
          }
        )
    }
    catch(error){
        console.log(error)
        this.setState({
          isLoggedIn:false
        })
    }
}

toggleDiaryDrawer(){
  this.setState((prevState)=>{
    return {diaryDrawerOpen: !prevState.diaryDrawerOpen}
  })
}


  render(){
    const isLoggedIn = this.state.isLoggedIn
    return (
      <React.Suspense fallback={<Spinner />}>
      <div className="App">
        {isLoggedIn? 
          <AuthenticatedView 
          name={this.state.name} 
          token={this.state.token} 
          email={this.state.user.email}
          toggleDiaryDrawer={this.toggleDiaryDrawer}
          diaryDrawerOpen={this.state.diaryDrawerOpen}
          entries={this.state.entries}
          getDiaryEntries={this.getDiaryEntries}
          authorName={this.state.imgAuthor}
          authorProfile={this.state.authorProfile}
          imagePage={this.state.imagePage}
          handleSignOut={this.handleSignOut}
          updateDisplayName={this.updateDisplayName}
          quote={this.state.quote}
          quoteSource={this.state.quoteSource}
          message={this.state.message}
          />
          : 
          <UnauthenticatedView 
          handleSignUp={this.handleSignUp} 
          handleSignIn={this.handleSignIn} 
          message={this.state.message} 
          signInMessage={this.state.signInMessage}
          signUpMessage={this.state.signUpMessage}
          />}
        
        <Background backgroundUrl={this.state.backgorundImgUrl} imgAuthor={this.state.imgAuthor} />
      </div>
      </React.Suspense>
    )
  }

}

export default App;
