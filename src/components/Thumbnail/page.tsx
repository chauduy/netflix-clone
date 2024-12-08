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
            className="relative cursor-pointer transition duration-200 ease-out hover:z-30 hover:scale-125 min-w-[48%] md:min-w-[24%] lg:min-w-[calc(100%/6.5)] min-h-[10vh] lg:min-h-[18vh]"
            onClick={() => {
                dispatch(setModalMovie(movie));
                dispatch(fetchTrailer({ movie: movie }));
            }}
        >
            <Image
                src={`https://image.tmdb.org/t/p/w500${
                    movie?.backdrop_path || movie?.poster_path
                }`}
                alt="Thumbnail Image"
                fill
                className="rounded-[0.2vw] object-cover"
            />
        </div>
    );
}

export default Thumbnail;
