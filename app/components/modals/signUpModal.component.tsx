'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import Modal from './modal.component';
import useSignUpModal from '@/app/hooks/useSignUpModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Input from '../inputs/input.component';

import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Button from '../button/button.component';

import { IoLogoFacebook, IoLogoApple } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

const SignUpModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signUpModal = useSignUpModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    axios
      .post('/api/signUp', data)
      .then(() => {
        toast.success('Success!');
        signUpModal.onClose();
        loginModal.onOpen();
      })
      .catch(error => {
        toast.error('Something went wrong!');
      })
      .finally(() => {
        setIsLoading(false);
      });
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
          register={register}
          errors={errors}
        />
        <Input
          label="Last name"
          id="lastName"
          type="text"
          roundedBottom
          required
          register={register}
          errors={errors}
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
          register={register}
          errors={errors}
        />
        <p className="text-xs text-gray-400 pt-1">
          To sign up, you need to be at least 18. Your birthday won‘t be shared
          with other people who use HouseHosting.
        </p>
      </div>
      <div>
        <Input
          label="Email"
          id="email"
          type="text"
          required
          register={register}
          errors={errors}
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
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );

  const footerContent = (
    <div>
      <div className="flex items-center justify-between mt-3">
        <div className="border-t-[1px] w-[45%]" />
        <span className="text-xs">or</span>
        <div className="border-t-[1px] w-[45%]" />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <Button
          outline
          label="Continue with Facebook"
          onClick={() => {}}
          icon={IoLogoFacebook}
        />
        <Button
          outline
          label="Continue with Google"
          onClick={() => signIn('google')}
          icon={FcGoogle}
        />
        <Button
          outline
          label="Continue with Apple"
          onClick={() => {}}
          icon={IoLogoApple}
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
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default SignUpModal;
