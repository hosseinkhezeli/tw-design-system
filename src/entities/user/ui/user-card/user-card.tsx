import { Typography } from '@/shared/ui/typography';
import { Text } from '@/shared/ui/text';
import { UserAvatar } from '../user-avatar/user-avatar';
import { User } from '../../types/user.types';
import { UserBio } from '../user-bio/user-bio';
import { UserInterestTags } from '../uesr-interest-tags/user-interest-tags';
import { UserStatsList } from '../user-stats/user-stats-list';

export function UserCard({ user }: { readonly user: User }) {
  return (
    <header className='flex flex-col w-full gap-4 pr-4 py-5'>
      <div className='flex w-full gap-4'>
        <UserAvatar user={user} />
        <div className='flex flex-col'>
          <Typography variant={'subtitle'} as='h1'>
            {user.fullName}
          </Typography>
          <Text
            title='شناسه'
            text={user.username}
            classNames={{ title: 'opacity-50' }}
          />
        </div>
      </div>

      <UserBio bio={user.bio} />
      <UserInterestTags />

      <section className='flex justify-between pl-4' aria-label='آمار'>
        <UserStatsList user={user} />
      </section>

      <aside aria-label='هایلایت‌ها و لینک‌های سریع'>
        {/* <UserHighlightsList className='pl-4' />
        <QuickLinksList className='-mx-4 pr-4 pl-8' /> */}
      </aside>
    </header>
  );
}
