import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Lexend, Lekton } from "next/font/google";
import { ModalProvider } from "@/context/ModalContext";
import ReactQueryProvider from '@/components/queryProvider';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const lexend = Lexend({ subsets: ['latin'], display: 'swap' });

export const lekton = Lekton({ weight: ['400', '700'], subsets: ['latin'], display: 'swap' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} ${lexend.className}`}
    >
      <body className="font-geist_mono text-primary">
        <div id="modal-root"></div>
        <ReactQueryProvider>
          <ModalProvider>
            <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
              <Navbar />
              {children}
              <Footer />
            </main>
          </ModalProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
