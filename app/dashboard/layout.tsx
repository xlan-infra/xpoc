import Header from "@/components/header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen max-w-screen-lg mx-auto w-full items-center">
      <Header />
      {children}
    </main>
  );
}
