import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "@/redux/provider";
import RequireAuth from "@/components/RequireAuth/page";

export const metadata = {
    title: "Home - Netflix",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AppProvider>
                    <RequireAuth>
                        {children}
                        <Toaster position="bottom-center" />
                    </RequireAuth>
                </AppProvider>
            </body>
        </html>
    );
}
