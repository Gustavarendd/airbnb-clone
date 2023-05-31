'use client';

import { useState } from 'react';
import Modal from './modal.component';
import useSearchModal from '@/app/hooks/useSearchModal';
import Input from '../inputs/input.component';
import Button from '../button/button.component';

const SearchModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchModal = useSearchModal();
  const bodyContent = (
    <div className="grid grid-cols-3 bg-gray-200 w-[60%] rounded-full items-center">
      <Input
        label="Where"
        type="text"
        id="where"
        placeholder="Search destination"
        searchInput
      />

      <div className="flex">
        <Input
          label="Check in"
          type="text"
          id="checkIn"
          placeholder="Add dates"
          searchInput
        />

        <Input
          label="Check out"
          type="text"
          id="checkOut"
          placeholder="Add dates"
          searchInput
        />
      </div>
      <div className="flex">
        <Input
          label="Who"
          type="text"
          id="who"
          placeholder="Add guests"
          searchInput
        />
        <div className="p-2">
          <Button
            label="Search"
            onClick={() => {}}
            rounded
          />
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={searchModal.isOpen}
      title="Finish signing up"
      actionLabel="Continue"
      onClose={searchModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      searchModal
    />
  );
};

export default SearchModal;
