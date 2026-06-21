/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAvatar, UserBio, UserStatsList } from '@/entities/user';
import { Typography } from '@/shared/components/ui/typography/typography';
import { ProfileWidgetModel } from '../model/profile-widget.model';
import { Button } from '@/shared/components/ui/button';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import { VerifiedUserBadge } from '@/entities/user/ui/verified-user-badge';
import { UserQuickAccessList } from '@/entities/user/ui/user-quick-access/user-quick-access-list';

type Props = {
  user: any;
};

export function ProfileWidget({ user }: Props) {
  const { user: profile } = ProfileWidgetModel.from(user);
  return (
    <>
      <main className='flex flex-col w-full'>
        <header className='flex flex-col w-full gap-4 px-4 py-5'>
          <div className='flex w-full gap-4 items-center justify-between'>
            <div className='flex w-full gap-4 items-center'>
              <UserAvatar user={profile} />
              <div className='flex flex-col gap-2'>
                <Typography variant={'subtitle'} as='h1'>
                  {profile.fullName}
                </Typography>
                <Typography
                  variant={'caption'}
                  as='span'
                  className='opacity-50'
                >
                  {profile.username}
                </Typography>
              </div>
            </div>
            <Button variant={'outline'}>
              ویرایش پروفایل <IconEdit />
            </Button>
          </div>

          <div className='flex items-center gap-2'>
            <IconInfoCircle className='size-4 text-primary' />
            <Typography variant={'caption'} as='h3' className='opacity-80'>
              با دریافت نشان اعتبار خود را متمایز کنید
            </Typography>
            <VerifiedUserBadge />
          </div>

          <UserBio bio={profile.bio} />

          {/* بخش آمار و اکشن‌ها */}
          <section
            className='flex flex-col justify-between w-full'
            aria-label='آمار پروفایل و دسترسی سریع'
          >
            <UserStatsList user={profile} />
            <UserQuickAccessList />
          </section>

          {/* بخش‌های جانبی مثل هایلایت‌ها */}
          <aside aria-label='هایلایت‌ها و لینک‌های سریع'></aside>
        </header>
      </main>
    </>
  );
}
