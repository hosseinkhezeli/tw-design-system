/* eslint-disable @typescript-eslint/no-explicit-any */
export const QUERY_KEYS = {
  feed: {
    all: ['feed'] as const,
    list: (filters?: any) => ['feed', 'list', filters] as const,
  },

  profile: {
    all: ['profile'] as const,
    me: () => ['profile', 'me'] as const,
    user: (id: string) => ['profile', 'user', id] as const,
  },

  inbox: {
    all: ['inbox'] as const,
    list: () => ['inbox', 'list'] as const,
  },

  post: {
    detail: (id: string) => ['post', id] as const,
  },
};
