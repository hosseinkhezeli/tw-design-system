import { POST_TYPE, POST_VISIBILITY } from '../constants/post.constants';
import { MEDIA_TYPE } from '@/entities/media';
import { Post } from '../types/post.types';

function createRng(seed = 42) {
  let value = seed;

  return () => {
    value = (value * 16807) % 2147483647;
    return value / 2147483647;
  };
}

const rnd = createRng(42);

function pick<T>(arr: T[]): T {
  return arr[Math.floor(rnd() * arr.length)];
}

function chance(p: number) {
  return rnd() < p;
}

const users = [
  {
    id: 'u1',
    username: 'hossein.dev',
    displayName: 'حسین',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    isVerified: true,
  },
  {
    id: 'u2',
    username: 'design.daily',
    displayName: 'هنر دیزاین',
    avatarUrl: 'https://i.pravatar.cc/150?img=32',
    isVerified: false,
  },
  {
    id: 'u3',
    username: 'frontend.craft',
    displayName: 'برنامه‌نویس فرانت اند طولانی‌الاصل',
    avatarUrl: 'https://i.pravatar.cc/150?img=22',
    isVerified: true,
  },
];

const captions = [
  'تست طراحی UI تمیز و ',
  'هر روز بهتر از دیروز و روز‌های قبل و این داستانا',
  'یک در دنیا صد در آخرت',
  'فاینال تاچ کار',
  'به به چه اپلیکیشنی',
  'موبایل فرست سگ',
  'ببین من کی بودم!',
];

const hashtags = [
  'ui',
  'frontend',
  'nextjs',
  'react',
  'design',
  'mobile',
  'performance',
  'product',
];

function createPost(index: number): Post {
  const author = pick(users);

  return {
    id: `post_${index}`,

    type: POST_TYPE.IMAGE,

    author,

    title: chance(0.5) ? pick(captions) : undefined,
    caption: pick(captions),

    hashtags: Array.from({ length: 3 }, () => pick(hashtags)),

    media: chance(0.7)
      ? [
          {
            id: `media_${index}`,
            type: MEDIA_TYPE.IMAGE,
            url: `https://picsum.photos/seed/${index}/800/600`,
            thumbnailUrl: `https://picsum.photos/seed/${index}/400/300`,
            width: 800,
            height: 300,
            duration: undefined,
          },
        ]
      : [],

    products: chance(0.3)
      ? [
          {
            id: `prod_${index}`,
            title: 'Product Item',
            imageUrl: `https://picsum.photos/seed/prod_${index}/200/200`,
            price: Math.floor(rnd() * 2000) + 50,
          },
        ]
      : [],

    location: chance(0.4) ? 'Tehran, Iran' : undefined,

    visibility: pick([
      POST_VISIBILITY.PUBLIC,
      POST_VISIBILITY.PUBLIC,
      POST_VISIBILITY.FOLLOWERS_ONLY,
    ]),

    likesCount: Math.floor(rnd() * 50000),
    commentsCount: Math.floor(rnd() * 80),
    sharesCount: Math.floor(rnd() * 30),
    savesCount: Math.floor(rnd() * 120),

    viewer: {
      isLiked: chance(0.4),
      isSaved: chance(0.3),
      canEdit: false,
      canDelete: false,
    },

    createdAt: new Date(
      Date.now() - Math.floor(rnd() * 1000000000),
    ).toISOString(),

    updatedAt: chance(0.3) ? new Date().toISOString() : undefined,
  };
}

export const mockPosts: Post[] = Array.from({ length: 120 }, (_, i) =>
  createPost(i + 1),
);
