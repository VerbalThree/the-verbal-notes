import type { Metadata } from "next";
import { Courier_Prime } from "next/font/google";
import "@/style/globals.css";
import Link from "next/link";

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
  
  const title_mobile = String.raw`               
  _/_/_ _     _  _/_ _  /
  / / //_' |//_'//_//_|/ 
   _  _ _/__   _         
  / //_// /_'_\          
  `;

  return (
    <html className="overflow-x-hidden lg:overflow-auto" lang="en">
      <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body
        className={primary_font.className}>
        <div className="mt-[5px] ml-[1rem] mr-[1rem] mb-[2rem]">
        <Link href="/">
        <h1 className="w-[34rem]">
          <pre className="hidden sm:block" id="pre">
            {title}
          </pre>
          <pre className="w-[14rem] sm:hidden" id="pre">
            {title_mobile}
          </pre>
        </h1>
        </Link>
        <Link href="https://github.com/VerbalThree/verbal-notes">
        <h6 className="w-2xs" id="sub"><b className="source">[get the source code]</b> - v1.0.0</h6></Link>
        </div>
        {children}
        <h6 className="flex justify-center items-center mt-[1rem] mb-[1rem]">since 2025, created by <Link href="https://github.com/VerbalThree" className="verbal"> verbal</Link></h6>
      </body>
    </html>
  );
}
