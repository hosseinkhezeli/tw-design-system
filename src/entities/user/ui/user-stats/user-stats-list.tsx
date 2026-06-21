import { User } from '../../types/user.types';
import { UserStats } from './user-stats';

export function UserStatsList({ user }: { readonly user: User }) {
  const statsArr = [
    { title: 'دنبال‌کننده', value: user.followersCount },
    { title: 'دنبال‌شده', value: user.followingCount },
    { title: 'لایک و ذخیره', value: user.postsCount },
  ];
  return (
    <ul className='flex justify-between items-center w-full'>
      {statsArr.map((stat) => (
        <li key={stat.title}>
          <UserStats title={stat.title} value={stat.value} />
        </li>
      ))}
    </ul>
  );
}
