import React from 'react'
import './DiaryIcon.css'

import {Book} from './svgIcons'
import { PromiseProvider } from 'mongoose';

const DiaryIcon = (props) => (
    <div className={props.diaryDrawerOpen? 'color-diary-icon':'diary-icon'} onClick={props.toggleDiaryDrawer}>
        <Book />
    </div>
)

export default DiaryIcon