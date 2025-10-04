import type { Metadata } from "next";
import "./globals.css";
import { ProviderWrapper } from "../lib/redux/provider";
import { Inter, Roboto } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-roboto-bold",
});

export const metadata: Metadata = {
  title: "Kanban app",
  description: "Your productivity app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${inter.variable} scroll-smooth ${roboto.variable}`}>
      <body className={`antialiased font-inter`}>
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
