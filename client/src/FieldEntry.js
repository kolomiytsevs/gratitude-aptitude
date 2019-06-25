import React from 'react'
import axios from 'axios'
import './FieldEntry.scss'

import {Pencil, Close} from './svgIcons'

class FieldEntry extends React.Component{
    constructor(props){
        super(props)

        this.handleDeleteEntry=this.handleDeleteEntry.bind(this)
    }

    handleDeleteEntry = async () => {
        console.log(this.props.key, this.props.email, this.props.token)
            try{
                let res = axios({
                    method:'post',
                    url:`http://localhost:5000/api/diary/delete_field/${this.props.key}`,
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
                
            }
            catch(error){
                console.log(error)
            }
        
    }

    render(){
        return(
            <div className='field-entry'>
                <p><strong>{this.props.field}:  </strong>{this.props.text}<Pencil className='pencil'/><Close onClick={this.handleDeleteEntry} className='close'/></p>
            </div>
        )
    }
}



export default FieldEntry