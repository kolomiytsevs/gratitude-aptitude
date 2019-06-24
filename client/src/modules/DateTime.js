import {DateTime} from 'luxon'

class Time {

    static getStandardTime(){
        return DateTime.local().toFormat(`HH:mm:ss`)
        
    }

    static getTimeOfDay(){
        let hour = Number(DateTime.local().toFormat(`HH`))
        if(hour >= 5 && hour<12){
            return 'Morning'
        }
        else if(hour>=12 && hour<17){
            return  'Afternoon'
        }
        else if(hour>=17 && hour<21){
            return 'Evening'
        }
        else{
            return 'Night'
        }
        
    }

}

export default Time