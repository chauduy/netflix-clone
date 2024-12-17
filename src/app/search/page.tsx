"use client";
import requests from "@/api/requests";
import Loader from "@/components/Loader/page";
import Modal from "@/components/Modal/page";
import Thumbnail from "@/components/Thumbnail/page";
import { Movie } from "@/type";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";

function Search() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalPage, setTotalPage] = useState();
    const [currentPage, setCurrentPage] = useState(2);
    const param = useSearchParams();
    const query = param.get("query") || "";

    useEffect(() => {
        if (!query) return;

        const getSearchMovies = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    fetch(requests.searchMovie(query, 1)),
                    fetch(requests.searchMovie(query, 2)),
                ]);

                const [result1, result2] = await Promise.all([
                    res1.json(),
                    res2.json(),
                ]);

                const combinedResults = [
                    ...(result1?.results || []),
                    ...(result2?.results || []),
                ];
                setTotalPage(result1?.total_pages);
                setMovies(combinedResults);
            } catch (error) {
                console.error("Error fetching search movies:", error);
            }
        };
        getSearchMovies();
    }, [query]);

    const loadMoreMovie = async () => {
        const nextPage = currentPage + 1;
        const res = await fetch(requests.searchMovie(query, nextPage));
        const result = await res.json();
        const concatData = [...movies].concat(result?.results);
        setCurrentPage(nextPage);
        setMovies(concatData);
    };

    return (
        <div className="px-5 md:px-8 lg:px-16 min-h-screen h-full py-4 md:py-8">
            <div className="mt-16 md:mt-32">
                <h1 className="mb-16 text-2xl text-white lg:text-3xl">
                    Results for {query}
                </h1>
                <InfiniteScroll
                    pageStart={2}
                    hasMore={totalPage! > currentPage}
                    loader={
                        <div className="flex justify-center">
                            <Loader color="white" />
                        </div>
                    }
                    className="flex flex-wrap gap-x-2 gap-y-8 w-full"
                    loadMore={loadMoreMovie}
                >
                    {movies?.map((movie, index) => (
                        <Thumbnail key={index} movie={movie} />
                    ))}
                </InfiniteScroll>
            </div>
            <Modal />
        </div>
    );
}

export default Search;
