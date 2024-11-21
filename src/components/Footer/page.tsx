import Link from "next/link";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className="h-fit py-5 pl-5 md:py-8 md:pl-8 lg:py-10 lg:pl-60">
            <div className="flex items-center space-x-7 pl-2">
                <FaFacebookF className="h-5 w-5" />
                <FaInstagram className="h-5 w-5" />
                <FaTwitter className="h-5 w-5" />
                <FaYoutube className="h-5 w-5" />
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
            </div>
        </div>
    );
}

export default Footer;
