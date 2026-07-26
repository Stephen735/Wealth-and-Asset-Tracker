// Root layout: Main application layout

import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Wealth & Asset Tracker",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <header>
                    <h1>Wealth & Asset Tracker</h1>
                </header>
                {children}
            </body>
        </html>
    );
}
