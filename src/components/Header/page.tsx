"use client";
import { useState, useEffect } from "react";
import { VscBell } from "react-icons/vsc";
import { RxMagnifyingGlass } from "react-icons/rx";
import Link from "next/link";
import MobileMenu from "../MobileMenu/page";
import Image from "next/image";
import { Modal as MuiModal } from "@mui/material";

function Header() {
    const [isScrolled, setIsScrolled] = useState<Boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

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
        <header className={`${isScrolled ? "bg-[#141414]" : ""}`}>
            <div className="relative flex items-center space-x-4 lg:space-x-8">
                <Link href={"/"}>
                    <img
                        src="https://rb.gy/ulxxee"
                        className="w-[40px] cursor-pointer object-contain md:w-[70px] lg:w-[90px]"
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
                <RxMagnifyingGlass className="h-6 w-6" />
                <p className="hidden text-[13px] font-normal lg:block">Kids</p>
                <VscBell
                    className="h-6 w-6"
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
                    <>
                        <div className="flex items-center p-4 gap-x-2 border-b-[1px] border-gray-400">
                            <Image
                                width={1000}
                                height={1000}
                                alt="noti-1"
                                src={"/images/noti-1.jpg"}
                                className="w-[100px] h-[60px] rounded"
                            />
                            <div className="flex flex-col">
                                <div className="text sm text-white">
                                    Suggestions for What to Watch
                                </div>
                                <div className="text-sm text-white">
                                    Browse your recommendations.
                                </div>
                                <span className="text-gray-400 text-xs">
                                    6 days ago
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center p-4 gap-x-2 border-b-[1px] border-gray-400">
                            <Image
                                width={1000}
                                height={1000}
                                alt="noti-2"
                                src={"/images/noti-2.jpg"}
                                className="w-[100px] h-[60px] rounded"
                            />
                            <div className="flex flex-col">
                                <div className="text sm text-white">
                                    Your Latest Top Picks
                                </div>
                                <div className="text-sm text-white">
                                    Find a new favorite.
                                </div>
                                <span className="text-gray-400 text-xs">
                                    1 week ago
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center p-4 gap-x-2 border-b-[1px] border-gray-400">
                            <Image
                                width={1000}
                                height={1000}
                                alt="noti-4"
                                src={"/images/noti-3.jpg"}
                                className="w-[100px] h-[60px] rounded"
                            />
                            <div className="flex flex-col">
                                <div className="text sm text-white">
                                    Suggestions for Tonight
                                </div>
                                <div className="text-sm text-white">
                                    Explore personalized picks.
                                </div>
                                <span className="text-gray-400 text-xs">
                                    1 weeks ago
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center p-4 gap-x-2 border-b-[1px] border-gray-400">
                            <Image
                                width={1000}
                                height={1000}
                                alt="noti-3"
                                src={"/images/noti-4.jpg"}
                                className="w-[100px] h-[60px] rounded"
                            />
                            <div className="flex flex-col">
                                <div className="text sm text-white">
                                    Top 10 movies: Vietnam
                                </div>
                                <div className="text-sm text-white">
                                    See what’s popular.
                                </div>
                                <span className="text-gray-400 text-xs">
                                    2 weeks ago
                                </span>
                            </div>
                        </div>
                    </>
                </MuiModal>
            </div>
        </header>
    );
}

export default Header;
