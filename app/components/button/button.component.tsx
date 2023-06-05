'use client';

import { IconType } from 'react-icons';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  label?: string;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled,
  outline,
  rounded,
  icon: Icon,
}) => {
  return (
    <div className={`w-full `}>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`relative bg-gradient-to-r hover:bg-center from-[#bd1e59] via-rose-500 to-[#bd1e73] w-full p-3 transition-all duration-500 bg-[length:200%] bg-right text-xs font-semibold ${
          outline
            ? 'bg-none bg-white border-[1px] border-black text-black hover:bg-neutral-100'
            : ' border-none text-white'
        } ${rounded ? 'rounded-full' : 'rounded-lg'}
        ${label === 'Search' ? 'flex gap-2 items-center' : ''}`}
      >
        {Icon && (
          <Icon
            size={`${label === 'Search' ? 18 : 24}`}
            className={`  ${
              Icon.name === 'IoLogoFacebook' ? 'text-blue-500' : ''
            } ${label === 'Search' ? 'relative' : 'absolute left-4 top-2'}`}
          />
        )}
        {label}
      </button>
    </div>
  );
};

export default Button;
