'use client';

import API from '@/API';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateNoteFormFields, createNoteSchema } from '@/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowBigLeftIcon } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const CreateNote = () => {
  const router = useRouter();

  const { data: session } = useSession();

  const searchParams = useSearchParams();

  const id = searchParams.get('id');

  const methods = useForm<CreateNoteFormFields>({
    resolver: zodResolver(createNoteSchema),
  });

  const [isLoading, setIsLoading] = useState(false);

  console.log(id, 'here id');

  useEffect(() => {
    if (!id || !session?.apiToken) return;
    setIsLoading(true);
    API.fetchNoteById({ token: session?.apiToken, id }).then((res) => {
      const data = res.data.data;
      methods.setValue('title', data.title || '');
      methods.setValue('content', data.content || '');
      methods.setValue('tag', data.tag || '');
      setIsLoading(false);
    });
  }, [id, session?.apiToken]);

  const onCreateNote = async (data: CreateNoteFormFields) => {
    if (!session?.apiToken) return;
    try {
      setIsLoading(true);

      if (id) {
        const res = await API.updateNoteById({
          token: session?.apiToken,
          content: data.content,
          title: data.title,
          tag: data.tag,
          id: id,
        });

        if (res.status === 201) {
          toast.success('Note updated successfully');
          setIsLoading(false);
          router.push('/protected/notes');
        }
      } else {
        const res = await API.createNotes({
          token: session?.apiToken,
          content: data.content,
          title: data.title,
          tag: data.tag,
        });

        if (res.status === 201) {
          toast.success('Note created successfully');
          setIsLoading(false);
          router.push('/protected/notes');
        }
      }

      setIsLoading(false);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <FormProvider {...methods}>
      <div className="flex items-center justify-center lg:px-32 px-4 pb-12">
        <div className="flex flex-col gap-4 w-full h-full max-w-[1280px] ">
          <div className="flex justify-between items-center mb-6 bg-accent px-4 py-4 rounded">
            <div onClick={() => router.back()} className="flex items-center justify-center gap-2 cursor-pointer">
              <ArrowBigLeftIcon className="cursor-pointer mt-[2px]" />
              <div className="text-xl font-semibold">Create New Note</div>
            </div>
            <Button isLoading={isLoading} onClick={methods.handleSubmit(onCreateNote)}>
              {id ? 'Update' : 'Save'}
            </Button>
          </div>
          <form onSubmit={methods.handleSubmit(onCreateNote)} className="flex flex-col space-y-4 bg-accent p-4 rounded">
            <div className="grid gap-2">
              <Label htmlFor="email">Title</Label>
              <Input
                type="text"
                placeholder=""
                register={methods.register}
                name="title"
                error={methods.formState.errors.title?.message}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Tag (Optional)</Label>
              <Input
                type="text"
                placeholder=""
                register={methods.register}
                name="tag"
                error={methods.formState.errors.tag?.message}
                className="bg-white"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Content</Label>
              <Textarea
                className="resize-none h-32 bg-white"
                rows={5}
                placeholder="Write your note here..."
                register={methods.register}
                name="content"
                error={methods.formState.errors.content?.message}
              />
            </div>
          </form>
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateNote;
