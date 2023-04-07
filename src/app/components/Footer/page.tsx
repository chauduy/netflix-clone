import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

function Footer() {
    return (
        <div className="py-10 pl-5 md:pl-8 lg:pl-16">
            <div className="flex items-center space-x-7">
                <FaFacebookF className="h-6 w-6" />
                <FaInstagram className="h-6 w-6" />
                <FaTwitter className="h-6 w-6" />
                <FaYoutube className="h-6 w-6" />
            </div>
            <div className="max-h-6">
                <a href="" className="block">
                    Audio Description
                </a>
                <a href="" className="block">
                    Gift Cards
                </a>
                <a href="" className="block">
                    Investor Relations
                </a>
                <a href="" className="block">
                    Term of Use
                </a>
                <a href="" className="block">
                    Legal Notices
                </a>
                <a href="" className="block">
                    Corporate Information
                </a>
                <a href="" className="block">
                    Help Center
                </a>
                <a href="" className="block">
                    Media Center
                </a>
                <a href="" className="block">
                    Jobs
                </a>
                <a href="" className="block">
                    Privacy
                </a>
                <a href="" className="block">
                    Cookie Preferences
                </a>
                <a href="" className="block">
                    Contact Us
                </a>
            </div>
        </div>
    );
}

export default Footer;
