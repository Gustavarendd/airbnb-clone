import Logo from './logo.component';
import Menu from './menu.component';
import SearchBar from './searchBar.component';

const Navbar = () => {
  return (
    <div className="w-full fixed bg-white shadow-sm z-10">
      <div className="flex flex-row items-center justify-between py-4 px-10">
        <Logo />
        <SearchBar />
        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
