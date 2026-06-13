import { Metadata } from 'next';
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

// سئوی صفحه پروفایل
export const metadata: Metadata = {
  title: 'پروفایل روبان شاپ | سوشال کامرس',
  description: 'مشاهده پست‌ها، محصولات و هایلایت‌های روبان شاپ',
};

const bio = `👨‍💻👨🏽‍💻👨🏿‍💻🚀🔥✨🎯
این‌یک‌کلمه‌بسیارطولانی‌است‌که‌نباید‌لی‌اوت‌را‌خراب‌کند
❤️🧡💛💚💙💜🖤🤍🤎`;

export default function MyProfilePage() {
  return (
    // جایگزینی Fragment با تگ main
    <main className='flex flex-col w-full'>
      {/* هدر اطلاعات پروفایل */}
      <header className='flex flex-col w-full gap-4 pr-4 py-5'>
        <div className='flex w-full gap-4'>
          <ProfileAvatar />
          <div className='flex flex-col'>
            {/* استفاده از h1 برای عنوان اصلی صفحه */}
            <Typography variant={'subtitle'} as='h1'>
              روبان شاپ
            </Typography>
            <Text
              title='شناسه روبان'
              text='231455345'
              classNames={{ title: 'opacity-50' }}
            />
            <Text
              title='شهر'
              text='علی‌آباد کتول'
              classNames={{ title: 'opacity-50' }}
            />
          </div>
        </div>

        <ProfileBio bio={bio} />
        <ProfileInterestTags />

        {/* بخش آمار و اکشن‌ها */}
        <section
          className='flex justify-between pl-4'
          aria-label='آمار و دکمه‌های تعاملی'
        >
          <ProfileStatsList />
          <ProfileActions />
        </section>

        {/* بخش‌های جانبی مثل هایلایت‌ها */}
        <aside aria-label='هایلایت‌ها و لینک‌های سریع'>
          <ProfileHighlightsList className='pl-4' />
          <QuickLinksList className='-mx-4 pr-4 pl-8' />
        </aside>
      </header>

      {/* محتوای اصلی پروفایل (فید پست‌ها یا محصولات) */}
      <section aria-label='محتوای کاربر'>
        <ProfileContent />
      </section>
    </main>
  );
}
