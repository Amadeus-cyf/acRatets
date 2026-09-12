import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BangumiDetailType } from "../../interface/BangumiDetailType";
import BangumiDetailApi from "../../api/bangumi_detail";
import Navibar from "../../components/navibar";
import BangumiDetailLabel from "../../components/bangumi_detail_label";
import "./index.css";

interface AiringDate {
    day: number;
    month: number;
    year: number;
}
interface BangumiDetailRespType {
    mal_id: number;
    title: string;
    title_japanese: string;
    image_url: string;
    episodes: number;
    status: string;
    airing: boolean;
    aired: { prop: { from: AiringDate; to: AiringDate } };
    synopsis: string;
    genres: Array<{ name: string }>;
    producers: Array<{ name: string }>;
}

const airingDateToString = (airing: AiringDate): string =>
    `${airing.year}/${airing.month}/${airing.day}`;

const toBangumiDetail = (res: BangumiDetailRespType): BangumiDetailType => ({
    anime_id: res.mal_id,
    title: res.title,
    title_japanese: res.title_japanese,
    image_url: res.image_url,
    episodes: res.episodes,
    status: res.status,
    airing: res.airing,
    aired_from: airingDateToString(res.aired.prop.from),
    aired_to: airingDateToString(res.aired.prop.to),
    synopsis: res.synopsis,
    genres: res.genres.map((genre) => genre.name),
    producers: res.producers.map((producer) => producer.name),
});

const BangumiDetail = (): JSX.Element => {
    const [bangumi, setBangumi] = useState<BangumiDetailType>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const controller = new AbortController();
        if (!id) return;

        BangumiDetailApi.getBangumiDetailV2(id, controller.signal)
            .then((res) => {
                setBangumi(toBangumiDetail(res.data));
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                console.log(err);
                return BangumiDetailApi.getBangumiDetailV1(
                    id,
                    controller.signal
                );
            })
            .then((res) => {
                if (res) setBangumi(res.data.data.bangumi);
            })
            .catch((err) => {
                if (!controller.signal.aborted) console.log(err);
            });

        return () => controller.abort();
    }, [id]);

    return (
        <div className="navibarDetailPageStyle ">
            <Navibar />
            {bangumi ? (
                <BangumiDetailLabel bangumiDetail={bangumi} rating={0.0} />
            ) : (
                "loading"
            )}
        </div>
    );
};

export default BangumiDetail;
