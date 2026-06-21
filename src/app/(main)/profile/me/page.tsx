import { User } from '@/entities/user';
import { ProfileWidget } from '@/widgets/profile/ui/profile-widget';
import { Metadata } from 'next';

// سئوی صفحه پروفایل
export const metadata: Metadata = {
  title: 'پروفایل روبان شاپ | سوشال کامرس',
  description: 'مشاهده پست‌ها، محصولات و هایلایت‌های روبان شاپ',
};

export default function MyProfilePage() {
  return <ProfileWidget user={userMock} />;
}

export const userMock: User = {
  id: 'user_1',
  username: 'hossein_dev',
  fullName: 'حسین رضایی',
  avatarUrl: 'https://picsum.photos/200',
  bio: 'علاقه‌مند به فرانت‌اند، طراحی محصول و ساخت تجربه‌های کاربری ساده و سریع.',
  followersCount: 1248,
  followingCount: 356,
  postsCount: 42,
  isVerified: true,
  interests: [
    'برنامه‌نویسی',
    'فرانت‌اند',
    'ری‌اکت',
    'نکست‌جی‌اس',
    'طراحی رابط کاربری',
    'استارتاپ',
  ],
  createdAt: '2025-01-15T08:30:00Z',
  updatedAt: '2026-06-21T10:15:00Z',
};
