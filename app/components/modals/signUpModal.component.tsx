'use client';

import { useState } from 'react';
import Modal from './modal.component';
import useSignUpModal from '@/app/hooks/useSignUpModal';
import Input from '../inputs/input.component';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const SignUpModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signUpModal = useSignUpModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      dateOfBirth: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <div>
        <Input
          label="First name"
          id="firstName"
          type="text"
          roundedTop
          required
        />
        <Input
          label="Last name"
          id="lastName"
          type="text"
          roundedBottom
          required
        />
        <p className="text-xs text-gray-400 pt-1">
          Make sure it matches the name in your ID.
        </p>
      </div>
      <div>
        <Input
          label="Birthdate"
          id="birthdate"
          type="date"
          required
        />
        <p className="text-xs text-gray-400 pt-1">
          To sign up, you need to be at least 18. Your birthday won‘t be shared
          with other people who use Airbnb.
        </p>
      </div>
      <div>
        <Input
          label="Email"
          id="email"
          type="email"
          required
        />
        <p className="text-xs text-gray-400 pt-1">
          We‘ll email you trip confirmations and receipts.
        </p>
      </div>
      <div>
        <Input
          label="Password"
          id="password"
          type="password"
          required
          roundedTop
        />
        <Input
          label="Repeat password"
          id="repeatPassword"
          type="password"
          required
          roundedBottom
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={signUpModal.isOpen}
      title="Finish signing up"
      actionLabel="Continue"
      onClose={signUpModal.onClose}
      onSubmit={() => onSubmit}
      body={bodyContent}
    />
  );
};

export default SignUpModal;
