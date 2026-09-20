import React, { memo } from "react";
import { Image, Header } from "@/components/ui";
import { BangumiDetailType } from "@/interface/BangumiDetailType";
import GenreLabel from "@/components/genre_label";
import InfoLabel from "@/components/info_label";
import "./index.css";

interface PropsType {
    bangumiDetail: BangumiDetailType;
    rating: number;
}

const imageStyle = {
    width: "220px",
    height: "300px",
    border: "4px solid white",
};

const BangumiDetailLabel = (props: PropsType) => {
    const { bangumiDetail } = props;

    const labelStyle = {
        background: `url(${bangumiDetail.image_url})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
    };

    return (
        <div style={labelStyle} className="detailLabelStyle">
            <Image
                style={imageStyle}
                src={bangumiDetail.image_url}
                alt={`${bangumiDetail.title} cover`}
                loading="lazy"
                rounded
            />
            <div className="bangumiDetailStyle">
                <div className="mainTitleStyle">
                    <Header
                        content={bangumiDetail.title}
                        style={{ color: "white", marginTop: "5px" }}
                    />
                    <div className="tagsStyle">
                        {bangumiDetail.genres.map((g: string) => (
                            <GenreLabel key={g} genre={g} />
                        ))}
                    </div>
                </div>

                <Header
                    content={bangumiDetail.title_japanese}
                    style={{
                        color: "white",
                        fontStyle: "oblique",
                        marginTop: "5px",
                    }}
                />

                <InfoLabel info={`Airing start: ${bangumiDetail.aired_from}`} />
                <InfoLabel info={"|"} />
                <InfoLabel info={`${bangumiDetail.episodes} episodes`} />
                <InfoLabel info={"|"} />
                <InfoLabel
                    info={`${bangumiDetail.airing ? "Airing" : "Air finished"}`}
                />

                <Header
                    size="small"
                    content={"Synopsis:"}
                    style={{
                        color: "white",
                        marginTop: "10px",
                        marginBottom: 0,
                    }}
                />
                <div className="synopsisStyle">{bangumiDetail.synopsis}</div>
            </div>
        </div>
    );
};

export default memo(BangumiDetailLabel);
