import Navbar from "@/components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

export const metadata = {
  title: "ZestyEats",
  description: "This is a food delivery app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
