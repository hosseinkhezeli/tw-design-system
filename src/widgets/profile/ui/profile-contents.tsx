'use client';
import { useState } from 'react';
import ProfilePosts from '../../../features/profile/ui/profile-posts';
import ProfileTabs from './profile-tabs';
import { Visibility } from '@/shared/ui/visibility';

const ProfileContent = () => {
  const [activeTab, setActiveTabs] = useState<string>('posts');
  return (
    <div className='bg-secondary min-h-[calc(100vh-200px)] rounded-t-4xl'>
      <ProfileTabs onTabChange={setActiveTabs} activeTab={activeTab} />
      <Visibility visible={activeTab === 'posts'}>
        <ProfilePosts />
      </Visibility>
    </div>
  );
};

export default ProfileContent;
