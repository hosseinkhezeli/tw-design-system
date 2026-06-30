import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Typography } from '@/shared/ui/typography';
import React from 'react';

const tabs = [
  { value: 'posts', label: 'پست‌ها' },
  { value: 'producs', label: 'محصولات' },
];

interface ProfileTabsProps {
  activeTab: string;
  onTabChange?: (value: string) => void;
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({
  activeTab,
  onTabChange,
}) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className='w-full'>
      <TabsList
        variant={'line'}
        className='w-full justify-start min-h-14 overflow-x-auto no-scrollbar'
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`max-w-max `}
          >
            <Typography
              className={`text-sm font-light  transition-all ${tab.value === activeTab && ' '}`}
            >
              {tab.label}
            </Typography>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default ProfileTabs;
