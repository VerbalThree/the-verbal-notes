import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "@/style/globals.css";

const primary_font = Courier_Prime({
    weight: "400",
    subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "the verbal notes",
  description: "notes wrote by Felipe Pereira.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  const title = String.raw`           
| |_| |_ ___    _ _ ___ ___| |_ ___| |   ___ ___| |_ ___ ___ 
|  _|   | -_|  | | | -_|  _| . | .'| |  |   | . |  _| -_|_ -|
|_| |_|_|___|   \_/|___|_| |___|__,|_|  |_|_|___|_| |___|___|
        `;

  return (
    <html lang="en">
      <body
        className={primary_font.className}>
        <h1 className="text-left m-4">
          <pre>
            {title}
          </pre>
        </h1>
        <hr className="dotted"></hr>
        {children}
      </body>
    </html>
  );
}
