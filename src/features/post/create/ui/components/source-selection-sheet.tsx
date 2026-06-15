'use client';

import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { SourceSelectionFrom } from '../forms/source-selection-from';
import { PostSource } from '../../types/create-post.types';


type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSourceSelect: (source: PostSource) => void;
};

export const SourceSelectionSheet = ({
  isOpen,
  onClose,
  onSourceSelect,
}: Props) => {
  return (
    <>
      <BottomSheet title={'انتخاب فایل'} onClose={onClose} open={isOpen}>
        <SourceSelectionFrom onSourceSelect={onSourceSelect} />
      </BottomSheet>
    </>
  );
};
