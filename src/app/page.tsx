"use client";
import { use } from "react";
import Header from "@/components/Header/page";
import Banner from "@/components/Banner/page";
import Row from "@/components/Row/page";
import requests from "@/utils/requests";
import Footer from "@/components/Footer/page";
import Modal from "@/components/Modal/page";

async function getData() {
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
    } = use(getData());

    return (
        <div className="relative h-[50vh] bg-gradient-to-b md:h-[70vh] lg:h-[140vh]">
            <Header />
            <main className="relative pl-5 pb-12 md:pl-8 md:pb-16 lg:pl-16 lg:pb-[80px]">
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
