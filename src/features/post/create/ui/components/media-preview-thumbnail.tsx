import { Button } from '@/shared/components/ui/button';
import { IconX } from '@tabler/icons-react';

type Props = {
  thumbnailSrc?: string;
  handleClearMedia: (mediaUrl: string) => void;
};

export function MediaPreviewThumbnail({
  handleClearMedia,
  thumbnailSrc,
}: Props) {
  if (!thumbnailSrc) return null;
  return (
    <div className='relative flex aspect-9/12 w-full h-auto items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30'>
      <img
        src={thumbnailSrc}
        alt='Preview'
        className='h-full w-full object-contain'
      />

      <Button
        type='button'
        size='icon'
        variant='outline'
        className='absolute right-3 top-3'
        onClick={() => handleClearMedia(thumbnailSrc)}
      >
        <IconX className='h-4 w-4' />
      </Button>
    </div>
  );
}
