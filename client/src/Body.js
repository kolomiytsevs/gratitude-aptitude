import React from 'react'
import './Body.css'

import Greeting from './Greeting'
import Time from './Time'
import TextInput from './TextInput'
import DiaryIcon from './DiaryIcon';
import DiaryDrawer from './DiaryDrawer';
import AuthorDetails from './AuthorDetails'
import GoogleNav from './GoogleNav';
import Quote from './Quote';


const Body = (props) => (
    <div className='body'>
    <DiaryIcon 
    toggleDiaryDrawer={props.toggleDiaryDrawer} 
    diaryDrawerOpen={props.diaryDrawerOpen}
    iconFlash={props.iconFlash}
    />
    <DiaryDrawer 
        email={props.email} 
        getDiaryEntries={props.getDiaryEntries} 
        toggleDiaryDrawer={props.toggleDiaryDrawer} 
        diaryDrawerOpen={props.diaryDrawerOpen} 
        entries={props.entries} 
        getDiaryEntries={props.getDiaryEntries} 
        token={props.token}
    />   
    <Time />
    <Greeting name={props.name} updateDisplayName={props.updateDisplayName} token={props.token}/>
    <TextInput token={props.token} name={props.name} email={props.email} getDiaryEntries={props.getDiaryEntries} changeIconColor={props.changeIconColor}/>
    <AuthorDetails authorName={props.authorName} authorProfile={props.authorProfile} imagePage={props.imagePage}/>
    <GoogleNav handleSignOut={props.handleSignOut}/>
    <Quote quote={props.quote} quoteSource={props.quoteSource} />     
    </div>
)

export default Body