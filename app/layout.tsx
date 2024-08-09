import { Toaster } from "@/components/ui/sonner";
import { Fira_Sans, Gabarito, Inter } from "next/font/google";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "XPOC",
};

const inter = Inter({ subsets: ["latin"], weight: ["500", "600"], fallback: ["system-ui", "arial"] });
const gabarito = Gabarito({ subsets: ["latin"] });
const firaSans = Fira_Sans({ subsets: ["latin"], weight: ["400", "600"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={gabarito.className}>
      <body className="bg-background text-foreground">
        <main className="min-h-screen max-w-screen-lg mx-auto flex flex-col items-center">
          {children}
          <Toaster position="top-right" richColors duration={2500} />
        </main>
      </body>
    </html>
  );
}
