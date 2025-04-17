import * as React from 'react';

import { cn } from '@/lib/utils';
import { Path, UseFormRegister } from 'react-hook-form';
import InputError from './inputError';

interface InputProps<FormFields extends Record<string, unknown>> extends React.ComponentProps<'textarea'> {
  register?: UseFormRegister<FormFields>;
  name?: Path<FormFields>;
  error?: string | undefined;
}

function Textarea<FormFields extends Record<string, unknown>>({
  className,
  register,
  name,
  error,
  ...props
}: InputProps<FormFields>) {
  return register && name ? (
    <div className="flex flex-col gap-1">
      <textarea
        {...register(name)}
        data-slot="textarea"
        className={cn(
          'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          className,
        )}
        {...props}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <InputError errorMessage={error} />}
    </div>
  ) : (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
