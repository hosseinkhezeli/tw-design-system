import { Button } from '@/shared/components/ui/button';
import { sourceOptions } from '../../config/post.source';
import { ContentSource } from '../../types/source.types';

type Props = {
  onSourceSelect: (source: ContentSource) => void;
};

export function SourceSelectionFrom({ onSourceSelect }: Props) {
  return (
    <>
      <div className='flex flex-col gap-4 px-4 pb-8'>
        {sourceOptions.map((sourceOption) => {
          return (
            <Button
              key={sourceOption.id}
              onClick={() => onSourceSelect(sourceOption.id)}
              variant={'secondary'}
              size={'lg'}
              autoFocus={false}
              className='w-full min-h-18'
            >
              {sourceOption.icon}
              {sourceOption.label}
            </Button>
          );
        })}
      </div>
    </>
  );
}
