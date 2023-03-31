import { use } from "react";
import Header from "./components/Header/page";
import Banner from "./components/Banner/page";
import Row from "./components/Row/page";
import requests from "./utils/requests";

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
        <div className="relative h-screen w-screen bg-gradient-to-b from-gray-900/10 to-[#010511]">
            <Header />
            <main className="relative w-screen pl-5 md:pl-8 lg:pl-10">
                <Banner netflixOriginals={netflixOriginals} />
                <section>
                    <Row title="Trending Now" movies={trendingNow} />
                    <Row title="Top Rated" movies={topRated} />
                    <Row title="Action Thrillers" movies={actionMovies} />
                    <Row title="Comedies" movies={comedyMovies} />
                    <Row title="Scary Movies" movies={horrorMovies} />
                    <Row title="Romance Movies" movies={romanceMovies} />
                    <Row title="Documentaries" movies={documentaries} />
                </section>
            </main>
            {/* <Modal /> */}
        </div>
    );
}

export const metadata = {
    title: "Home - Netflix",
    icons: "/netflix-icon.png",
};

export default Home;
