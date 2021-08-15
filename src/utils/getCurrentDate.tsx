import { BangumiSeasonType } from "../interface/BangumiSeasonType";

export const getCurrentDate =  () : BangumiSeasonType => {
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
