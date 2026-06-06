import { BioDescription } from '@/features/profile/ui/bio-description';
import { InterestTags } from '@/features/profile/ui/interest-tags';
import { ProfileActions } from '@/features/profile/ui/profile-actions';
import { ProfileAvatar } from '@/features/profile/ui/profile-avatar';
import { ProfileHighlightsList } from '@/features/profile/ui/profile-highlights-list';
import { ProfileStatsList } from '@/features/profile/ui/profile-stats-list';
import { QuickLinksList } from '@/features/profile/ui/quick-links-list';
import { Text } from '@/shared/components/text';
import { Typography } from '@/shared/components/ui/typography/typography';

export default function MyProfilePage() {
  return (
    <div className='flex flex-col w-full pb-[64] gap-4'>
      <div className='flex w-full gap-4'>
        <ProfileAvatar />
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
      <BioDescription bio={bio} />
      <InterestTags />
      <div className='flex justify-between'>
        <ProfileStatsList />
        <ProfileActions />
      </div>
      <ProfileHighlightsList />
      <QuickLinksList />
    </div>
  );
}

const bio = `👨‍💻👨🏽‍💻👨🏿‍💻🚀🔥✨🎯
این‌یک‌کلمه‌بسیارطولانی‌است‌که‌نباید‌لی‌اوت‌را‌خراب‌کنداین‌یک‌کلمه‌بسیارطولانی‌است‌که‌نباید‌لی‌اوت‌را‌خراب‌کند
❤️🧡💛💚💙💜🖤🤍🤎`;
