import { IconCloudUpload } from '@tabler/icons-react';

type Props = {
  onClick: () => void;
};

export function MediaSelectButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className='aspect-9/12 w-full h-auto flex flex-col items-center justify-center gap-3 cursor-pointer rounded-xl border-2 border-dashed border-muted-foreground/30 bg-secondary/20 p-8 transition hover:border-primary/50 hover:bg-secondary/40'
    >
      <IconCloudUpload className='h-6 w-6' />
      <div className='space-y-1 text-center'>
        <p className='text-sm font-medium'>برای آپلود عکس کلیک کنید</p>

        <p className='text-xs text-muted-foreground'>JPG, PNG, WEBP</p>
      </div>
    </button>
  );
}
