import dynamic from 'next/dynamic';
import { FeedSkeleton } from '@/features/feed/ui/feed-skeleton';

const FeedList = dynamic(
  () => import('@/widgets/feed/ui/feed-list').then((mod) => mod.FeedList),
  {
    loading: () => <FeedSkeleton />,
  },
);

export default function FeedPage() {
  return <FeedList />;
}
