import Header from "@/components/main-header";
import {Toaster} from "@/components/ui/sonner";
import {Gabarito} from "next/font/google";
import "./globals.css";

export const metadata = {
  title: "XPOC",
};

const gabarito = Gabarito({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="pt_BR" className={gabarito.className}>
      <body className="bg-background text-foreground">
        <main className="max-w-screen-lg mx-auto">
          <Header />
          {children}
          <Toaster position="top-right" duration={2500} />
        </main>
      </body>
    </html>
  );
}
