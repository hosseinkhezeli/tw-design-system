import { useState } from 'react';
import { StoryProgress } from './story-progress';

type Story = {
  id: string;
  url: string;
  type: 'image' | 'video';
};

export function StoryViewer({ stories }: { stories: Story[] }) {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (index < stories.length - 1) setIndex(index + 1);
  };

  const story = stories[index];

  return (
    <div className='relative w-full h-full bg-black' onClick={next}>
      <StoryProgress value={(index / stories.length) * 100} />

      {story.type === 'image' ? (
        <img src={story.url} className='w-full h-full object-cover' />
      ) : (
        <video src={story.url} autoPlay className='w-full h-full' />
      )}
    </div>
  );
}
