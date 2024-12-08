"use client";
import { useRef, useState, useEffect } from "react";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { Movie } from "@/type";
import Thumbnail from "@/components/Thumbnail/page";
import { DocumentData } from "firebase/firestore";

interface Props {
    title: string;
    movies: Movie[] | DocumentData[] | null;
}

function Row({ title, movies }: Props) {
    const rowRef = useRef<HTMLDivElement>(null);
    const [isMoved, setIsMoved] = useState(false);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const checkOverflow = () => {
            if (rowRef.current) {
                setIsOverflowing(
                    rowRef.current.scrollWidth > rowRef.current.clientWidth
                );
            }
        };
        checkOverflow();

        // Optional: add a resize observer to handle window resizing
        window.addEventListener("resize", checkOverflow);
        return () => window.removeEventListener("resize", checkOverflow);
    }, [movies]);

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
        <div className="h-32 space-y-0.5 md:h-36 md:space-y-2 lg:h-full">
            <h2 className="w-56 cursor-pointer text-sm font-semibold text-[#e5e5e5] transition duration-200 hover:text-white md:text-[1.4vw]">
                {title}
            </h2>
            <div className="group relative -ml-2">
                <RxChevronLeft
                    className={`absolute bottom-0 left-2 top-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125 ${
                        !isMoved && "hidden"
                    }`}
                    onClick={() => handleClick("left")}
                />

                <div
                    id="row"
                    className="flex items-center space-x-0.5 overflow-y-hidden overflow-x-scroll p-2 scrollbar-hide md:space-x-2.5"
                    ref={rowRef}
                >
                    {movies?.map((movie) => (
                        <Thumbnail key={movie.id} movie={movie} />
                    ))}
                </div>

                {isOverflowing && (
                    <RxChevronRight
                        className="absolute bottom-0 right-2 top-0 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition group-hover:opacity-100 hover:scale-125"
                        onClick={() => handleClick("right")}
                    />
                )}
            </div>
        </div>
    );
}

export default Row;
