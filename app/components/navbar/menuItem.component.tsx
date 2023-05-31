'use client';

interface MenuItemProps {
  label: string;
  onClick: () => void | null;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => {
  return (
    <div
      className="hover:bg-gray-100 cursor-pointer"
      onClick={onClick}
    >
      <div
        className={`text-xs px-4 py-2 ${
          label === 'Sign up' ? 'font-semibold' : 'font-normal'
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default MenuItem;
