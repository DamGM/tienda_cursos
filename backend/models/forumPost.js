import { supabase } from '../config/supabase';

class ForumPost {
  async create(data) {
    const { userId, content } = data;
    const post = await supabase
     .from('forum_posts')
     .insert({ user_id: userId, content });
    return post;
  }

  async getAll() {
    const posts = await supabase
     .from('forum_posts')
     .select('id, user_id, content, created_at');
    return posts;
  }
}

export default ForumPost;