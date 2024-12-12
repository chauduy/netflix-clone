"use client";
import Image from "next/image";
import { FaPlay } from "react-icons/fa";
import { CgInfo } from "react-icons/cg";
import { useEffect, useState } from "react";
import { Movie, MovieType } from "@/type";
import { baseUrl } from "@/constants";
import { useAppDispatch } from "@/redux/hooks";
import { fetchTrailer } from "@/redux/features/modal/modalThunk";
import { setModalMovie } from "@/redux/features/modal/modalSlice";
import requests from "@/api/requests";
import ReactPlayer from "react-player";
import { HiOutlineVolumeOff, HiOutlineVolumeUp } from "react-icons/hi";

interface Props {
    netflixOriginals: Movie[];
}

function Banner({ netflixOriginals }: Props) {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [trailer, setTrailer] = useState<string>("");
    const [muted, setMuted] = useState(true);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setMovie(
            netflixOriginals[
                Math.floor(Math.random() * netflixOriginals.length)
            ]
        );
    }, [netflixOriginals]);

    useEffect(() => {
        if (!movie) return;

        async function getTrailer() {
            const response = await fetch(requests.fetchTrailer(movie));
            const result = await response.json();
            if (result?.videos) {
                const index = result?.videos?.results?.findIndex(
                    (item: MovieType) => item.type === "Trailer"
                );
                setTrailer(result?.videos?.results?.[index]?.key);
            }
        }

        getTrailer();
    }, [movie]);

    return (
        <div className="banner flex flex-col py-16 md:h-[55vh] md:justify-center lg:h-[95vh] lg:pb-12">
            <div className="absolute left-0 top-0 h-[50vh] w-full md:h-[70vh] lg:h-[140vh]">
                {trailer ? (
                    <div className="absolute top-[-28vh] left-0 w-full h-full z-0">
                        <ReactPlayer
                            url={`https://www.youtube.com/embed/${trailer}`}
                            width="100%"
                            height="100%"
                            style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                            }}
                            playing
                            muted={muted}
                            onEnded={() => setTrailer("")}
                        />
                        <div className="bg-transparent w-full h-full z-10 absolute"></div>
                    </div>
                ) : (
                    <Image
                        src={`${baseUrl}${
                            movie?.backdrop_path || movie?.poster_path
                        }`}
                        alt="Banner Image"
                        fill
                        className="object-cover"
                        sizes=""
                    />
                )}
            </div>
            <div className="z-20 space-y-2 md:space-y-4">
                <h1 className="max-w-md text-sm font-bold md:text-xl lg:text-7xl">
                    {movie?.original_title}
                </h1>
                <p className="max-w-xs text-[10px] text-shadow-lg md:max-w-lg md:text-lg lg:max-w-2xl lg:text-2xl">
                    {`${movie?.overview?.substring(0, 150)}...`}
                </p>
                <div className="flex items-center justify-between pr-5 md:pr-8 lg:pr-16">
                    <div className="flex max-w-md space-x-2">
                        <button className="bannerButton bg-white text-black">
                            <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
                            Play
                        </button>
                        <button
                            className="bannerButton bg-[gray]/70"
                            onClick={() => {
                                dispatch(setModalMovie(movie));
                                dispatch(fetchTrailer({ movie: movie }));
                            }}
                        >
                            <CgInfo className="h-5 w-5 md:h-8 md:w-8" />
                            More Info
                        </button>
                    </div>
                    <button
                        className="modalButton"
                        onClick={() => setMuted(!muted)}
                    >
                        {muted ? (
                            <HiOutlineVolumeUp className="h-6 w-6" />
                        ) : (
                            <HiOutlineVolumeOff className="h-6 w-6" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Banner;
