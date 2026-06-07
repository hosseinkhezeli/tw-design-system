import { ProfileBio } from '@/features/profile/ui/profile-bio';
import { ProfileInterestTags } from '@/features/profile/ui/profile-interest-tags';
import { ProfileActions } from '@/features/profile/ui/profile-actions';
import { ProfileAvatar } from '@/features/profile/ui/profile-avatar';
import ProfileContent from '@/features/profile/ui/profile-contents';
import { ProfileHighlightsList } from '@/features/profile/ui/profile-highlights-list';
import { ProfileStatsList } from '@/features/profile/ui/profile-stats-list';
import { QuickLinksList } from '@/features/profile/ui/quick-links-list';
import { Text } from '@/shared/components/text';
import { Typography } from '@/shared/components/ui/typography/typography';

export default function MyProfilePage() {
  return (
    <>
      <div className='flex flex-col w-full gap-4 pr-4 py-5'>
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
        <ProfileBio bio={bio} />
        <ProfileInterestTags />
        <div className='flex justify-between pl-4'>
          <ProfileStatsList />
          <ProfileActions />
        </div>
        <ProfileHighlightsList className='pl-4' />
        <QuickLinksList className='-mx-4 pr-4 pl-8' />
      </div>
      <ProfileContent />
    </>
  );
}

const bio = `👨‍💻👨🏽‍💻👨🏿‍💻🚀🔥✨🎯
این‌یک‌کلمه‌بسیارطولانی‌است‌که‌نباید‌لی‌اوت‌را‌خراب‌کنداین‌یک‌کلمه‌بسیارطولانی‌است‌که‌نباید‌لی‌اوت‌را‌خراب‌کند
❤️🧡💛💚💙💜🖤🤍🤎`;
