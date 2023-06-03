'use client';
import { SafeUser } from '@/app/types';
import Categories from '../categories/categories.component';
import Logo from './logo.component';
import Menu from './menu.component';
import SearchBar from './searchBar.component';

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className="w-full fixed bg-white shadow-sm z-10">
      <div className="shadow-sm">
        <div className="grid grid-cols-5 lg:grid-cols-3 items-center min-w-full py-4 px-10">
          <Logo />
          <SearchBar />
          <Menu currentUser={currentUser} />
        </div>
      </div>
      <div className="max-w-full mt-1">
        <Categories />
      </div>
    </div>
  );
};

export default Navbar;
