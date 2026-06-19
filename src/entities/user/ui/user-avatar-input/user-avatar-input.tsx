import { MediaItem } from '@/entities/media';
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils';
import { IconCamera, IconPencil, IconPlus, IconX } from '@tabler/icons-react';

interface UserAvatarProps {
  readonly media: MediaItem | null;
  readonly onClick: () => void;
  readonly onClear: () => void;
  readonly className?: string;
}

export function UserAvatarInput({
  media,
  onClick,
  className,
  onClear,
}: UserAvatarProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative inline-flex group cursor-pointer transition-transform hover:scale-102 active:scale-98',
        className,
      )}
    >
      {media && (
        <Button
          size={'icon-xs'}
          variant={'outline'}
          className='z-10 absolute top-0 left-0  transition-transform group-hover:rotate-12'
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          <IconX className='size-4' />
        </Button>
      )}

      <Avatar
        size={'xl'}
        className={cn(
          media
            ? ''
            : 'border-2 border-dashed border-border group-hover:border-primary/50 transition-colors after:border-none!',
        )}
      >
        <AvatarImage
          src={media?.previewUrl}
          alt='تصویر پروفایل کاربر'
          className='object-cover'
        />

        {/* فال‌بک وقتی عکسی نیست: نمایش آیکون دوربین برای راهنمایی بهتر کاربر */}
        <AvatarFallback className='bg-muted-foreground/10'>
          <IconCamera className='size-8 opacity-60' />
        </AvatarFallback>
      </Avatar>

      {/* آیکون وضعیت (افزودن یا ویرایش) */}
      <Button
        size={'icon-xs'}
        className='absolute bottom-0 right-0  transition-transform group-hover:rotate-12'
      >
        {media ? (
          <IconPencil className='size-4' />
        ) : (
          <IconPlus className='size-4' />
        )}
      </Button>
    </div>
  );
}
