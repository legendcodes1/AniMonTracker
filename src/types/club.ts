export interface Club {
  id: string;
  name: string;
  description: string;
  banner_url?: string;
  group_avatar_url?: string;
  image?: string;
  badge?: number | string;
  created_by?: string;
  created_at?: string;
  member_count?: number;
  tags?: string[];
}

export interface ClubMember {
  id: string;
  club_id: string;
  user_id: string;
  role: "admin" | "moderator" | "member";
  joined_at: string;
  username?: string;
  avatar_url?: string;
}

export interface DiscussionPost {
  id: string;
  club_id: string;
  user_id: string;
  username?: string;
  avatar_url?: string;
  content: string;
  created_at: string;
  likes_count?: number;
  comments_count?: number;
}
