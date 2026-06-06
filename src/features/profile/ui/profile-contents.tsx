'use client';
import { useState } from 'react';
import ProfilePosts from './profile-posts';
import ProfileTabs from './profile-tabs';

const ProfileContent = () => {
  const [activeTab, setActiveTabs] = useState<string>('posts');
  return (
    <div className='bg-foreground min-h-[calc(100vh-200px)] rounded-t-4xl'>
      <ProfileTabs onTabChange={setActiveTabs} activeTab={activeTab} />
      {activeTab === 'posts' && <ProfilePosts />}
    </div>
  );
};

export default ProfileContent;
