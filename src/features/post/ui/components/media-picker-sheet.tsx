'use client';

import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { MediaPickerForm } from '../forms/media-picker-form';
import { MediaItem } from '../../schemas/create-post-schema';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: MediaItem) => void;
  isPending?: boolean;
};

export const MediaPickerSheet = ({
  isOpen,
  onClose,
  onSubmit,
  isPending,
}: Props) => {
  return (
    <>
      <BottomSheet
        title={'انتخاب فایل'}
        onClose={onClose}
        open={isOpen}
        fullScreen
      >
        <MediaPickerForm onSubmit={onSubmit} isPending={isPending} />
      </BottomSheet>
    </>
  );
};
