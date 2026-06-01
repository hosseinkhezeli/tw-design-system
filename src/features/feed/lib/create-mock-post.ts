import type { FeedPost } from '../api/types';

const captions = [
  'Morning coffee ☕',
  'Weekend vibes',
  'Ship it 🚀',
  'Another bug fixed',
  'Beautiful sunset',
  'Working remotely',
];

export function createMockPost(index: number): FeedPost {
  return {
    id: String(index + 1),

    username: `user_${index + 1}`,

    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,

    image: `https://picsum.photos/600/${500 + (index % 5) * 100}?random=${index}`,

    caption: captions[index % captions.length],

    likes: Math.floor(Math.random() * 5000),
  };
}
