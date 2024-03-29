"use client";
import { use, useState, useEffect } from "react";
import Header from "@/components/Header/page";
import Banner from "@/components/Banner/page";
import Row from "@/components/Row/page";
import requests from "@/utils/requests";
import Footer from "@/components/Footer/page";
import Modal from "@/components/Modal/page";
import Plans from "@/components/Plans/page";
import { useAppSelector } from "@/redux/hooks";
import payments from "@/lib/stripe";
import useSubscription from "@/hook/useSubscription";
import {
    getProducts,
    onCurrentUserSubscriptionUpdate,
    Subscription,
} from "@stripe/firestore-stripe-payments";

async function getData() {
    const products = await getProducts(payments, {
        includePrices: true,
        activeOnly: true,
    });

    const [
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
    ] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchComedyMovies).then((res) => res.json()),
        fetch(requests.fetchHorrorMovies).then((res) => res.json()),
        fetch(requests.fetchRomanceMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);

    return {
        netflixOriginals: netflixOriginals.results,
        trendingNow: trendingNow.results,
        topRated: topRated.results,
        actionMovies: actionMovies.results,
        comedyMovies: comedyMovies.results,
        horrorMovies: horrorMovies.results,
        romanceMovies: romanceMovies.results,
        documentaries: documentaries.results,
        products: products,
    };
}

function Home() {
    const {
        netflixOriginals,
        trendingNow,
        topRated,
        actionMovies,
        comedyMovies,
        horrorMovies,
        romanceMovies,
        documentaries,
        products,
    } = use(getData());
    const { user } = useAppSelector((state) => state.auth);
    const [subscription, setSubscription] = useState<Subscription | null>(null);
    console.log("subscription", subscription);
    console.log("user", user);

    useEffect(() => {
        // if (!user) return;
        // console.log("run effect app");
        // onCurrentUserSubscriptionUpdate(payments, (snapshot) => {
        //     console.log("snapshot", snapshot);
        //     setSubscription(
        //         snapshot.subscriptions.filter(
        //             (subscription) =>
        //                 subscription.status === "active" ||
        //                 subscription.status === "trialing"
        //         )[0]
        //     );
        // });
        // setTest("123");

        console.log("done effect");
    }, []);

    // if (subscription === null) return null;

    // Protect application when user not subscribe
    // if (!subscription) return <Plans products={products} />;

    return (
        <div className="relative h-[50vh] bg-gradient-to-b md:h-[70vh] lg:h-[140vh]">
            <Header />
            <main className="relative pb-12 pl-5 md:pb-16 md:pl-8 lg:pb-[80px] lg:pl-16">
                <Banner netflixOriginals={netflixOriginals} />
                <section className="md:space-y-10 lg:space-y-28">
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Action Thrillers" movies={actionMovies} />
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
// export const metadata = {
//     title: "Home - Netflix",
//     icons: "/netflix-icon.png",
// };

export default Home;
