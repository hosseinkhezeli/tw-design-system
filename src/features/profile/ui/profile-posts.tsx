// features/profile/ui/ProfilePosts.tsx
import { Card } from '@/shared/components/ui/card';
import React from 'react';

const mockPosts = [
  {
    id: 1,
    image: 'https://picsum.photos/id/1015/600/800',
    likes: '12.4k',
    comments: '342',
    title: 'این ست پاییزی رو حتماً ببینید 🔥',
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/237/600/800',
    likes: '8.7k',
    comments: '189',
    title: 'روتین مراقبت پوستم تو پاییز',
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/201/600/800',
    likes: '23.1k',
    comments: '567',
    title: 'بهترین کافه‌های شانگهای که رفتم',
  },
];

const ProfilePosts: React.FC = () => {
  return (
    <div className='p-3'>
      <div className='grid grid-cols-3 '>
        {[...mockPosts, ...mockPosts, ...mockPosts].map((post) => (
          <Card
            key={post.id}
            className='overflow-hidden rounded-none border-0 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group aspect-[3/4] relative'
          >
            <div className='relative w-full h-full'>
              <img
                src={post.image}
                alt={post.title}
                className='w-full h-full object-cover'
              />

              {/* Overlay */}
              <div className='absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-200'>
                <p className='text-white text-xs line-clamp-2 font-medium leading-tight mb-2'>
                  {post.title}
                </p>

                <div className='flex items-center justify-between text-white text-[10px]'>
                  <span className='flex items-center gap-1'>
                    ❤️ {post.likes}
                  </span>
                  <span className='flex items-center gap-1'>
                    💬 {post.comments}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className='flex justify-center mt-8'>
        <p className='text-gray-400 text-sm'>
          در حال بارگذاری پست‌های بیشتر...
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
