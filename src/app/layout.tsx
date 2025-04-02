import Link from "next/link";
import "./globals.css";
import mainLogo from "../assets/main-logo.svg";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div>
          <header>
            <Link href={"/"}>
              <Image src={mainLogo} alt={""} />
            </Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
