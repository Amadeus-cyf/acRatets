import React, { lazy, Suspense } from "react";
import { Provider } from "react-redux";
import store from "@/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AsyncState from "@/components/async_state";

const Home = lazy(() => import("@/containers/home"));
const BangumisView = lazy(() => import("@/containers/bangumis"));
const Login = lazy(() => import("@/containers/login"));
const Timeline = lazy(() => import("@/containers/timeline"));
const Rank = lazy(() => import("@/containers/rank"));
const BangumiDetail = lazy(() => import("@/containers/bangumi_detail"));

const App = (): React.ReactElement => (
    <Provider store={store}>
        <BrowserRouter>
            <Suspense
                fallback={
                    <AsyncState status="loading" message="Loading page…" />
                }
            >
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/bangumi" element={<BangumisView />} />
                    <Route path="/timeline" element={<Timeline />} />
                    <Route path="/rank" element={<Rank />} />
                    <Route
                        path="/bangumi_detail/:id"
                        element={<BangumiDetail />}
                    />
                </Routes>
            </Suspense>
        </BrowserRouter>
    </Provider>
);

export default App;
