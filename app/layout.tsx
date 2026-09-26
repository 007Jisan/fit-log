import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WorkoutProvider } from "../context/WorkoutContext";

export const metadata: Metadata = {
  title: "FitLog - Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col justify-between bg-zinc-950 text-white antialiased">
        <WorkoutProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </WorkoutProvider>
      </body>
    </html>
  );
}