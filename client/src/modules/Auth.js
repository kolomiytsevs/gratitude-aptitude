import decode from 'jwt-decode'
import localStorage from 'local-storage'

class Auth {
    static authenticateUser(token) {
        if(token!==undefined){
            localStorage.set('token', token)
        }else{
            localStorage.set('token', null)
        }
    }

    static isUserAuthenticated(){
       return localStorage.get('token')!==null
    }

    static deauthenticateUser(){
        localStorage.remove('token')
    }
    
    static getToken(){
        localStorage.get('token')
    }

    static isTokenExpired(token){
        try{
            const decoded = decode(token)
            if(decoded.exp < Date.now()/1000){
                return true
            }else{
                return false
            }
        }
        catch(error){
            return false
        }
    }

    
}

export default Auth 