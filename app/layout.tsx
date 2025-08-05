import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { uiSans } from "./fonts/font";
import "./globals.css";

export const metadata = {
  title: "XLAN | Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${uiSans.className}`}>
      <body className="bg-background text-foreground">
        <Header />
        <main className="w-6xl mx-auto">
          {children}
          <Toaster position="top-right" duration={2500} />
        </main>
      </body>
    </html>
  );
}
