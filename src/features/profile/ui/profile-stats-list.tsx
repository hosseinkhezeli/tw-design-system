import { ProfileStat } from './profile-stat';

const stats = {
  posts: 235,
  followers: 234566,
  follows: 12,
};

export function ProfileStatsList() {
  const statsArr = [
    { title: 'پست', value: stats.posts },
    { title: 'دنبال‌کننده', value: stats.followers },
    { title: 'دنبال‌شده', value: stats.follows },
  ];
  return (
    <div className='flex gap-4'>
      {statsArr.map((stat) => (
        <ProfileStat key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
}
