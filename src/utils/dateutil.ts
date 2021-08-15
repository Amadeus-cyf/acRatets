import { BangumiSeasonType } from "../interface/BangumiSeasonType";

const getCurrentDate = () : BangumiSeasonType => {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let season = 'winter';
    if (month >= 1 && month < 4) {
        season = 'winter';
        return {
            year: year,
            month: 1,
            season: season
        }
    } else if (month >= 4 && month < 7) {
        season = 'spring';
        return {
            year: year,
            month: 4,
            season: season,
        }
    } else if (month >= 7 && month < 10) {
        season = 'summer';
        return {
            year: year,
            month: 7,
            season: season,
        }
    } else {
        season = 'fall';
        return {
            year: year,
            month: 10,
            season: season,
        }
    }
}


const getPreviousDate = () : BangumiSeasonType => {
    let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        if (month >= 1 && month < 4) {
            return {
                month: 10,
                year: year - 1,
                season: 'fall',
            }
        } else if (month >= 4 && month < 7) {
            return {
                month: 1,
                year: year,
                season: 'winter',
            }
        } else if (month >= 7 && month < 10) {
            return {
                month: 4,
                year: year,
                season: 'spring',
            }
        } else {
            return {
                month: 7,
                year: year,
                season: 'summer',
            }
        }
}

export { getCurrentDate, getPreviousDate }
