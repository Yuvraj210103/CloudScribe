import { DialogTrigger } from '@radix-ui/react-dialog';
import React from 'react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const DialogDrawer = ({
  children,
  opened,
  setOpened,
  title,
  positiveCallback,
  negativeCallback,
  trigger,
  isDialogFooterReq = false,
  isLoading,
  isFormModal,
  negativeButtonText,
  positiveButtonText,
}: {
  children: React.ReactNode;
  opened?: boolean;
  setOpened?: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  positiveCallback: () => void;
  negativeCallback?: () => void;
  trigger?: React.ReactNode;
  isDialogFooterReq?: boolean;
  isLoading?: boolean;
  isFormModal?: boolean;
  positiveButtonText?: string;
  negativeButtonText?: string;
}) => {
  if (window.innerWidth <= 640) {
    return (
      <Drawer open={opened} onOpenChange={setOpened}>
        <DrawerTrigger asChild>{trigger}</DrawerTrigger>

        <DrawerContent>
          <DrawerHeader>
            {title && <DrawerTitle>{title}</DrawerTitle>}
            <DrawerClose />
          </DrawerHeader>
          <div className="px-4">{children}</div>
          {isDialogFooterReq && (
            <DrawerFooter className="flex items-center gap-4">
              <Button
                variant="outline"
                className=" w-full hover:border-blueButtonHoverBg "
                onClick={() => {
                  if (isLoading) return;

                  if (setOpened) {
                    setOpened(false);
                  }
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  negativeCallback && negativeCallback();
                }}>
                {negativeButtonText || 'Cancel'}
              </Button>

              <Button
                isLoading={isLoading}
                className="w-full hover:bg-blueButtonHoverBg"
                onClick={() => {
                  positiveCallback();
                  if (isLoading || isFormModal) return;
                  if (setOpened) {
                    setOpened(false);
                  }
                }}>
                {positiveButtonText || 'Okay'}
              </Button>
            </DrawerFooter>
          )}
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog open={opened} onOpenChange={setOpened} modal>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
        {isDialogFooterReq && (
          <DialogFooter>
            <Button
              variant="outline"
              className="mt-4 hover:border-blueButtonHoverBg sm:mr-2 sm:mt-0"
              onClick={() => {
                if (isLoading) return;
                if (setOpened) {
                  setOpened(false);
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                negativeCallback && negativeCallback();
              }}>
              {negativeButtonText || 'Cancel'}
            </Button>

            <Button
              isLoading={isLoading}
              className="hover:bg-blueButtonHoverBg"
              onClick={() => {
                positiveCallback();
                if (isLoading || isFormModal) return;
                if (setOpened) {
                  setOpened(false);
                }
              }}>
              {positiveButtonText || 'Okay'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogDrawer;
