import {
    getCurrentDate,
    getPreviousDate,
    getSeasonFromMonth,
} from "../utils/dateutil";
import { BangumiSeasonType } from "../interface/BangumiSeasonType";
import { strict as assert } from "assert";

const WINTER = "winter";
const SPRING = "spring";
const SUMMER = "summer";
const FALL = "fall";
const ALL_YEAR = "allyear";

test("test getCurrentDate", () => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const date: BangumiSeasonType = getCurrentDate();
    assert.equal(date.year, year);
    switch (true) {
        case month >= 1 && month < 4:
            assert.equal(date.month, 1);
            assert.equal(date.season, WINTER);
            break;
        case month >= 4 && month < 7:
            assert.equal(date.month, 4);
            assert.equal(date.season, SPRING);
            break;
        case month >= 7 && month < 10:
            assert.equal(date.month, 7);
            assert.equal(date.season, SUMMER);
            break;
        case month >= 10 && month <= 12:
            assert.equal(date.month, 10);
            assert.equal(date.season, FALL);
    }
});

test("test getPreviousDate", () => {
    const now: Date = new Date();
    const year: number = now.getFullYear();
    const month: number = now.getMonth() + 1;
    const date: BangumiSeasonType = getPreviousDate();
    switch (true) {
        case month >= 1 && month < 4:
            assert.equal(date.year, year - 1);
            assert.equal(date.month, 10);
            assert.equal(date.season, FALL);
            break;
        case month >= 4 && month < 7:
            assert.equal(date.year, year);
            assert.equal(date.month, 1);
            assert.equal(WINTER, date.season);
            break;
        case month >= 7 && month < 10:
            assert.equal(year, date.year);
            assert.equal(date.month, 4);
            assert.equal(SPRING, date.season);
            break;
        case month >= 10 && month <= 12:
            assert.equal(date.month, 7);
            assert.equal(date.season, SUMMER);
    }
});

test("test getSeasonFromMonth", () => {
    for (let i = 1; i < 4; i++) {
        const season: string = getSeasonFromMonth(i);
        assert.equal(season, WINTER);
    }
    for (let i = 4; i < 7; i++) {
        const season: string = getSeasonFromMonth(i);
        assert.equal(season, SPRING);
    }
    for (let i = 7; i < 10; i++) {
        const season: string = getSeasonFromMonth(i);
        assert.equal(season, SUMMER);
    }
    for (let i = 10; i <= 12; i++) {
        const season: string = getSeasonFromMonth(i);
        assert.equal(season, FALL);
    }
    const season: string = getSeasonFromMonth(-1);
    assert.equal(season, ALL_YEAR);
});
