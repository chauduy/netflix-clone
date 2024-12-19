"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    const pathname = usePathname();
    const isHidden =
        pathname.startsWith("/login") || pathname.startsWith("/registration");
    return (
        <footer
            className={`${isHidden ? "hidden" : "h-fit py-5 pl-5 md:py-8 md:pl-8 lg:py-10 lg:pl-60 bg-black"}`}
        >
            <div className="flex items-center space-x-7 pl-2">
                <Link
                    target={"_blank"}
                    href="https://www.facebook.com/netflix/"
                >
                    <FaFacebookF className="h-5 w-5" />
                </Link>
                <Link
                    target={"_blank"}
                    href="https://www.instagram.com/netflix/"
                >
                    <FaInstagram className="h-5 w-5" />
                </Link>
                <Link
                    target={"_blank"}
                    href="https://twitter.com/netflix?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
                >
                    <FaTwitter className="h-5 w-5" />
                </Link>
                <Link
                    target={"_blank"}
                    href="https://www.youtube.com/channel/UCWOA1ZGywLbqmigxE4Qlvuw"
                >
                    <FaYoutube className="h-5 w-5" />
                </Link>
            </div>
            <div className="mt-2 grid grid-cols-2 md:grid-cols-4 lg:max-w-[70vw]">
                <Link
                    target={"_blank"}
                    href="https://ir.netflix.net/ir-overview/profile/default.aspx"
                    className="footerLinkApp"
                >
                    Audio Description
                </Link>
                <Link
                    target={"_blank"}
                    href="https://ir.netflix.net/ir-overview/profile/default.aspx"
                    className="footerLinkApp"
                >
                    Gift Cards
                </Link>
                <Link
                    target={"_blank"}
                    href="https://ir.netflix.net/ir-overview/profile/default.aspx"
                    className="footerLinkApp"
                >
                    Investor Relations
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/legal/termsofuse"
                    className="footerLinkApp"
                >
                    Term of Use
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/legal/notices"
                    className="footerLinkApp"
                >
                    Legal Notices
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/en/node/134094"
                    className="footerLinkApp"
                >
                    Corporate Information
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/en"
                    className="footerLinkApp"
                >
                    Help Center
                </Link>
                <Link
                    target={"_blank"}
                    href="https://media.netflix.com/en/"
                    className="footerLinkApp"
                >
                    Media Center
                </Link>
                <Link
                    target={"_blank"}
                    href="https://jobs.netflix.com/"
                    className="footerLinkApp"
                >
                    Jobs
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/legal/privacy"
                    className="footerLinkApp"
                >
                    Privacy
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/legal/privacy#cookies"
                    className="footerLinkApp"
                >
                    Cookie Preferences
                </Link>
                <Link
                    target={"_blank"}
                    href="https://help.netflix.com/en/contactus"
                    className="footerLinkApp"
                >
                    Contact Us
                </Link>
            </div>
            <div className="mt-5 text-sm text-gray-500">
                © 1997-2023 Netflix, Inc.
            </div>{" "}
            <p className="mt-5 text-sm text-gray-500">
                This product uses the TMDb API but is not endorsed or certified
                by TMDb.
            </p>
            <a
                href="https://www.themoviedb.org/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <img
                    src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                    alt="Powered by TMDb"
                    className="mt-5 w-[200px]"
                />
            </a>
        </footer>
    );
}

export default Footer;
