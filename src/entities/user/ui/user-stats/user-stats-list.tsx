import { User } from '../../types/user.types';
import { UserStats } from './user-stats';

export function UserStatsList({ user }: { readonly user: User }) {
  const statsArr = [
    { title: 'پست', value: user.postsCount },
    { title: 'دنبال‌کننده', value: user.followersCount },
    { title: 'دنبال‌شده', value: user.followingCount },
  ];
  return (
    <ul className='flex gap-4'>
      {statsArr.map((stat) => (
        <li key={stat.title}>
          <UserStats title={stat.title} value={stat.value} />
        </li>
      ))}
    </ul>
  );
}
