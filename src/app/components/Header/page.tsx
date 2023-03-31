"use client";
import { useState, useEffect } from "react";
import { BellIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function Header() {
    const [isScrolled, setIsScrolled] = useState<Boolean>(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header className={`${isScrolled && "bg-[#141414]"}`}>
            <div className="relative flex items-center space-x-4 lg:space-x-8">
                <img
                    src="/netflix.png"
                    className="w-[40px] cursor-pointer object-contain md:w-[70px] lg:w-[90px]"
                />

                <ul className="hidden items-center space-x-4 lg:flex">
                    <li className="navigationTab">Home</li>
                    <li className="navigationTab">TV Shows</li>
                    <li className="navigationTab">Movies</li>
                    <li className="navigationTab">New & Popular</li>
                    <li className="navigationTab">My List</li>
                    <li className="navigationTab">Browse by Languages</li>
                </ul>
            </div>
            <div className="flex items-center space-x-4 font-light">
                <MagnifyingGlassIcon className="h-6 w-6" />
                <p className="hidden text-[13px] font-normal lg:block">Kids</p>
                <BellIcon className="h-6 w-6" />
                <Link href="/account">
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
            </div>
        </header>
    );
}

export default Header;
