'use client';

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';

import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { signIn } from 'next-auth/react';
import { toast } from 'react-hot-toast';

import Modal from './modal.component';
import Input from '../inputs/input.component';

import useLoginModal from '@/app/hooks/useLoginModal';
import Button from '../button/button.component';
// import useRegisterModal from '@/app/hooks/useRegisterModal';

const LoginModal = () => {
  const router = useRouter();

  // const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<FieldValues>({
  //   defaultValues: {
  //     email: '',
  //     password: '',
  //   },
  // });

  // const onSubmit: SubmitHandler<FieldValues> = data => {
  //   setIsLoading(true);

  //   signIn('credentials', {
  //     ...data,
  //     redirect: false,
  //   }).then(callback => {
  //     setIsLoading(false);

  //     if (callback?.ok) {
  //       toast.success('Logged in!');
  //       router.refresh();
  //       loginModal.onClose();
  //     }

  //     if (callback?.error) {
  //       toast.error(callback.error);
  //     }
  //   });
  // };

  // const toggle = useCallback(() => {
  //   loginModal.onClose();
  //   registerModal.onOpen();
  // }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <h3 className=" text-xl">Welcome to Airbnb</h3>
      <div className="w-full flex flex-col">
        <Input
          type="email"
          required
          id="email"
          label="Your email"
          roundedTop
        />
        <Input
          type="password"
          required
          id="password"
          label="Your password"
          roundedBottom
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
        />
        <Button
          outline
          label="Continue with Google"
          onClick={() => {}}
        />
        <Button
          outline
          label="Continue with Apple"
          onClick={() => {}}
        />
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title="Log in or sign up"
      actionLabel="Continue"
      onClose={loginModal.onClose}
      onSubmit={() => {}}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
