"use client";
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
