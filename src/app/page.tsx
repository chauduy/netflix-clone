import { use } from "react";
import requests from "@/api/requests";
import payments from "@/lib/stripe";
import { getProducts } from "@stripe/firestore-stripe-payments";
import Main from "@/components/Main/page";

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

    return (
        <Main
            netflixOriginals={netflixOriginals}
            trendingNow={trendingNow}
            topRated={topRated}
            actionMovies={actionMovies}
            comedyMovies={comedyMovies}
            horrorMovies={horrorMovies}
            romanceMovies={romanceMovies}
            documentaries={documentaries}
            products={products}
        />
    );
}

export default Home;
