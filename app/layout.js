import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "./(main)/context/AuthContext";
import { CartProvider } from "./(main)/context/CartContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "ZestyEats",
  description: "This is a food delivery app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <main> */}
          <AuthProvider>{children}</AuthProvider>
        {/* </main> */}
      </body>
    </html>
  );
}
