import React from 'react'
import {CSSTransition} from 'react-transition-group'
import './DiaryDrawer.css'
import DailyEntry from './DailyEntry';

class DiaryDrawer extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        this.props.getDiaryEntries()
    }

    render(){
        return(

            <div>
            <CSSTransition
                in={this.props.diaryDrawerOpen}
                timeout={350}
                classNames="menu-slide"
                unmountOnExit
                >
                    <div className='wrapper' >
                        <div className='map-grid'>
                            {this.props.entries && this.props.entries.length>0?
                            this.props.entries.map(day => 
                                <DailyEntry email={this.props.email} getDiaryEntries={this.props.getDiaryEntries} date={day.entryDate} token={this.props.token} submittedFields={day.submittedFields} key={day.uid}/>)
                            :
                            <p>No Entries Yet</p>
                            }
                        </div>
                    </div>
            </CSSTransition>
            <CSSTransition
                in={this.props.diaryDrawerOpen}
                timeout={350}
                classNames="fade"
                unmountOnExit
                >
                    <div className="backdrop" onClick={this.props.toggleDiaryDrawer}></div>

            </CSSTransition>

            </div>
        )
    }

} 




export default DiaryDrawer