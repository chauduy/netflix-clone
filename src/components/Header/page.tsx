"use client";
import { useState, useEffect } from "react";
import { VscBell } from "react-icons/vsc";
import { RxMagnifyingGlass } from "react-icons/rx";
import useAuth from "@/hook/useAuth";

function Header() {
    const [isScrolled, setIsScrolled] = useState<Boolean>(false);
    const { logOut } = useAuth();

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
                    src="https://rb.gy/ulxxee"
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
                <RxMagnifyingGlass className="h-6 w-6" />
                <p className="hidden text-[13px] font-normal lg:block">Kids</p>
                <VscBell className="h-6 w-6" />
                <button onClick={logOut}>
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </button>
            </div>
        </header>
    );
}

export default Header;
