import { Movie } from "@/app/type";
import React from "react";
import Image from "next/image";

interface Props {
    movie: Movie;
}

function Thumbnail({ movie }: Props) {
    return (
        <div className="relative h-24 min-w-[160px] cursor-pointer transition duration-200 ease-out hover:z-30 hover:scale-125 md:h-36 md:min-w-[220px]">
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie?.backdrop_path || movie?.poster_path
                }`}
                alt="Thumbnail Image"
                fill
                className="rounded-sm object-cover md:rounded"
            />
        </div>
    );
}

export default Thumbnail;
