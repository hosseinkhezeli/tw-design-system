'use client';

import { Button } from '@/shared/components/ui/button';
import { MediaSelectionSource } from '../../types/media-selection.types';
import { mediaSourceOptions } from '../../config/source-options.config';

type Props = {
  onSourceSelect: (source: MediaSelectionSource) => void;
};

export function SourceSelectionForm({ onSourceSelect }: Props) {
  return (
    <div className='flex flex-col gap-4 px-4 pb-8 w-full'>
      {mediaSourceOptions.map((sourceOption) => (
        <Button
          key={sourceOption.id}
          type='button'
          onClick={() => onSourceSelect(sourceOption.id)}
          variant='secondary'
          size='lg'
          className='min-h-18 w-full'
        >
          {sourceOption.icon}
          {sourceOption.label}
        </Button>
      ))}
    </div>
  );
}
