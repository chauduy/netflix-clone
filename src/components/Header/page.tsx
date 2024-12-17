"use client";
import { useState, useEffect, useRef } from "react";
import { VscBell } from "react-icons/vsc";
import { RxMagnifyingGlass } from "react-icons/rx";
import Link from "next/link";
import MobileMenu from "../MobileMenu/page";
import Image from "next/image";
import { Modal as MuiModal } from "@mui/material";

function Header() {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openSearch, setOpenSearch] = useState<boolean>(false);
    const searchRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target as Node)
            ) {
                setOpenSearch(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={`${isScrolled ? "bg-[#141414]" : ""}`}>
            <div className="relative flex items-center space-x-4 lg:space-x-8">
                <Link href={"/"}>
                    <img
                        src="https://rb.gy/ulxxee"
                        className="w-[40px] cursor-pointer object-contain md:w-[70px] lg:w-[90px]"
                        alt="Logo"
                    />
                </Link>

                <MobileMenu />

                <ul className="hidden items-center space-x-4 md:flex">
                    <li className="navigationTab">Home</li>
                    <li className="navigationTab">TV Shows</li>
                    <li className="navigationTab">Movies</li>
                    <li className="navigationTab">New & Popular</li>
                    <Link href={"/my-list"} className="navigationTab">
                        My List
                    </Link>
                    <li className="navigationTab">Browse by Languages</li>
                </ul>
            </div>

            <div className="relative flex items-center space-x-4 font-light">
                <div ref={searchRef}>
                    {openSearch ? (
                        <div className="flex items-center w-[250px] bg-black border-[1px] border-white py-1 px-2">
                            <RxMagnifyingGlass className="h-6 w-6 mr-2" />
                            <input
                                className={`bg-black outline-none ${openSearch ? "search-input-open" : "search-input-closed"}`}
                                placeholder="Titles, people, genres"
                            />
                        </div>
                    ) : (
                        <RxMagnifyingGlass
                            className="h-6 w-6 cursor-pointer"
                            onClick={() => setOpenSearch(true)}
                        />
                    )}
                </div>
                <VscBell
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setOpen((prevState) => !prevState)}
                />
                <Link href={"/account"}>
                    <img
                        src="https://rb.gy/g1pwyx"
                        alt=""
                        className="cursor-pointer rounded"
                    />
                </Link>
                <MuiModal
                    className="absolute top-[70px] left-[7vw] md:left-[44vw] lg:left-[69vw] bg-black/70 w-[75vw] md:w-[45vw] lg:w-[25vw] h-fit flex flex-col border border-gray-400 border-t-[2px] border-t-white"
                    open={open}
                    onClose={() => setOpen(false)}
                >
                    <div className="flex flex-col p-4 gap-y-2">
                        {/* Notification content */}
                        <Image
                            width={1000}
                            height={1000}
                            alt="Notification Image"
                            src="/images/noti-1.jpg"
                            className="w-[100px] h-[60px] rounded"
                        />
                        <div className="text-white text-sm">
                            Suggestions for What to Watch
                        </div>
                    </div>
                </MuiModal>
            </div>
        </header>
    );
}

export default Header;
