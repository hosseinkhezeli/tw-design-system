import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs';
import { Typography } from '@/shared/components/ui/typography/typography';
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
        className='w-full justify-start min-h-14 border-b border-b-muted-foreground/50 overflow-x-auto no-scrollbar'
      >
        {tabs.map((tab) => (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={`max-w-max text-background!`}
          >
            <Typography
              className={`text-sm font-light border-b-0 border-b-primary transition-all ${tab.value === activeTab && 'font-medium border-b-2 '}`}
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
