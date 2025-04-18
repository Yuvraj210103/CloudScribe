/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateUserFormFields, createUserSchema } from '@/lib/zod/schema';
import API from '@/API';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { useRouter } from 'next/navigation';
import { AxiosError, AxiosResponse } from 'axios';

const Signup = () => {
  const methods = useForm<CreateUserFormFields>({
    resolver: zodResolver(createUserSchema),
  });

  const [isUserCreated, setIsUserCreated] = useState(false);

  const [otpCode, setOtpCode] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSubmit = async (data: CreateUserFormFields) => {
    try {
      setIsLoading(true);
      const res = await API.registerUser({ ...data });
      console.log('res', res);
      if (res.status === 201) {
        setIsUserCreated(true);
        toast.success('User created successfully!');
      } else {
        toast.error(res.data.message || 'User creation failed!');
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'An error occurred while creating the user!');
      } else {
        toast.error('An error occurred while creating the user!');
      }

      setIsLoading(false);
    }
  };

  const onVerifyOtp = async () => {
    const email = methods.watch('email');
    if (!otpCode || otpCode.length < 6) {
      toast.error('Please enter OTP code!');
      return;
    }
    if (!email) {
      toast.error('Please enter email!');
      return;
    }
    let res: AxiosResponse<any, any> | null = null;
    try {
      setIsLoading(true);
      res = await API.activateUser({ email, OTPCode: otpCode });

      if (res.status === 201) {
        toast.success('User activated successfully!');
        router.push('/login');
      } else {
        toast.error(res.data.message || 'User activation failed!');
      }
      setIsLoading(false);
    } catch (error) {
      console.log('error', error);
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || 'An error occurred while creating the user!');
      } else {
        toast.error('An error occurred while verifying otp!');
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log('methods', methods.formState.errors);
  }, [methods.formState.errors]);

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-full pb-12">
        <Card className="w-full md:w-[40%] bg-transparent md:bg-card">
          <CardHeader>
            <CardTitle className="text-2xl">Sign up</CardTitle>
            <CardDescription>Enter your details below to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            {isUserCreated ? (
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Enter OTP</Label>
                  <InputOTP
                    className="min-w-full"
                    maxLength={6}
                    pattern={REGEXP_ONLY_DIGITS}
                    value={otpCode}
                    onChange={setOtpCode}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  <CardDescription className="font-medium">Enter the OTP sent on your email</CardDescription>
                </div>
                <Button isLoading={isLoading} onClick={onVerifyOtp} type="submit" className="cursor-pointer">
                  Verify
                </Button>
              </div>
            ) : (
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Name</Label>
                    <Input
                      type="text"
                      placeholder="john doe"
                      register={methods.register}
                      name="fullName"
                      error={methods.formState.errors.fullName?.message}
                    />
                  </div>
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
                    <Label htmlFor="email">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      register={methods.register}
                      name="password"
                      error={methods.formState.errors.password?.message}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Confirm Password</Label>
                    <Input
                      id="password"
                      type="password"
                      register={methods.register}
                      name="confirmPassword"
                      error={methods.formState.errors.confirmPassword?.message}
                    />
                  </div>

                  <Button isLoading={isLoading} type="submit" className="cursor-pointer">
                    Submit
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </FormProvider>
  );
};

export default Signup;
