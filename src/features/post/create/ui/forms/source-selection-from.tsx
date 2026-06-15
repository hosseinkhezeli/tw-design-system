import { Button } from '@/shared/components/ui/button';
import { PostSource } from '../../types/create-post.types';
import { postSourceOptions } from '../../config/post-source-options';


type Props = {
  onSourceSelect: (source: PostSource) => void;
};

export function SourceSelectionFrom({ onSourceSelect }: Props) {
  return (
    <>
      <div className='flex flex-col gap-4 px-4 pb-8'>
        {postSourceOptions.map((sourceOption) => {
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
