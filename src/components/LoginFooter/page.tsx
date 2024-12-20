"use client";
import a from "next/link";
import React, { useState } from "react";

function LoginFooter() {
    const [language, setLanguage] = useState<string>("en");

    return (
        <div className="absolute bottom-0 h-fit w-full bg-black/75 px-6 py-7 md:px-9 md:py-12 md:pl-56 xl:pl-96">
            <a
                href="https://help.netflix.com/en/contactus"
                className="text-[16px] font-normal text-[#737373] hover:underline"
                target="_blank"
            >
                Questions? Contact us.
            </a>
            <div className="mt-3 grid grid-cols-2 md:grid-cols-4 lg:max-w-[70vw]">
                <a
                    href="https://help.netflix.com/en/node/412"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    FAQ
                </a>
                <a
                    href="https://help.netflix.com/en/"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    Help Center
                </a>
                <a
                    href="https://help.netflix.com/legal/termsofuse"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    Terms of Use
                </a>
                <a
                    href="https://help.netflix.com/legal/privacy"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    Privacy
                </a>
                <a
                    href="https://www.netflix.com/vn-en/login#"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    Cookie Preferences
                </a>
                <a
                    href="https://help.netflix.com/legal/corpinfo"
                    className="footerLinkLogin"
                    target="_blank"
                >
                    Corporate Information
                </a>
            </div>
            {/* <p className="mt-5 text-sm text-gray-500">
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
            </a> */}
            <select
                className="mt-6 min-w-[100px] rounded border border-[#333] bg-[#000] px-5 py-3.5 text-[13px] text-[#737373] outline-none"
                value={language}
                onChange={(e) => {
                    setLanguage(e.target.value);
                }}
            >
                <option value="en" data-icon="glyphicon-star">
                    English
                </option>
                <option value="vn">Tiếng Việt</option>
            </select>
        </div>
    );
}

export default LoginFooter;
