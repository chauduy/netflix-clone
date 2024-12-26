"use client";
import React, { useEffect } from "react";
import Banner from "../Banner/page";
import Row from "../Row/page";
import Modal from "../Modal/page";
import { Movie } from "@/type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import Plans from "../Plans/page";
import useSubscription from "@/hook/useSubscription";
import AppLoading from "../AppLoading/page";
import { setProduct } from "@/redux/features/product/productSlice";
import useList from "@/hook/useList";
import payments from "@/lib/stripe";

interface MainCategory {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    comedyMovies: Movie[];
    horrorMovies: Movie[];
    romanceMovies: Movie[];
    documentaries: Movie[];
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
}: MainCategory) {
    const { user } = useAppSelector((state: RootState) => state.auth);
    const { products } = useAppSelector((state: RootState) => state.product);
    const dispatch = useAppDispatch();
    const { subscription } = useSubscription();
    const list = useList(user?.uid);

    useEffect(() => {
        async function getItem() {
            const products = await getProducts(payments, {
                includePrices: true,
                activeOnly: true,
            });
            dispatch(setProduct(products));
            console.log("calling");
        }

        getItem();
    }, []);

    if (subscription === null) return <AppLoading />;

    // Protect application when user not subscribe
    if (subscription === undefined) return <Plans products={products} />;

    return (
        <main className="relative pb-12 pl-5 md:pb-16 md:pl-8 lg:pb-[80px] lg:pl-16 bg-black">
            <Banner netflixOriginals={netflixOriginals} />
            <section className="relative flex flex-col gap-y-2 md:gap-y-12 mt-[-5vh] md:mt-[-23vh]">
                <Row title="Trending Now" movies={trendingNow} />
                <Row title="Top Rated" movies={topRated} />
                <Row title="Action Thrillers" movies={actionMovies} />
                {/* My List Component */}
                {list?.length! > 0 && <Row title="My List" movies={list} />}
                <Row title="Comedies" movies={comedyMovies} />
                <Row title="Scary Movies" movies={horrorMovies} />
                <Row title="Romance Movies" movies={romanceMovies} />
                <Row title="Documentaries" movies={documentaries} />
                <div className="absolute bg-black w-full top-[150px] left-0 h-full" />
            </section>
            <Modal />
        </main>
    );
}

export default Main;
