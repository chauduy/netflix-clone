import { Movie } from "@/app/type";
import Image from "next/image";

interface Props {
    movie: Movie;
}

function Thumbnail({ movie }: Props) {
    return (
        <div className="relative h-[82px] min-w-[150px] cursor-pointer transition duration-200 ease-out hover:z-30 hover:scale-125 md:h-[130px] md:min-w-[230px] lg:h-[165px] lg:min-w-[290px]">
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
