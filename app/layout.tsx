import type { Metadata } from "next";
import localFont from "next/font/local";
import "katex/dist/katex.min.css";
import SiteHeader from "./components/SiteHeader";
import "./globals.css";

const banglaFont = localFont({
  src: [
    {
      path: "../public/fonts/July-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/July-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/July-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/July-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-bangla",
});

export const metadata: Metadata = {
  title: "রুহুলের সাথে এআই",
  description: "Thoughts on AI, research, systems, and building things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={banglaFont.variable}>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}