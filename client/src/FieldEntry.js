import React from 'react'
import axios from 'axios'
import './FieldEntry.scss'
import onClickOutside from 'react-onclickoutside'

import {Pencil, Close} from './svgIcons'

class FieldEntry extends React.Component{
    constructor(props){
        super(props)
        this.state={
            edit:false,
            editValue:this.props.text,
            editUid:this.props.uid
        }
        this.handleDeleteEntry=this.handleDeleteEntry.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleEditSubmit = this.handleEditSubmit.bind(this)
        this.handleEditClick = this.handleEditClick.bind(this)
        this.handleClickOutside = this.handleClickOutside.bind(this)
        this.deleteEmptyFields = this.deleteEmptyFields.bind(this)
    }

    handleInputChange(event){
        const{name, value} = event.target
        
        this.setState({
            [name]:value
        })        
    }

    

    deleteEmptyFields = async () => {
            try{
                console.log('DELETEING EMPTY FIELDS')
                let res = axios({
                    method:'post',
                    url:`http://tranquil-vine-245010.appspot.com/api/diary/check_empty_fields`,
                    headers: {'Authorization': "Bearer "+this.props.token},
                    data: {
                        email:this.props.email
                    }
                })
                
                let {data} = await res
                console.log(data)
                let {message} = data
                this.setState({
                    message
                })    
                this.props.getDiaryEntries()            
            }
            catch(error){
                console.log(error)
            }
        
    }
    handleDeleteEntry = async () => {
        console.log(this.props.uid, this.props.email, this.props.token)
            try{
                let res = axios({
                    method:'post',
                    url:`http://tranquil-vine-245010.appspot.com/api/diary/delete_field/${this.props.uid}`,
                    headers: {'Authorization': "Bearer "+this.props.token},
                    data: {
                        email:this.props.email
                    }
                })
                
                let {data} = await res
                console.log(data)
                let {message} = data
                this.setState({
                    message
                })
                if(this.props.submittedFields.length<2){this.deleteEmptyFields()} 
                else{
                    this.props.getDiaryEntries()
                }
                
            }
            catch(error){
                console.log(error)
            }
        
    }

    handleEditSubmit = async (event) => {
        event.preventDefault()
        let {editUid, editValue} = this.state
        console.log(this.props.uid, this.props.email, this.props.token, this.props.dateId)
            try{
                let res = axios({
                    method:'post',
                    url:`http://tranquil-vine-245010.appspot.com/api/diary/update_field/${this.props.uid}`,
                    headers: {'Authorization': "Bearer "+this.props.token},
                    data: {
                        email:this.props.email,
                        dateId:this.props.dateId,
                        text:editValue
                    }
                })
                
                let {data} = await res
                console.log(data)
                let {message} = data
                this.setState({
                    message,
                    edit:false
                })
               this.props.getDiaryEntries()
                
            }
            catch(error){
                console.log(error)
            }
        
    }

    handleEditClick(){
        this.setState({
            edit:true
        })
    }

    handleClickOutside = evt =>{
        this.setState({
            edit:false,
            editValue:this.props.text
        })
    }



    render(){
        return(
            <div className='field-entry' >
                {this.state.edit?
                <form onSubmit={this.handleEditSubmit} autoComplete="off">
                   <label style={{float:'left'}} htmlFor='editValue'>{this.props.field}:   </label><input type='text' id='editValue' name='editValue' onChange={this.handleInputChange} value={this.state.editValue} />
                </form>
                :
                <p><strong>{this.props.field}:  </strong>{this.props.text}<span><span onClick={this.handleEditClick}><Pencil className='pencil'/></span><span onClick={()=> {if(window.confirm('are you sure?')) this.handleDeleteEntry()}}><Close  className='close'/></span></span></p>
                }
            </div>
        )
    }
}



export default onClickOutside(FieldEntry)