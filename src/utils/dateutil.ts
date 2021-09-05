import { BangumiSeasonType } from "../interface/BangumiSeasonType";

const getCurrentDate = () : BangumiSeasonType => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    switch(true) {
        case month >= 1 && month < 4:
            return {
                year: year,
                month: 1,
                season: 'winter',
            }
        case month >= 4 && month < 7:
            return {
                year: year,
                month: 4,
                season: 'spring',
            }
        case month >= 7 && month < 10:
            return {
                year: year,
                month: 7,
                season: 'summer',
            }
        default:
            return {
                year: year,
                month: 10,
                season: 'fall',
            }
    }
}

const getPreviousDate = () : BangumiSeasonType => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    switch(true) {
        case month >= 1 && month < 4: 
            return {
                month: 10,
                year: year - 1,
                season: 'fall',
            }
        case month >= 4 && month < 7:
            return {
                month: 1,
                year: year,
                season: 'winter',
            }
        case month >= 7 && month < 10:
            return {
                month: 4,
                year: year,
                season: 'spring',
            }
        default:
            return {
                month: 7,
                year: year,
                season: 'summer',
            }
    }
}

const getSeasonFromMonth = (month : number) : string => {
    switch(true) {
        case month >= 1 && month < 4:
            return 'winter';
        case month >= 4 && month < 7:
            return 'spring';
        case month >= 7 && month < 10:
            return 'summer';
        case month >= 10:
            return 'fall';
        default:
            return 'allyear'
    }
}

export { getCurrentDate, getPreviousDate, getSeasonFromMonth }
