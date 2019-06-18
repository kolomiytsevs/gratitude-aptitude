import React from 'react'
import './TextInput.css'

class TextInput extends React.Component{
constructor(props){
    super(props)
    this.state={
        intention:'',
        gratitude:'',
        highlight:'',
        love:''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
}

handleInputChange(event){
    const{name, value} = event.target
    
    this.setState({
        [name]:value
    })        
}

    render(){
        return(
            <div className='text-input'>
                <input type='text' id='gratitude' name='gratitude' onChange={this.handleInputChange} value={this.state.gratitude} placeholder='something general you are grateful for'></input>
                <br></br>
                <label for='gratitude'>gratitude</label>
                <br></br>
                <br></br>
                <input type='text' id='intention' name='intention' onChange={this.handleInputChange} value={this.state.intention} placeholder='something you want to do which is wellbeing oriented'></input>
                <br></br>
                <label for='intention'>intention</label>
            </div>
        )
    }
}

export default TextInput