import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BangumiDetailType } from "@/interface/BangumiDetailType";
import BangumiDetailApi from "@/api/bangumi_detail";
import type { JikanAnime } from "@/api/types";
import Navbar from "@/components/navbar";
import BangumiDetailLabel from "@/components/bangumi_detail_label";
import "./index.css";

const airingDateToString = (airing: string | null): string =>
    airing ? airing.slice(0, 10).replaceAll("-", "/") : "Unknown";

const toBangumiDetail = (res: JikanAnime): BangumiDetailType => ({
    anime_id: res.mal_id,
    title: res.title,
    title_japanese: res.title_japanese ?? "",
    image_url: res.images.jpg.image_url,
    episodes: res.episodes ?? 0,
    status: res.status ?? "Unknown",
    airing: res.airing,
    aired_from: airingDateToString(res.aired.from),
    aired_to: airingDateToString(res.aired.to),
    synopsis: res.synopsis ?? "",
    genres: res.genres.map((genre) => genre.name),
    producers: res.producers.map((producer) => producer.name),
});

const BangumiDetail = (): React.ReactElement => {
    const [bangumi, setBangumi] = useState<BangumiDetailType>();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const controller = new AbortController();
        if (!id) return;

        BangumiDetailApi.getBangumiDetailV2(id, controller.signal)
            .then((res) => {
                setBangumi(toBangumiDetail(res.data.data));
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
        <div className="navbarDetailPageStyle ">
            <Navbar />
            {bangumi ? (
                <BangumiDetailLabel bangumiDetail={bangumi} rating={0.0} />
            ) : (
                "loading"
            )}
        </div>
    );
};

export default BangumiDetail;
