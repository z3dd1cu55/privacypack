import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jetBrainsMono = localFont({
    src: "/JetBrainsMono.ttf",
});

export const metadata: Metadata = {
    title: "PrivacyPack",
    description: "PrivacyPack",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${jetBrainsMono.className} antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
