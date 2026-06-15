'use client';

import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { MediaPickerForm } from '../forms/media-picker-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onMediaSelect: () => void;
  onConfirm: () => void;
};

export const MediaPickerSheet = ({
  isOpen,
  onClose,
  onMediaSelect,
  onConfirm,
}: Props) => {
  return (
    <>
      <BottomSheet
        title={'انتخاب فایل'}
        onClose={onClose}
        open={isOpen}
        fullScreen
      >
        <MediaPickerForm
          onMediaSelected={onMediaSelect}
          onConfirm={onConfirm}
        />
      </BottomSheet>
    </>
  );
};
