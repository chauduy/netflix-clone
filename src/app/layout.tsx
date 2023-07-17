import "./globals.css";
import { AuthProvider } from "@/hook/useAuth";
import { AppProvider } from "@/redux/provider";

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
                <AuthProvider>
                    <AppProvider>
                        {children}
                    </AppProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
