import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { PostDetailsForm } from '../forms/post-details-form';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function PostDetailsFormSheet({ isOpen, onClose }: Props) {
  return (
    <BottomSheet fullScreen open={isOpen} onClose={onClose}>
      <PostDetailsForm />
    </BottomSheet>
  );
}
