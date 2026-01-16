export type ContentType = 'video' | 'live' | 'image' | 'audio' | 'text';

export type ContentFilter = 'all' | 'following' | 'videos' | 'images' | 'audio' | 'text' | 'live' | 'ranked';

export interface Creator {
  username: string;
  avatar: string;
  isVerified: boolean;
}

export interface Post {
  id: string;
  type: ContentType;
  creator: Creator;
  title: string;
  description: string;
  content?: string;
  mediaUrl?: string;
  publishedAt: string;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  isFollowing: boolean;
  isRankedContent: boolean;
  tags?: string[];
  duration?: string;
  viewerCount?: number;
}

export interface Comment {
  id: string;
  username: string;
  avatar: string;
  text: string;
  timeAgo: string;
  likes: number;
}

export interface UserInteractions {
  likedPosts: Set<string>;
  savedPosts: Set<string>;
  followingCreators: Set<string>;
}
