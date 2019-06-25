import React from 'react'
import {CSSTransition} from 'react-transition-group'
import './DiaryDrawer.css'
import DailyEntry from './DailyEntry';

const DiaryDrawer = (props) =>
<div>
<CSSTransition
    in={props.diaryDrawerOpen}
    timeout={350}
    classNames="menu-slide"
    unmountOnExit
    >
        <div className='wrapper' onClick={props.getDiaryEntries}>
            <div className='map-grid'>
                {props.entries.map(day => 
                <DailyEntry email={props.email} date={day.entryDate} token={props.token} submittedFields={day.submittedFields} key={day.uid}/>
                )}
            </div>
        </div>
</CSSTransition>
<CSSTransition
    in={props.diaryDrawerOpen}
    timeout={350}
    classNames="fade"
    unmountOnExit
    >
        <div className="backdrop" onClick={props.toggleDiaryDrawer}></div>

</CSSTransition>

</div>

export default DiaryDrawer