import './globals.css';
import Script from 'next/script';
import Header from '../app/components/organisms/Header';
import Footer from '../app/components/organisms/Footer';
import { AuthProvider } from './context/authContext';

export const metadata = {
  title: 'University Portal',
  description: 'University Portal for Students and Staff',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="antialiased">
        <AuthProvider>
        {/* ✅ Load scripts only on the client */}
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        {/* Add other scripts here if needed */}
        
        {children}
        </AuthProvider>
      </body>
    </html>
  );
}
