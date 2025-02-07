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
            className={`relative cursor-pointer transition duration-200 ease-out min-w-[43vw] min-h-[100px] md:min-w-[100%/4.5] lg:min-w-[calc(100%/6.5)] lg:min-h-[18vh] ${movie?.backdrop_path || movie?.poster_path ? "hover:z-30 hover:scale-125" : ""}`}
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
