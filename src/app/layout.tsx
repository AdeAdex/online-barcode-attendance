import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/Navbar"; // Adjust the import path based on your project structure

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Online Class Attendance",
  description: "Online Class Attendance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{backgroundColor:"#FFF8ED"}} className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
