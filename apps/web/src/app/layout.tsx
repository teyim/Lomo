import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ModalProvider } from "@/context/ModalContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="font-geist_mono text-primary">
        <div id="modal-root"></div>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
}
