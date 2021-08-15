import { BangumiSeasonType } from "../interface/BangumiSeasonType";

export const getPreviousDate = () : BangumiSeasonType => {
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
