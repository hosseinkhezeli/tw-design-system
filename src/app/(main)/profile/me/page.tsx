import { Avatar } from '@/shared/ui/avatar';
import { Text } from '@/shared/ui/text';
import { Typography } from '@/shared/ui/typography/typography';
import { UserAvatar } from '@/shared/ui/user-avatar/user-avatar';

export default function MyProfilePage() {
  return (
    <div className='flex flex-col w-full'>
      <div className='flex w-full gap-4'>
        <UserAvatar />
        <div className='flex flex-col'>
          <Typography variant={'subtitle'}>روبان شاپ</Typography>
          <Text
            title='شناسه روبان'
            text='231455345'
            classNames={{ title: 'opacity-50' }}
          />
          <Text
            title='شهر'
            text='علی‌آباد کتول ممقانی کلا'
            classNames={{ title: 'opacity-50' }}
          />
        </div>
      </div>
    </div>
  );
}
