"use client";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { CgInfo } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Movie } from "@/type";
import { baseUrl } from "@/constants";
import { openModal } from "@/redux/features/modal/modalSlice";
import { useAppDispatch } from "@/redux/hooks";

interface Props {
    netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        );
    }, [netflixOriginals]);

    return (
        <div className="flex flex-col space-y-2 py-16 md:h-[55vh] md:justify-end md:space-y-4 lg:h-[95vh] lg:pb-12">
            <div className="absolute left-0 top-0 -z-10 h-[50vh] w-full md:h-[70vh] lg:h-[140vh]">
                <Image
                    src={`${baseUrl}${
                        movie?.backdrop_path || movie?.poster_path
                    }`}
                    alt="Banner Image"
                    fill
                    className="object-cover"
                    sizes=""
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
                <button
                    className="bannerButton bg-[gray]/70"
                    onClick={() => {
                        dispatch(openModal(movie));
                    }}
                >
                    <CgInfo className="h-5 w-5 md:h-8 md:w-8" />
                    More Info
                </button>
            </div>
        </div>
    );
}

export default Banner;
