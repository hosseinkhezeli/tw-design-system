import { IconGift, IconWallet } from '@tabler/icons-react';
import { UserQuickAccessItem } from './user-quick-access-item';

export function UserQuickAccessList() {
  const statsArr = [
    { title: 'کیف پول', icon: <IconWallet /> },
    { title: 'امتیازات و جوایز', icon: <IconGift /> },
  ];
  return (
    <ul className='flex items-center gap-4 w-full'>
      {statsArr.map((stat) => (
        <li key={stat.title} className='w-full'>
          <UserQuickAccessItem title={stat.title} icon={stat.icon} />
        </li>
      ))}
    </ul>
  );
}
