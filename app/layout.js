import { Montserrat } from 'next/font/google';
import { AuthProvider } from '@/components/auth/AuthProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FullWidthBackground } from '@/components/layout/FullWidthBackground';
import "./globals.css";

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata = {
  title: "Notations",
  description: "A short form journaling app powered by Next.js and WordPress.",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" className={`${montserrat.variable} font-sans`}>
        <body>
          <FullWidthBackground className="bg-two" />
          <main className="main">
            <Header />
              {children}
            <Footer />
          </main>
        </body>
      </html>
    </AuthProvider>
  );
}