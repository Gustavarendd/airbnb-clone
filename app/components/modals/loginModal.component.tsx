'use client';

import { IoLogoFacebook, IoLogoApple } from 'react-icons/io';
import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';

import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Modal from './modal.component';
import Input from '../inputs/input.component';

import useSignUpModal from '@/app/hooks/useSignUpModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../button/button.component';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

const LoginModal = () => {
  const router = useRouter();

  const signUpModal = useSignUpModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = data => {
    setIsLoading(true);

    signIn('credentials', {
      ...data,
      redirect: false,
    }).then(callback => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged in!');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    signUpModal.onOpen();
  }, [loginModal, signUpModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <h3 className=" text-xl">Welcome to Airbnb</h3>
      <div className="w-full flex flex-col">
        <Input
          type="email"
          required
          id="email"
          label="Email"
          roundedTop
          register={register}
          errors={errors}
        />
        <Input
          type="password"
          required
          id="password"
          label="Password"
          roundedBottom
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
      isOpen={loginModal.isOpen}
      title="Log in"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
