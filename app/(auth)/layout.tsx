import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Threads Clone",
  description: "A nextjs 13 Meta Threads",
};

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}  bg-black text-white`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
