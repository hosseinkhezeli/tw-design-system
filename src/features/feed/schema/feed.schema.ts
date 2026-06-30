export interface FeedPaginationSchema {
  readonly offset: number;
  readonly limit: number;
}
export interface UserFeedSchema extends FeedPaginationSchema {
  readonly userId: string;
}
