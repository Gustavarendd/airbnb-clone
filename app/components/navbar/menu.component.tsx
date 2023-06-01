'use client';

import { useState } from 'react';

import { AiOutlineMenu } from 'react-icons/ai';
import { IoPersonCircle } from 'react-icons/io5';
import { HiOutlineGlobeAlt } from 'react-icons/hi';
import MenuItem from './menuItem.component';

import useLoginModal from '@/app/hooks/useLoginModal';
import useSignUpModal from '@/app/hooks/useSignUpModal';
import { SafeUser } from '@/app/types';
import { signOut } from 'next-auth/react';

interface MenuProps {
  currentUser?: SafeUser | null;
}

const Menu: React.FC<MenuProps> = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  const loginModal = useLoginModal();
  const signUpModal = useSignUpModal();

  return (
    <div className="relative justify-self-end">
      <div className="flex gap-4 items-center">
        <div className="text-xs font-semibold">Airbnb your home</div>
        <div>
          <HiOutlineGlobeAlt size={16} />
        </div>
        <div
          className="flex items-center border-[1px] rounded-full p-1 pl-2 gap-3 hover:shadow-md cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AiOutlineMenu size={14} />
          <div className="text-gray-500">
            <IoPersonCircle size={26} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute py-2 flex flex-col z-10 right-0 top-10 bg-white shadow-xl border-[1px] rounded-lg w-[200px]">
          {currentUser ? (
            <>
              <MenuItem
                label="Reservations"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="Favorites"
                onClick={() => {
                  setIsOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <MenuItem
                label="Sign up"
                onClick={() => {
                  signUpModal.onOpen();
                  setIsOpen(false);
                }}
              />
              <MenuItem
                label="Log in"
                onClick={() => {
                  loginModal.onOpen();
                  setIsOpen(false);
                }}
              />
            </>
          )}
          <hr className="my-2" />
          <MenuItem
            label="Airbnb your home"
            onClick={() => {}}
          />
          <MenuItem
            label="Help"
            onClick={() => {}}
          />
          {currentUser && (
            <>
              <hr className="my-2" />
              <MenuItem
                label="Log out"
                onClick={() => {
                  signOut();
                  setIsOpen(false);
                }}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
