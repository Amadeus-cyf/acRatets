import { BangumiSeasonType } from "../interface/BangumiSeasonType";

const WINTER = 'winter'
const SPRING = 'spring'
const SUMMER = 'summer'
const FALL = 'fall'
const ALL_YEAR = 'allyear'

const getCurrentDate = () : BangumiSeasonType => {
    let date : Date = new Date();
    let year : number = date.getFullYear();
    let month : number = date.getMonth()+1;
    switch(true) {
        case month >= 1 && month < 4:
            return {
                year: year,
                month: 1,
                season: WINTER,
            }
        case month >= 4 && month < 7:
            return {
                year: year,
                month: 4,
                season: SPRING,
            }
        case month >= 7 && month < 10:
            return {
                year: year,
                month: 7,
                season: SUMMER,
            }
        default:
            return {
                year: year,
                month: 10,
                season: FALL,
            }
    }
}

const getPreviousDate = () : BangumiSeasonType => {
    let date : Date = new Date();
    let year : number = date.getFullYear();
    let month : number = date.getMonth()+1;
    switch(true) {
        case month >= 1 && month < 4: 
            return {
                month: 10,
                year: year - 1,
                season: FALL,
            }
        case month >= 4 && month < 7:
            return {
                month: 1,
                year: year,
                season: WINTER,
            }
        case month >= 7 && month < 10:
            return {
                month: 4,
                year: year,
                season: SPRING,
            }
        default:
            return {
                month: 7,
                year: year,
                season: SUMMER,
            }
    }
}

const getSeasonFromMonth = (month : number) : string => {
    switch(true) {
        case month >= 1 && month < 4:
            return WINTER;
        case month >= 4 && month < 7:
            return SPRING;
        case month >= 7 && month < 10:
            return SUMMER;
        case month >= 10:
            return FALL;
        default:
            return ALL_YEAR;
    }
}

export { getCurrentDate, getPreviousDate, getSeasonFromMonth }
