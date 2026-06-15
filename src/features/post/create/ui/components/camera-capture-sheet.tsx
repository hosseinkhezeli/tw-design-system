'use client';

import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { CameraCaptureForm } from '../forms/camera-capture-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onMediaSelect: () => void;
  onConfirm: () => void;
};

export const CameraCaptureSheet = ({
  isOpen,
  onClose,
  onMediaSelect,
  onConfirm,
}: Props) => {
  return (
    <BottomSheet
      title={'ثبت با دوربین'}
      onClose={onClose}
      open={isOpen}
      fullScreen
    >
      <CameraCaptureForm
        isOpen={isOpen}
        onMediaSelected={onMediaSelect}
        onConfirm={onConfirm}
      />
    </BottomSheet>
  );
};
