import React from 'react'
import './GoogleNav.css'
import GoogleDropdown from './GoogleDropdown';
import onClickOutside from 'react-onclickoutside'


class GoogleNav extends React.Component{
    constructor(props){
        super(props)
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
        <div className='gmail' onClick={this.props.handleSignOut}>Sign Out</div>
        <div style={{marginLeft:'10px'}} className='break'>|</div>
        <a className='gmail' href='https://mail.google.com' style={{marginLeft:'10px'}}>Gmail</a>
        <div className='google-products' onClick={this.handleGoogleNavClick}></div>
    </div>
    {this.state.googleNavOpen && <GoogleDropdown handleGoogleNavClick={this.handleGoogleNavClick} />}
    
    </div>
        )
    }
}


export default onClickOutside(GoogleNav)