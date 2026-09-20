import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BangumiDetailType } from "@/interface/BangumiDetailType";
import BangumiDetailApi from "@/api/bangumi_detail";
import type { JikanAnime } from "@/api/types";
import Navbar from "@/components/navbar";
import BangumiDetailLabel from "@/components/bangumi_detail_label";
import AsyncState, { LoadStatus } from "@/components/async_state";
import { useRetry } from "@/hooks/useRetry";
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
    const [status, setStatus] = useState<LoadStatus>("loading");
    const [retryKey, retry] = useRetry();
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const controller = new AbortController();
        setBangumi(undefined);
        setStatus("loading");
        if (!id) {
            setStatus("error");
            return () => controller.abort();
        }

        BangumiDetailApi.getBangumiDetailV2(id, controller.signal)
            .then((res) => {
                setBangumi(toBangumiDetail(res.data.data));
                setStatus("success");
            })
            .catch(() => {
                if (controller.signal.aborted) return;
                return BangumiDetailApi.getBangumiDetailV1(
                    id,
                    controller.signal
                );
            })
            .then((res) => {
                if (res) {
                    setBangumi(res.data.data.bangumi);
                    setStatus("success");
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) setStatus("error");
            });

        return () => controller.abort();
    }, [id, retryKey]);

    return (
        <div className="navbarDetailPageStyle ">
            <Navbar />
            {bangumi ? (
                <BangumiDetailLabel bangumiDetail={bangumi} rating={0.0} />
            ) : (
                <AsyncState
                    onRetry={retry}
                    status={status === "success" ? "loading" : status}
                    message={
                        status === "error"
                            ? "Anime details could not be loaded."
                            : "Loading anime details…"
                    }
                />
            )}
        </div>
    );
};

export default BangumiDetail;
