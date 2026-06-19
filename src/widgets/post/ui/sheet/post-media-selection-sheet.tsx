import { MediaSelectionResult, MediaSelectionStep } from '@/features/media-selection/types/media-selection.types';
import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { MediaSelectorWidget } from '@/widgets/media/ui/media-selector-widget';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: ({ media }: MediaSelectionResult) => void;
  fullScreen: boolean;
  getCurrentStep: (step: MediaSelectionStep) => void;
};

export function PostMediaSelectionSheet({
  isOpen,
  onClose,
  onConfirm,
  fullScreen,
  getCurrentStep,
}: Props) {
  return (
    <BottomSheet
      title='انتخاب محتوا'
      open={isOpen}
      onClose={onClose}
      fullScreen={fullScreen}
    >
      <MediaSelectorWidget
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        getCurrentStep={getCurrentStep}
      />
    </BottomSheet>
  );
}
