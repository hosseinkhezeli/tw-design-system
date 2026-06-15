'use client';

import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { MediaPreviewForm } from '../forms/media-preview-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onRetake: () => void;
};

export const MediaPreviewSheet = ({
  isOpen,
  onClose,
  onConfirm,
  onRetake,
}: Props) => {
  return (
    <>
      <BottomSheet
        title={'انتخاب فایل'}
        onClose={onClose}
        open={isOpen}
        fullScreen
      >
        <MediaPreviewForm onConfirm={onConfirm} onRetake={onRetake} />
      </BottomSheet>
    </>
  );
};
