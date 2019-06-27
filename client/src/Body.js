import React from 'react'
import './Body.css'

import Greeting from './Greeting'
import Time from './Time'
import TextInput from './TextInput'
import DiaryIcon from './DiaryIcon';
import DiaryDrawer from './DiaryDrawer';
import AuthorDetails from './AuthorDetails'
import GoogleNav from './GoogleNav';


const Body = (props) => (
    <div className='body'>
    <DiaryIcon toggleDiaryDrawer={props.toggleDiaryDrawer} diaryDrawerOpen={props.diaryDrawerOpen}/>
    <DiaryDrawer 
        email={props.email} 
        getDiaryEntries={props.getDiaryEntries} 
        toggleDiaryDrawer={props.toggleDiaryDrawer} 
        diaryDrawerOpen={props.diaryDrawerOpen} 
        entries={props.entries} 
        getDiaryEntries={props.getDiaryEntries} 
        token={props.token}
    />        
    <Greeting name={props.name} updateDisplayName={props.updateDisplayName}/>
    <Time />
    <TextInput token={props.token} name={props.name} email={props.email} getDiaryEntries={props.getDiaryEntries}/>
    <AuthorDetails authorName={props.authorName} authorProfile={props.authorProfile} imagePage={props.imagePage}/>
    <GoogleNav handleSignOut={props.handleSignOut}/>
    </div>
)

export default Body