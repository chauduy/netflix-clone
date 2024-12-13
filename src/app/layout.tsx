import "./globals.css";
import { Toaster } from "react-hot-toast";
import AppProvider from "@/redux/provider";
import RequireAuth from "@/components/RequireAuth/page";
import Header from "@/components/Header/page";
import Footer from "@/components/Footer/page";

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
                        <Header />
                        {children}
                        <Footer />
                        <Toaster position="bottom-center" />
                    </RequireAuth>
                </AppProvider>
            </body>
        </html>
    );
}

export const metadata = {
    title: "Home - Watch movie",
    icons: "/netflix-icon.png",
};
