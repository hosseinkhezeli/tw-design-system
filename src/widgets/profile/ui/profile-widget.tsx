/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserAvatar, UserBio, UserStatsList } from '@/entities/user';
import { Typography } from '@/shared/ui/typography';
import { ProfileWidgetModel } from '../model/profile-widget.model';
import { Button } from '@/shared/ui/button';
import { IconEdit, IconInfoCircle } from '@tabler/icons-react';
import { VerifiedUserBadge } from '@/entities/user/ui/verified-user-badge';
import { UserQuickAccessList } from '@/entities/user/ui/user-quick-access/user-quick-access-list';
import { Suspense } from 'react';
import { ProfileMenuSheet } from './profile-menu-sheet';
import ProfileContent from './profile-contents';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';

type Props = {
  user: any;
};

export function ProfileWidget({ user }: Props) {
  const { user: profile } = ProfileWidgetModel.from(user);
  return (
    <>
      <main className='flex flex-col w-full relative pt-13'>
        <div className='flex w-full justify-between items-center py-2 px-4 fixed top-0 right-0 bg-background z-20'>
          <ProfileMenuSheet />
          <Select value={profile.username}>
            <SelectTrigger className='w-max max-w-1/2 border-none! rounded-full bg-transparent!'>
              <SelectValue placeholder='حساب کاربری' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={profile.username}>
                  {profile.username}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div />
        </div>
        <header className='flex flex-col w-full gap-4 px-4 pb-5'>
          <div className='flex w-full gap-4 items-center justify-between'>
            <div className='flex w-full gap-4 items-center'>
              <UserAvatar user={profile} />
              <div className='flex flex-col gap-2'>
                <Typography variant={'subtitle'} as='h1'>
                  {profile.fullName}
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

          <Suspense fallback={null}>
            <UserBio bio={profile.bio} />
          </Suspense>
          {/* بخش آمار و اکشن‌ها */}
          <section
            className='flex flex-col justify-between w-full px-2'
            aria-label='آمار پروفایل و دسترسی سریع'
          >
            <UserStatsList user={profile} />
          </section>

          {/* بخش‌های جانبی مثل هایلایت‌ها */}
          <aside aria-label='هایلایت‌ها و لینک‌های سریع'>
            <UserQuickAccessList />
          </aside>
        </header>
        <section>
          <ProfileContent />
        </section>
      </main>
    </>
  );
}
