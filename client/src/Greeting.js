import React from 'react'
import axios from 'axios'
import './Greeting.css'
import Time from './modules/DateTime'

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
        console.log(this.props.uid, this.props.email, this.props.token, this.props.dateId)
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
                    edit:false
                })
               this.props.updateDisplayName(updatedName)
                
            }
            catch(error){
                console.log(error)
            }
        
    }

    render(){
        let {editName} = this.state
        return(
            <div className='greeting'>
                <h1>Good {Time.getTimeOfDay()}, 
                    {editName? 
                        <form onSubmit={this.handleEditSubmit} autoComplete="off">
                            <input type='text' id='editNameValue' name='editValue' onChange={this.handleInputChange} value={this.state.editNameValue} />
                        </form>
                    :
                        <span> {this.props.name}.</span>
                    }
                </h1>
            </div>
        )
    }
}
    


export default Greeting