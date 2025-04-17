import * as React from 'react';

import { cn } from '@/lib/utils';
import { Path, UseFormRegister } from 'react-hook-form';
import InputError from './inputError';

interface InputProps<FormFields extends Record<string, unknown>> extends React.ComponentProps<'input'> {
  register?: UseFormRegister<FormFields>;
  name?: Path<FormFields>;
  error?: string | undefined;
}

function Input<FormFields extends Record<string, unknown>>({
  className,
  register,
  name,
  error,
  type,
  ...props
}: InputProps<FormFields>) {
  console.log(error, 'error');
  return register && name ? (
    <div className="flex flex-col gap-1">
      <input
        {...register(name)}
        type={type}
        data-slot="input"
        className={cn(
          `file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${error ? 'border-destructive' : 'border-input'}',`,
          className,
        )}
        {...props}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <InputError errorMessage={error} />}
    </div>
  ) : (
    <input
      type={type}
      data-slot="input"
      className={cn(
        `file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
      'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive ${error ? 'border-destructive' : 'border-input'}',`,
        className,
      )}
      {...props}
    />
  );
}

export { Input };
