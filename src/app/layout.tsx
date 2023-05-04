import "./globals.css";
import { Providers } from "@/redux/provider";
import { AuthProvider } from "@/hook/useAuth";

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
                <Providers>
                    <AuthProvider>{children}</AuthProvider>
                </Providers>
            </body>
        </html>
    );
}
