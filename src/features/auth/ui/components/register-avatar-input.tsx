import { MediaItem } from '@/entities/media';

import { MEDIA_SELECTION_STEP } from '@/features/media-selection/constants/media-selection.constants';
import {
  MediaSelectionStep,
  MediaSelectionResult,
} from '@/features/media-selection/types/media-selection.types';
import BottomSheet from '@/shared/components/ui/bottom-sheet';
import { useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { RegisterFormValues } from '../../schemas/register.schema';
import { cn } from '@/shared/utils';
import { UserAvatarInput } from '@/entities/user/ui/user-avatar-input/user-avatar-input';
import { MediaSelectorWidget } from '@/widgets/media/ui/media-selector-widget';

export type RegisterAvatarInputProps = {
  register: UseFormRegister<RegisterFormValues>;
  name: Path<RegisterFormValues>;
  label?: string;
  className?: string;
};

export function RegisterAvatarInput({
  register,
  name,
  className,
}: RegisterAvatarInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState<MediaSelectionStep>(
    MEDIA_SELECTION_STEP.SOURCE,
  );
  const [selectedMedia, setSelectedMedia] = useState<MediaItem | null>(null);

  const { onChange, onBlur } = register(name);

  const handleOpen = () => {
    setCurrentStep(MEDIA_SELECTION_STEP.SOURCE);
    setIsOpen(true);
  };

  const handleConfirmMedia = ({ media }: MediaSelectionResult) => {
    const selected = media[0].file;
    const syntheticEvent = {
      target: {
        name: name,
        value: selected,
      },
      type: 'change',
    };

    onChange(syntheticEvent);
    onBlur(syntheticEvent);
    setSelectedMedia(media[0]);
    setIsOpen(false);
  };

  const handleClearMedia = () => {
    onChange({ target: { name, value: null } });
    setSelectedMedia(null);
    setIsOpen(false);
  };

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      <UserAvatarInput
        media={selectedMedia}
        onClick={handleOpen}
        onClear={handleClearMedia}
      />

      <BottomSheet
        title='انتخاب تصویر پروفایل'
        open={isOpen}
        onClose={() => setIsOpen(false)}
        fullScreen={currentStep !== MEDIA_SELECTION_STEP.SOURCE}
      >
        <MediaSelectorWidget
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirmMedia}
          getCurrentStep={setCurrentStep}
        />
      </BottomSheet>
    </div>
  );
}
