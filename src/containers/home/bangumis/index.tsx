import React from "react";
import { Header, Divider } from "semantic-ui-react";
import { BangumiType } from "../../../interface/BangumiType";
import { BangumiSeasonType } from "../../../interface/BangumiSeasonType";
import BangumiApi from "../../../api/bangumi";
import { headerStyle, divierStyle } from "./style";
import "./index.css";
import { renderBangumiList } from "../../render";
import { deepEqual } from "../../../utils/deepEqual";

interface BangumisState {
    bangumis: Array<BangumiType>;
}

class Bangumis extends React.Component<BangumiSeasonType, BangumisState> {
    public constructor(props: BangumiSeasonType) {
        super(props);
        this.state = {
            bangumis: new Array<BangumiType>(),
        };
    }

    public componentDidMount(): void {
        const limit = 8;
        const { season, year } = this.props;
        BangumiApi.getBangumisBySeasonWithLimit(year, season, limit)
            .then((res) => {
                this.setState({
                    bangumis: res.data.data.bangumiList,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }

    public shouldComponentUpdate(
        nextProps: BangumiSeasonType,
        nextState: BangumisState
    ): boolean {
        return (
            !deepEqual(this.props, nextProps) ||
            !deepEqual(this.state, nextState)
        );
    }

    public render(): JSX.Element {
        const { month, year } = this.props;

        return (
            <div className="bangumiSection">
                <Header
                    size="medium"
                    style={headerStyle}
                    content={`${year}年${month}月番`}
                />
                <Divider style={divierStyle} />
                <div className="bangumiData">
                    {renderBangumiList(this.state.bangumis, "25%")}
                </div>
            </div>
        );
    }
}

export default Bangumis;
