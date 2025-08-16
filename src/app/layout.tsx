import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";



export const metadata: Metadata = {
  title: "School Management ",
  description: "A School Management App ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
