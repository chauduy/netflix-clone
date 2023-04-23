import "./globals.css";
import { AuthProvider } from "./hook/useAuth";

export const metadata = {
    title: "Home - Netflix",
    icons: "/netflix-icon.png",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
