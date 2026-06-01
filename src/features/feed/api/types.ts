export type FeedPost = {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
};

export type FeedPage = {
  items: FeedPost[];
  nextCursor: string | null;
};
