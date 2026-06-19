import { PostDetailsForm } from '@/features/post/create/ui/forms/post-details-form';
import BottomSheet from '@/shared/components/ui/bottom-sheet';

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
