import dynamic from 'next/dynamic';

const FeedList = dynamic(() =>
  import('@/widgets/feed/ui/feed-list').then((mod) => mod.FeedList),
);

export default function FeedPage() {
  return <FeedList listType='list' />;
}
