import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "@/components/ui";
import Color from "@/const/color";
import "./index.css";

type MapType = {
    [key: string]: string;
};

const tabRouteMap: MapType = {
    主页: "/",
    番剧: "/bangumi",
    时间表: "/timeline",
    排行榜: "/rank",
};

const subnaviStyle = {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "center",
};

interface PropsType {
    currentTab: string;
}

const SubNavbar = (props: PropsType): React.ReactElement => {
    const { currentTab } = props;
    const navigate = useNavigate();

    const onTitleClick = (_event: unknown, data: { name?: string }): void => {
        if (data.name) navigate(tabRouteMap[data.name]);
    };

    return (
        <div className="subnaviStyle">
            <Menu secondary style={subnaviStyle}>
                <Menu.Item
                    name="主页"
                    className="titleStyle"
                    active={currentTab === "主页"}
                    style={{
                        color: currentTab === "主页" ? Color.PINK : Color.WHITE,
                        marginLeft: "30px",
                    }}
                    onClick={onTitleClick}
                />
                <Menu.Item
                    name="番剧"
                    className="titleStyle"
                    active={currentTab === "番剧"}
                    style={{
                        color: currentTab === "番剧" ? Color.PINK : Color.WHITE,
                        marginLeft: "30px",
                    }}
                    onClick={onTitleClick}
                />
                <Menu.Item
                    name="时间表"
                    className="titleStyle"
                    active={currentTab === "时间表"}
                    style={{
                        color:
                            currentTab === "时间表" ? Color.PINK : Color.WHITE,
                        marginLeft: "30px",
                    }}
                    onClick={onTitleClick}
                />
                <Menu.Item
                    name="排行榜"
                    className="titleStyle"
                    active={currentTab === "排行榜"}
                    style={{
                        color:
                            currentTab === "排行榜" ? Color.PINK : Color.WHITE,
                        marginLeft: "30px",
                    }}
                    onClick={onTitleClick}
                />
            </Menu>
        </div>
    );
};

export default memo(SubNavbar);
