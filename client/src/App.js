import React from 'react';
import './App.css';
import axios from 'axios'

import Background from './Background'
import Body from './Body'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state={
      backgorundImgUrl:'',
      imgAuthor:''
    }
    this.getBackgroundImg = this.getBackgroundImg.bind(this)
  } 

  getBackgroundImg = async () =>{
    let res = await axios.get('/api/unsplash/unsplash_random_api')
    let {data}  = res

    this.setState({
      backgorundImgUrl : data.imgUrl,
      imgAuthor : data.author
    })
  }

  componentDidMount(){
    this.getBackgroundImg()
  }

  render(){
    return (
      <div className="App">
        <Body />
        <Background backgroundUrl={this.state.backgorundImgUrl} imgAuthor={this.state.imgAuthor} />
      </div>
    )
  }

}

export default App;
