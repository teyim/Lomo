import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
        <Navbar />
        {children}
        <Footer />
      </main>
    </>
  );
}
