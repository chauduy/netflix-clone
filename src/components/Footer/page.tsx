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
                <a href="" className="footerLinkApp">
                    Audio Description
                </a>
                <a href="" className="footerLinkApp">
                    Gift Cards
                </a>
                <a href="" className="footerLinkApp">
                    Investor Relations
                </a>
                <a href="" className="footerLinkApp">
                    Term of Use
                </a>
                <a href="" className="footerLinkApp">
                    Legal Notices
                </a>
                <a href="" className="footerLinkApp">
                    Corporate Information
                </a>
                <a href="" className="footerLinkApp">
                    Help Center
                </a>
                <a href="" className="footerLinkApp">
                    Media Center
                </a>
                <a href="" className="footerLinkApp">
                    Jobs
                </a>
                <a href="" className="footerLinkApp">
                    Privacy
                </a>
                <a href="" className="footerLinkApp">
                    Cookie Preferences
                </a>
                <a href="" className="footerLinkApp">
                    Contact Us
                </a>
            </div>
            <div className="mt-5 text-sm text-gray-500">
                © 1997-2023 Netflix, Inc.
            </div>
        </div>
    );
}

export default Footer;
