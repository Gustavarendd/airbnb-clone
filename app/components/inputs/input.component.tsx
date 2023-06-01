'use client';

import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type: string;
  required?: boolean;
  roundedTop?: boolean;
  roundedBottom?: boolean;
  searchInput?: boolean;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  required,
  roundedTop,
  roundedBottom,
  searchInput,
  placeholder,
  register,
  errors,
}) => {
  if (searchInput) {
    return (
      <div
        className={`rounded-full bg-transparent pl-7 p-3 hover:bg-white hover:drop-shadow-lg`}
      >
        <div className="flex flex-col w-full">
          <label
            htmlFor={id}
            className="text-black font-semibold text-xs "
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            {...register(id, { required })}
            placeholder={placeholder}
            className={`w-full outline-none bg-transparent text-xs`}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-full relative">
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          placeholder=" "
          className={`peer w-full border-[1px] border-gray-300 pt-4 p-2 outline-black ${
            roundedTop ? 'rounded-t-lg border-b-none' : ''
          } ${roundedBottom ? 'rounded-b-lg' : ''} ${
            !roundedBottom && !roundedTop ? 'rounded-lg' : ''
          }`}
        />
        <label
          htmlFor={id}
          className="absolute left-2 text-gray-400 text-xs top-1 peer-focus:top-1 peer-focus:text-xs peer-placeholder-shown:top-4 peer-placeholder-shown:text-[16px] transition-all"
        >
          {label}
        </label>
      </div>
    );
  }
};

export default Input;
