'use client';

import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const Counter: React.FC<CounterProps> = ({
  title,
  subtitle,
  value,
  onChange,
}) => {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 0) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <div className="flex flex-row items-center gap-20 justify-between">
      <div className="flex flex-col">
        <div className="font-medium text-sm">{title}</div>
        <div className="font-light text-gray-600 text-xs">{subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className={`
          ${
            value === 0
              ? 'text-neutral-200 border-neutral-200 cursor-not-allowed'
              : 'text-neutral-600 border-neutral-400'
          }
          w-7
          h-7
          rounded-full
          border-[1px]
          
          flex
          items-center
          justify-center
          
          cursor-pointer
          hover:opacity-80
          transition
          `}
        >
          <AiOutlineMinus />
        </div>
        <div className="font-light text-md text-neutral-600 w-4 flex justify-center">
          {value}
        </div>
        <div
          onClick={onAdd}
          className="
          w-7
          h-7
                rounded-full
                border-[1px]
                border-neutral-400
                flex
                items-center
                justify-center
                text-neutral-600
                cursor-pointer
                hover:opacity-80
                transition
            "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
