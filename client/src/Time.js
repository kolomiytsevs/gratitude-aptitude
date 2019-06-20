import React from 'react'
import {DateTime} from 'luxon'

import './Time.css'

/*const getTime = () =>(
    DateTime.local().toFormat(`HH:mm:ss`)
   
)*/

class Time extends React.Component{
    constructor(props){
        super(props)
        this.state={
            time:''
        }
        this.getTime = this.getTime.bind(this)
    }

    getTime(){

        this.setState({
            time: DateTime.local().toFormat(`HH:mm:ss`)
        })
    }

    componentDidMount() {
        this.timerID = setInterval(
          () => this.getTime(),
          1000
        );
      }
    
      componentWillUnmount() {
        clearInterval(this.timerID);
      }

    render(){
        return(
            <div className='time'>
                <h1>{this.state.time}</h1>
            </div>
        )
    }
}
    



export default Time