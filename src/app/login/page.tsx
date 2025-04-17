'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginUserFormFields, loginUserSchema } from '@/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
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

  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 items-center justify-center w-full h-screen">
        <Card className="w-1/3">
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
                    <a href="#" className="ml-auto inline-block text-sm underline-offset-4 hover:underline">
                      Forgot your password?
                    </a>
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
      </div>
    </FormProvider>
  );
};

export default Login;
