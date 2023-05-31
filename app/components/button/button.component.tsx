'use client';

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  disabled,
  outline,
  rounded,
}) => {
  return (
    <div className="w-full">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`text-white bg-gradient-to-r hover:bg-center from-[#bd1e59] via-rose-500 to-[#bd1e73] w-full p-3 transition-all duration-500 bg-[length:200%] bg-right text-xs font-semibold ${
          outline
            ? 'bg-none bg-white border-[1px] border-black text-black hover:bg-neutral-100'
            : ' border-none '
        } ${rounded ? 'rounded-full' : 'rounded-lg'}`}
      >
        {label}
      </button>
    </div>
  );
};

export default Button;
