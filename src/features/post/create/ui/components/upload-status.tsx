import { cn } from '@/shared/utils';

type Props = {
  status: {
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  };
  errorMessage?: string;
};

export function UploadStatus({ status, errorMessage }: Props) {
  const Icon = status.icon;

  return (
    <div className='text-xs'>
      <p className={cn('flex items-center gap-2', status.className)}>
        {Icon && <Icon className='h-3 w-3' />}
        {status.text}
      </p>

      {errorMessage && (
        <p className='mt-1 text-[10px] text-destructive'>{errorMessage}</p>
      )}
    </div>
  );
}
