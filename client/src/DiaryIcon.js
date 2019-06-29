import React from 'react'
import './DiaryIcon.css'

import {Book} from './svgIcons'
import { PromiseProvider } from 'mongoose';

const DiaryColor = (diaryDrawerOpen, iconFlash) =>{
    if(diaryDrawerOpen){
        return 'color-diary-icon'
    }else if(!diaryDrawerOpen && iconFlash===false){
        return 'diary-icon'
    }else if(iconFlash===true){
        return 'icon-flash'
    }
}

      


const DiaryIcon = (props) => (
    <div className={DiaryColor(props.diaryDrawerOpen, props.iconFlash)} onClick={props.toggleDiaryDrawer}>
        <Book />
    </div>
)

export default DiaryIcon