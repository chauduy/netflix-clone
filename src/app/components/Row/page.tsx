import { Movie } from "@/app/type";
import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
    title: string;
    movies: [Movie];
}

function Row({ title, movies }: Props) {
    return (
        <div className="h-40">
            <h2>{title}</h2>
            <div>
                <ChevronLeftIcon className="h-9 w-9" />
                <ChevronRightIcon className="h-9 w-9" />
            </div>
        </div>
    );
}

export default Row;
