import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Bangumis from "./bangumis";
import UserCard from "@/components/user_card";
import NavigationSection from "@/containers/navigation_section";
import { getCurrentDate, getPreviousDate } from "@/utils/dateutil";
import RankSection from "./rank";
import USER_CARD_VISIBLE_MIN_WINDOW_SIZE from "@/const/window_size_threshold";
import { StateType } from "@/interface/StateType";
import "./index.css";

const mediaQuery = `(max-width: ${USER_CARD_VISIBLE_MIN_WINDOW_SIZE - 1}px)`;

const Home = (): React.ReactElement => {
    const user = useSelector((state: StateType) => state.user);
    const [isNarrow, setIsNarrow] = useState(
        () => window.matchMedia(mediaQuery).matches
    );
    const [seasons] = useState(() => ({
        current: getCurrentDate(),
        previous: getPreviousDate(),
    }));

    useEffect(() => {
        const query = window.matchMedia(mediaQuery);
        const onChange = (event: MediaQueryListEvent) =>
            setIsNarrow(event.matches);
        query.addEventListener("change", onChange);
        return () => query.removeEventListener("change", onChange);
    }, []);

    return (
        <div>
            <NavigationSection currentTab="主页" />
            <div className="contentStyle">
                <div
                    style={{ width: isNarrow ? "100%" : "65%" }}
                    className="bangumiStyle"
                >
                    <Bangumis {...seasons.current} />
                    <Bangumis {...seasons.previous} />
                </div>
                <div
                    className="leftSectionStyle"
                    style={{ display: isNarrow ? "none" : "block" }}
                >
                    <UserCard user={user} />
                    <RankSection />
                </div>
            </div>
        </div>
    );
};

export default Home;
