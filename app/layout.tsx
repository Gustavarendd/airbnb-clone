import Navbar from './components/navbar/navbar.component';
import './globals.css';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/toastProvider';

export const metadata = {
  title: 'Airbnb clone',
  description: 'Created by Gustav Rasmussen',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Navbar />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
