import React from 'react'
import axios from 'axios'
import onClickOutside from 'react-onclickoutside'

import './Greeting.scss'
import Time from './modules/DateTime'
import {Pencil} from './svgIcons'

class Greeting extends React.Component{
    constructor(props){
        super(props)
        this.state={
            editName:false,
            editNameValue:this.props.name,
            message:''
        }
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)

    }

    
    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        })        
    }


    handleEditClick(){
        this.setState({
            editName:true
        })
    }

    
    handleEditSubmit = async (event) => {
        event.preventDefault()
            try{
                let res = axios({
                    method:'post',
                    url:`http://tranquil-vine-245010.appspot.com/api/user/update_name`,
                    headers: {'Authorization': "Bearer "+this.props.token},
                    data: {
                        name:this.state.editNameValue
                    }
                })
                
                let {data} = await res
                console.log(data)
                let {message, updatedName} = data
                this.setState({
                    message,
                    editName:false
                })
               this.props.updateDisplayName(updatedName)
                
            }
            catch(error){
                console.log(error)
            }
        
    }

    handleClickOutside = evt =>{
        this.setState({
            editName:false,
            editNameValue:this.props.name
        })
    }

    render(){
        let {editName} = this.state
        return(
            <div className='greeting'>
                <h1>Good {Time.getTimeOfDay()}, 
                    {editName? 
                        
                        <form onSubmit={this.handleEditSubmit} autoComplete="off">
                            <input type='text' id='editNameValue' name='editNameValue' onChange={this.handleInputChange} value={this.state.editNameValue} />
                        </form>
                    :
                        <span className='name-span'> {this.props.name}.<span className='name-pencil' onClick={this.handleEditClick}><Pencil /></span></span>
                    }
                </h1>
            </div>
        )
    }
}
    


export default onClickOutside(Greeting)