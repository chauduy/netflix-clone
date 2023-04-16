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
                <div className="footerLink">
                    <a href="">Audio Description</a>
                </div>
                <div className="footerLink">
                    <a href="">Gift Cards</a>
                </div>
                <div className="footerLink">
                    <a href="">Investor Relations</a>
                </div>
                <div className="footerLink">
                    <a href="">Term of Use</a>
                </div>
                <div className="footerLink">
                    <a href="">Legal Notices</a>
                </div>
                <div className="footerLink">
                    <a href="">Corporate Information</a>
                </div>
                <div className="footerLink">
                    <a href="">Help Center</a>
                </div>
                <div className="footerLink">
                    <a href="">Media Center</a>
                </div>
                <div className="footerLink">
                    <a href="">Jobs</a>
                </div>
                <div className="footerLink">
                    <a href="">Privacy</a>
                </div>
                <div className="footerLink">
                    <a href="">Cookie Preferences</a>
                </div>
                <div className="footerLink">
                    <a href="">Contact Us</a>
                </div>
            </div>
            <div className="mt-5 text-sm text-gray-500">
                © 1997-2023 Netflix, Inc.
            </div>
        </div>
    );
}

export default Footer;
