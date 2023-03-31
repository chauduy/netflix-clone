"use client";
import { Movie } from "@/app/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { baseUrl } from "@/app/constants";
import { FaPlay } from "react-icons/fa";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

interface Props {
    netflixOriginals: [Movie];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        setMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        );
    }, [netflixOriginals]);
    console.log("movie", movie);

    return (
        <div className="flex flex-col space-y-2 py-16 md:h-[55vh] md:justify-end md:space-y-4 lg:h-[95vh] lg:pb-12">
            <div className="absolute top-0 left-0 -z-10 h-[30vh] w-screen md:h-[55vh] lg:h-[95vh]">
                <Image
                    src={`${baseUrl}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt="Banner Image"
                    fill
                    className="object-cover"
                />
            </div>
            <h1 className="max-w-md text-sm font-bold md:text-xl lg:text-7xl">
                {movie?.original_title}
            </h1>
            <p className="max-w-xs text-[10px] text-shadow-lg md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                {`${movie?.overview?.substring(0, 150)}...`}
            </p>
            <div className="flex max-w-md space-x-2">
                <button className="bannerButton bg-white text-black">
                    <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                    Play
                </button>
                <button className="bannerButton bg-[gray]/70">
                    <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" />
                    More Info
                </button>
            </div>
        </div>
    );
}

export default Banner;
