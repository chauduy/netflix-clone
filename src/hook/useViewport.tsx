"use client";
import { useEffect, useState } from "react";

export const useViewport = () => {
    const [width, setWidth] = useState(
        typeof window !== "undefined" ? window.innerWidth : 0
    );

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleWindowResize = () => setWidth(window.innerWidth);

            window.addEventListener("resize", handleWindowResize);

            return () =>
                window.removeEventListener("resize", handleWindowResize);
        }
    }, []);

    return { width };
};
