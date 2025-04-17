'use client';

import { INote } from '@/@types/api.response.types';
import API from '@/API';
import DialogDrawer from '@/components/common/DialogDrawer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateNoteFormFields, createNoteSchema } from '@/lib/zod/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Pencil, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  const methods = useForm<CreateNoteFormFields>({
    resolver: zodResolver(createNoteSchema),
  });

  const onCreateNote = async (data: CreateNoteFormFields) => {
    if (!session?.apiToken) return;
    try {
      setIsLoading(true);

      const res = await API.createNotes({
        token: session?.apiToken,
        content: data.content,
        title: data.title,
        tag: data.tag,
      });

      console.log(res);

      if (res.status === 201) {
        toast.success('Note created successfully');
        setNotes((prev) => [
          ...prev,
          {
            content: data.content,
            title: data.title,
            createdAt: new Date(),
            updatedAt: new Date(),
            images: [],
            userId: '',
            tag: '',
          },
        ]);
      }

      setIsLoading(false);
      setShowCreateNoteModal(false);
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!session?.apiToken) return;
    API.fetchNotes(session?.apiToken).then((res) => {
      setNotes(res.data.data as INote[]);
      setIsLoading(false);
    });
  }, []);

  const [showCreateNoteModal, setShowCreateNoteModal] = useState(false);

  return (
    <div className="flex items-center justify-center lg:px-32 px-4">
      <div className="w-full mx-auto p-4 max-w-[1280px]">
        {/* Create New Note Button */}
        <div className="flex justify-between items-center mb-6 bg-accent px-4 py-4 rounded">
          <h1 className="text-xl font-semibold">My Notes</h1>
          <Button onClick={() => setShowCreateNoteModal(true)}>Create New Note</Button>

          <DialogDrawer
            opened={showCreateNoteModal}
            setOpened={setShowCreateNoteModal}
            positiveCallback={methods.handleSubmit(onCreateNote)}
            isDialogFooterReq
            isFormModal={true}
            isLoading={isLoading}
            title="Create New Note">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onCreateNote)} className="flex flex-col space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Title</Label>
                  <Input
                    type="text"
                    placeholder=""
                    register={methods.register}
                    name="title"
                    error={methods.formState.errors.title?.message}
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
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Content</Label>
                  <Textarea
                    className="resize-none h-32"
                    rows={5}
                    placeholder="Write your note here..."
                    register={methods.register}
                    name="content"
                    error={methods.formState.errors.content?.message}
                  />
                </div>
              </form>
            </FormProvider>
          </DialogDrawer>
        </div>

        {/* Notes List */}
        <div className="bg-accent p-4 rounded h-full w-full mt-20 flex flex-col gap-4">
          {isLoading ? (
            <div className="flex items-center justify-center w-full h-full py-20 px-8">
              <Loader2 className="animate-spin" />
            </div>
          ) : notes.length === 0 ? (
            <div className="text-center text-muted-foreground py-10 space-y-2">
              <p>No notes available.</p>
              <Button>Create New Note</Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {notes.map((note) => (
                <Card key={note.title} className="relative">
                  <CardHeader className="flex flex-row justify-between items-start">
                    <CardTitle className="text-base line-clamp-1">{note.title}</CardTitle>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-5">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
