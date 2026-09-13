import React, { memo } from "react";
import Navbar from "@/components/navbar";
import Searchbar from "@/components/searchbar";
import SubNavbar from "./subNavbar";
import "./index.css";

const searchbarStyle = {
    position: "relative",
    left: "15%",
    width: "40%",
    minWidth: "210px",
    height: "40px",
    top: "25px",
};

type NavigationProps = {
    currentTab: string;
};

const NavigationSection = (props: NavigationProps): React.ReactElement => {
    const { currentTab } = props;

    return (
        <div className="sectionStyle">
            <div>
                <Navbar />
                <Searchbar searchbarStyle={searchbarStyle} />
            </div>
            <SubNavbar currentTab={currentTab} />
        </div>
    );
};

export default memo(NavigationSection);
