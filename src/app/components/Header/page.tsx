"use client";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function Header() {
    const showMobileMenu = () => {
        document.getElementById("menu-mobile")?.classList.remove("hidden");
        document.getElementById("arrow-menu")?.classList.remove("hidden");
    };

    const hideMobileMenu = () => {
        document.getElementById("menu-mobile")?.classList.add("hidden");
        document.getElementById("arrow-menu")?.classList.add("hidden");
    };

    return (
        <header>
            <div className="relative flex items-center space-x-6 pl-5 md:space-x-10">
                <img
                    src="/netflix.png"
                    className="w-[40px] cursor-pointer object-contain md:h-[100px] md:w-[100px]"
                />

                <ul>
                    <li
                        className="navigationMenu"
                        onMouseOver={showMobileMenu}
                        onMouseLeave={hideMobileMenu}
                    >
                        <div className="flex items-center space-x-1 text-sm font-medium">
                            <div className="text-[7px]">Browse</div>
                            <ChevronDownIcon className="mt-1 h-4 w-4" />
                        </div>
                        <div id="arrow-menu" className="arrow hidden"></div>
                        <ul
                            id="menu-mobile"
                            className="absolute top-[60px] left-0 flex hidden h-[300px] w-[260px] flex-col items-center justify-center border-t-2 border-[#ffffff] bg-[#000000e6] text-[13px] font-normal"
                            onMouseOver={showMobileMenu}
                        >
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                Home
                            </li>
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                TV Shows
                            </li>
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                Movie
                            </li>
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                New & Popular
                            </li>
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                My List
                            </li>
                            <li
                                className="navItemMobile"
                                onMouseOver={showMobileMenu}
                            >
                                Browse by Languages
                            </li>
                        </ul>
                    </li>
                    <li className="navigationTab">Home</li>
                    <li className="navigationTab">TV Shows</li>
                    <li className="navigationTab">Movie</li>
                    <li className="navigationTab">New & Popular</li>
                    <li className="navigationTab">My List</li>
                    <li className="navigationTab">Browse by Languages</li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
