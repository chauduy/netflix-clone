"use client";
import React, { useEffect } from "react";
import Header from "../Header/page";
import Banner from "../Banner/page";
import Row from "../Row/page";
import Footer from "../Footer/page";
import Modal from "../Modal/page";
import { Movie } from "@/type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Product } from "@stripe/firestore-stripe-payments";
import Plans from "../Plans/page";
import useSubscription from "@/hook/useSubscription";
import AppLoading from "../AppLoading/page";
import { setProduct } from "@/redux/features/product/productSlice";
import useList from "@/hook/useList";

interface MainCategory {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
    products: Product[];
}

function Main({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
    products,
}: MainCategory) {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const { subscription } = useSubscription();
    const list = useList(user?.uid);

    useEffect(() => {
        dispatch(setProduct(products));
    }, [user]);

    if (subscription === null) return <AppLoading />;

    // Protect application when user not subscribe
    if (subscription === undefined) return <Plans products={products} />;

    return (
        <div className="relative h-[50vh] bg-gradient-to-b md:h-[70vh] lg:h-[140vh]">
            <Header />
            <main className="relative pb-12 pl-5 md:pb-16 md:pl-8 lg:pb-[80px] lg:pl-16">
                <Banner netflixOriginals={netflixOriginals} />
                <section className="md:space-y-10 lg:space-y-28">
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Action Thrillers" movies={actionMovies} />
                    {/* My List Component */}
                    {list?.length! > 0 && <Row title="My List" movies={list} />}
                    <Row title="Comedies" movies={comedyMovies} />
                    <Row title="Scary Movies" movies={horrorMovies} />
                    <Row title="Romance Movies" movies={romanceMovies} />
                    <Row title="Documentaries" movies={documentaries} />
                </section>
            </main>
            <Footer />
            <Modal />
        </div>
    );
}

export default Main;
