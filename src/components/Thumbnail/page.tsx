import Image from "next/image";
import { Movie } from "@/type";
import { useAppDispatch } from "@/redux/hooks";
import { DocumentData } from "firebase/firestore";
import { fetchTrailer } from "@/redux/features/modal/modalThunk";
import { setModalMovie } from "@/redux/features/modal/modalSlice";

interface Props {
    movie: Movie | DocumentData | null;
}

function Thumbnail({ movie }: Props) {
    const dispatch = useAppDispatch();

    return (
        <div
            className={`relative flex-shrink-0 cursor-pointer transition duration-200 ease-out w-[43vw] h-[100px] max-w-[170px] md:w-[calc(100%/4.5)] md:h-[120px] md:max-w-[190px] lg:w-[calc(100%/6.5)] lg:h-[125px] lg:max-w-[230px] xl:h-[140px] 2xl:max-w-[280px] 2xl:h-[170px] ${movie?.backdrop_path || movie?.poster_path ? "hover:z-30 hover:scale-125" : ""}`}
            onClick={() => {
                dispatch(setModalMovie(movie));
                dispatch(fetchTrailer({ movie: movie }));
            }}
        >
            <Image
                src={
                    movie?.backdrop_path || movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w500${
                              movie?.backdrop_path || movie?.poster_path
                          }`
                        : "/images/not-available-movie.webp"
                }
                alt="Thumbnail Image"
                fill
                className={`rounded-[0.2vw] object-cover ${movie?.backdrop_path || movie?.poster_path ? "" : "border-[1px] border-white"}`}
            />
        </div>
    );
}

export default Thumbnail;
