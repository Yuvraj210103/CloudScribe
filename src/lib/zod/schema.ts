import { z } from 'zod';

export const createUserSchema = z
  .object({
    fullName: z.string().min(3),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type CreateUserFormFields = z.infer<typeof createUserSchema>;

export const activateUserSchema = z.object({
  OTPCode: z.string().min(6, { message: 'OTP code must be at least 6 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

export type ActivateUserFormFields = z.infer<typeof activateUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6),
});

export type LoginUserFormFields = z.infer<typeof loginUserSchema>;
