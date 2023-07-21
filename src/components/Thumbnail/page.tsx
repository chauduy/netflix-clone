import Image from "next/image";
import { Movie } from "@/type";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/features/modal/modalSlice";

interface Props {
    movie: Movie;
}

function Thumbnail({ movie }: Props) {
    const dispatch = useAppDispatch();

    return (
        <div
            className="relative h-[82px] min-w-[150px] cursor-pointer transition duration-200 ease-out hover:z-30 hover:scale-125 md:h-[130px] md:min-w-[230px] lg:h-[165px] lg:min-w-[290px]"
            onClick={() => {
                dispatch(openModal(movie));
            }}
        >
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
