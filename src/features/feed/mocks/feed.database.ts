export type FeedPost = {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
  };
  image: string;
  caption: string;
  likes: number;
  comments: number;
  createdAt: string;
};

export type FeedPage = {
  items: FeedPost[];
  nextCursor: string | null;
};

const captions = [
  'Morning coffee ☕',
  'Beautiful sunset today',
  'Weekend vibes',
  'Another day, another bug',
  'Ship it 🚀',
  'Working remotely',
  'Gym session complete',
  'Random photo from my camera roll',
];

export const FEED_DATABASE: FeedPost[] = Array.from({ length: 1000 }, (_, index) => ({
  id: String(index + 1),

  user: {
    id: String(index + 1),
    username: `user_${index + 1}`,
    avatar: `https://i.pravatar.cc/150?img=${(index % 70) + 1}`,
  },

  image: `https://picsum.photos/600/${500 + (index % 5) * 100}?random=${index}`,

  caption: captions[index % captions.length],

  likes: Math.floor(Math.random() * 5000),

  comments: Math.floor(Math.random() * 500),

  createdAt: '2h',
}));
