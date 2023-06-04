import Navbar from './components/navbar/navbar.component';
import './globals.css';
import { Inter } from 'next/font/google';
import ToasterProvider from './providers/toastProvider';

import LoginModal from './components/modals/loginModal.component';
import SignUpModal from './components/modals/signUpModal.component';
import SearchModal from './components/modals/searchModal.component';
import getCurrentUser from './actions/getCurrentUser';
import HostYourHomeModal from './components/modals/hostYourHomeModal.component';
import ClientOnly from './components/clientOnly.component';

export const metadata = {
  title: 'House hosting',
  description: 'Created by Gustav Rasmussen',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <body>
        <ClientOnly>
          <ToasterProvider />
          <Navbar currentUser={currentUser} />
          <LoginModal />
          <SignUpModal />
          <SearchModal />
          <HostYourHomeModal />
        </ClientOnly>
        <div className="pb-24 pt-24">{children}</div>
      </body>
    </html>
  );
}
