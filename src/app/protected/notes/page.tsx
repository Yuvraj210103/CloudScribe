'use client';

import { INote } from '@/@types/api.response.types';
import API from '@/API';
import ConfirmDialog from '@/components/common/ConfirmDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Loader2, Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

const Notes = () => {
  const [notes, setNotes] = useState<INote[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.apiToken) return;
    API.fetchNotes(session?.apiToken).then((res) => {
      setNotes(res.data.data as INote[]);
      setIsLoading(false);
    });
  }, [session?.apiToken]);

  const router = useRouter();

  const [selectedNoteId, setSelectedNoteId] = useState('');
  const [confirmModal, setConfirmModal] = useState(false);

  const onDelete = async () => {
    if (!session?.apiToken) return;
    try {
      setIsLoading(true);
      const res = await API.deleteNoteById({ token: session?.apiToken, id: selectedNoteId });
      if (res.status === 201) {
        setNotes((prev) => prev.filter((note) => note._id !== selectedNoteId));
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center lg:px-32 px-4 pb-12">
      <div className="w-full mx-auto max-w-[1280px]">
        {/* Create New Note Button */}
        <div className="flex justify-between items-center mb-6 bg-accent px-4 py-4 rounded">
          <div className="text-xl font-semibold">My Notes</div>
          <Button onClick={() => router.push('/protected/create_note')}>Create New Note</Button>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {notes.map((note) => (
                <Card key={note.title} className=" gap-2 overflow-hidden">
                  <CardHeader className="flex flex-row justify-between items-start overflow-hidden">
                    <div className="flex flex-col gap-1 max-w-3/4">
                      <CardTitle className="text-base overflow-hidden text-ellipsis">{note.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground overflow-hidden text-ellipsis">
                        {note.tag ? `#${note.tag}` : <span>&nbsp;</span>}
                      </CardDescription>
                    </div>
                    <div className="flex">
                      <Button
                        onClick={() => {
                          router.push(`/protected/create_note?id=${note._id}`);
                        }}
                        variant="ghost"
                        size="icon">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedNoteId(note._id);
                          setConfirmModal(true);
                        }}
                        variant="ghost"
                        size="icon">
                        <Trash2 className="w-4 h-4 text-red-500" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="mt-1">
                    <p className="text-sm text-muted-foreground line-clamp-5">{note.content}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <ConfirmDialog open={confirmModal} setOpened={setConfirmModal} positiveCallback={onDelete}>
          Are you sure you want to delete this note?
        </ConfirmDialog>
      </div>
    </div>
  );
};

export default Notes;
