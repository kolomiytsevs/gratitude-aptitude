import React from 'react'
import axios from 'axios'
import './TextInput.css'

import InputSelectIcon from './InputSelectIcon'
import {PrayingHands, Pencil, Star, Heart} from './svgIcons'
import InputField from './InputField'
import Auth from './modules/Auth'

class TextInput extends React.Component{
constructor(props){
    super(props)
    this.state={
        intention:'',
        gratitude:'',
        highlight:'',
        love:'',
        selectedField:'gratitude',
        message:''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleIconClick = this.handleIconClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
}


handleIconClick(field){
    this.setState({
        selectedField:field
    })
}

handleSubmit = async (event) =>{
    event.preventDefault()
    let {value, name} = event.target[0]
    try{
        let res = axios({
            method:'post',
            url:'http://localhost:5000/api/diary/new_entry',
            headers: {'Authorization': "Bearer "+this.props.token},
            data: {
                email:this.props.email,
                field: name,
                text: value
            }
        })
        
        let {data} = await res
        console.log(data)
        let {message} = data
        this.setState({
            message
        })
    }
    catch(error){
        console.log(error)
    }
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
                <div className={this.state.selectedField==='gratitude'? 'active-field':'hidden-field'}>
                <form onSubmit={this.handleSubmit}>
                <input type='text' id='gratitude' name='gratitude' onChange={this.handleInputChange} value={this.state.gratitude} placeholder='something general you are grateful for'></input>
                <br></br>
                <label for='gratitude'>gratitude</label>
                </form>
                </div>
                <div className={this.state.selectedField==='intention'? 'active-field':'hidden-field'}>
                <form onSubmit={this.handleSubmit}>
                <input type='text'  id='intention' name='intention' onChange={this.handleInputChange} value={this.state.intention} placeholder='something you want to do which is wellbeing oriented'></input>
                <br></br>
                <label for='intention'>intention</label>
                </form>
                </div>
                <div className={this.state.selectedField==='highlight'? 'active-field':'hidden-field'}>
                <form onSubmit={this.handleSubmit}>
                <input type='text'  id='highlight' name='highlight' onChange={this.handleInputChange} value={this.state.highlight} placeholder='something you want to do which is wellbeing oriented'></input>
                <br></br>
                <label for='highlight'>highlight</label>
                </form>
                </div>
                <div className={this.state.selectedField==='love'? 'active-field':'hidden-field'}>
                <form onSubmit={this.handleSubmit}>
                <input type='text'  id='love' name='love' onChange={this.handleInputChange} value={this.state.love} placeholder='something you want to do which is wellbeing oriented'></input>
                <br></br>
                <label for='love'>love</label>
                </form>
                </div>
                {/*<InputField handleInputChange={this.handleInputChange} selectedField={this.state.selectedField} label={this.state.selectedField} value={this.state[this.state.selectedField]}/>*/}
                <div className='icons'>                
                <InputSelectIcon field={'gratitude'} selectedField={this.state.selectedField} handleIconClick={this.handleIconClick} icon={<PrayingHands />} />
                <InputSelectIcon field={'intention'} selectedField={this.state.selectedField} handleIconClick={this.handleIconClick} icon={<Pencil />} />
                <InputSelectIcon field={'highlight'} selectedField={this.state.selectedField} handleIconClick={this.handleIconClick} icon={<Star />} />
                <InputSelectIcon field={'love'} selectedField={this.state.selectedField} handleIconClick={this.handleIconClick} icon={<Heart />} />
                </div>
            </div>
        )
    }
}

export default TextInput