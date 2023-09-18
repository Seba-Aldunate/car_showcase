import "./globals.css"
import { Navbar, Footer } from "@/components";


export const metadata = {
  title: "Car hub",
  description: "Descubre los mejores coches",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
