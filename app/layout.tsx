import Navbar from './components/navbar/navbar.component';
import './globals.css';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/toastProvider';

import LoginModal from './components/modals/loginModal.component';
import SignUpModal from './components/modals/signUpModal.component';
import SearchModal from './components/modals/searchModal.component';

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
        <LoginModal />
        <SignUpModal />
        <SearchModal />
        <div className="pb-24 pt-24">{children}</div>
      </body>
    </html>
  );
}
