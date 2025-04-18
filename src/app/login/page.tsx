'use client';

import API from '@/API';
import DialogDrawer from '@/components/common/DialogDrawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Label } from '@/components/ui/label';
import { LoginUserFormFields, loginUserSchema } from '@/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Login = () => {
  const router = useRouter();

  const methods = useForm<LoginUserFormFields>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: LoginUserFormFields) => {
    try {
      setIsLoading(true);
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: '/protected/notes',
      });
      setIsLoading(false);
      if (result?.error) {
        toast.error('Invalid email or password!');
      } else {
        router.push('/protected/notes');
      }
    } catch (error) {
      setIsLoading(false);
      console.log('error', error);
      toast.error('An error occurred while logging in!');
    }
  };

  //forgot password modal

  const [forgotPassModal, setForgotPassModal] = useState(false);

  const [registeredEmail, setRegisteredEmail] = useState('');

  const [isResetFormOpened, setIsResetFormOpened] = useState(false);

  const sendCode = async () => {
    try {
      setIsLoading(true);
      const res = await API.forgotPassword(registeredEmail);
      if (res.status === 201) {
        toast.success('Code sent to your email!');

        setIsResetFormOpened(true);
      }
      setForgotPassModal(false);
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'An error occurred while sending the code!');
      } else {
        toast.error('An error occurred while sending the code!');
      }
    }
  };

  const [newPassword, setNewPassword] = useState('');
  const [passwordResetCode, setPasswordResetCode] = useState('');

  const resetPassword = async () => {
    if (!newPassword || !passwordResetCode) {
      toast.error('Please fill in all fields!');
    }
    try {
      setIsLoading(true);
      const res = await API.resetPassword({ email: registeredEmail, passwordResetCode, password: newPassword });

      if (res.status === 200) {
        toast.success('Password reset successfully!');
        setIsResetFormOpened(false);
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      setIsLoading(false);

      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message || 'An error occurred while resetting the password!');
      } else {
        toast.error('An error occurred while resetting the password!');
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full">
        {isResetFormOpened ? (
          <Card className="w-full md:w-1/3 bg-transparent md:bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Reset Password</CardTitle>
              <CardDescription>Enter details to reset your password</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Reset Code</Label>
                  <InputOTP
                    className="min-w-full"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={passwordResetCode}
                    onChange={setPasswordResetCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">New Password</Label>

                  <Input
                    id="password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <Button onClick={resetPassword} isLoading={isLoading} type="submit" className="w-full cursor-pointer">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full md:w-1/3 bg-transparent md:bg-card">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>Enter your credentials below to login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      register={methods.register}
                      name="email"
                      error={methods.formState.errors.email?.message}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <div
                        onClick={() => setForgotPassModal(true)}
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer">
                        Forgot your password?
                      </div>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      register={methods.register}
                      name="password"
                      error={methods.formState.errors.password?.message}
                    />
                  </div>
                  <Button isLoading={isLoading} type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
      <DialogDrawer
        opened={forgotPassModal}
        setOpened={setForgotPassModal}
        title="Enter your registered email"
        positiveCallback={sendCode}
        isDialogFooterReq
        positiveButtonText="Send Code"
        isFormModal
        isLoading={isLoading}>
        <div className="flex flex-col gap-4">
          <div className="grid gap-2">
            <Input
              value={registeredEmail}
              onChange={(e) => setRegisteredEmail(e.target.value)}
              type="text"
              placeholder="abc@example.com"
            />
          </div>
        </div>
      </DialogDrawer>
    </FormProvider>
  );
};

export default Login;
