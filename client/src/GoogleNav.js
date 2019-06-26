import React from 'react'
import './GoogleNav.css'
import GoogleDropdown from './GoogleDropdown';
import onClickOutside from 'react-onclickoutside'


class GoogleNav extends React.Component{
    constructor(){
        super()
        this.state={
            googleNavOpen:false
        }
        this.handleGoogleNavClick = this.handleGoogleNavClick.bind(this)
    }

    handleGoogleNavClick(){
        this.setState({
            googleNavOpen:!this.state.googleNavOpen
        })
    }

    handleClickOutside = evt =>{
        this.setState({
            googleNavOpen:false
        })
    }

    render(){
        return(

    <div className='nav-wrap'>
    <div className='google-nav'>
        <a className='gmail' href='https://mail.google.com'>Gmail</a>
        <div className='google-products' onClick={this.handleGoogleNavClick}></div>
    </div>
    {this.state.googleNavOpen && <GoogleDropdown handleGoogleNavClick={this.handleGoogleNavClick} />}
    
    </div>
        )
    }
}


export default onClickOutside(GoogleNav)