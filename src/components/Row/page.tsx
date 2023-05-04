"use client";
import { useRef, useState } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Movie } from "@/type";
import Thumbnail from "@/components/Thumbnail/page";

interface Props {
    title: string;
    movies: [Movie];
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);

    const handleClick = (direction: string) => {
        setIsMoved(true);
        if (rowRef.current) {
            const { scrollLeft, clientWidth } = rowRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
            if (direction === "left" && scrollTo <= 0) {
                setIsMoved(false);
            }
        }
    };

    return (
        <div className="h-32 space-y-0.5 md:h-36 md:space-y-2 lg:h-40">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-base lg:text-2xl">
                {title}
            </h2>
            <div className="group relative -ml-2">
                <RxChevronLeft
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 ${
                        !isMoved && "hidden"
                    }`}
                    onClick={() => handleClick("left")}
                />

                <div
                    className="flex items-center space-x-0.5 overflow-y-hidden overflow-x-scroll p-2 scrollbar-hide md:space-x-2.5"
                    ref={rowRef}
                >
                    {movies.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </div>

                <RxChevronRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    );
}

export default Row;
