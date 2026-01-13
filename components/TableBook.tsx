import { useState } from 'react';
import { Heart, MessageCircle, Repeat2, Share, Send } from 'lucide-react';
import { PixelAvatar } from './PixelAvatar';

export function TableBook() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Марія Коваленко',
      avatar: 'user1',
      time: '2 год тому',
      content: 'Щойно здала лабораторну з алгоритмів! 🎉 Хто ще встиг?',
      likes: 24,
      comments: 5,
      reposts: 2,
      liked: false,
    },
    {
      id: 2,
      author: 'Іван Сидоренко',
      avatar: 'user2',
      time: '5 год тому',
      content: 'Підкажіть, хто знає добрі ресурси для вивчення React? Дякую заздалегідь! 💻',
      likes: 18,
      comments: 12,
      reposts: 3,
      liked: true,
    },
    {
      id: 3,
      author: 'Анна Мельник',
      avatar: 'user3',
      time: '1 день тому',
      content: 'Завтра презентація проєкту. Хвилююсь, але готова! Wish me luck! 🍀✨',
      likes: 45,
      comments: 8,
      reposts: 1,
      liked: false,
    },
  ]);

  const [newPost, setNewPost] = useState('');

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handlePost = () => {
    if (!newPost.trim()) return;

    const post = {
      id: posts.length + 1,
      author: 'Олександр Петренко',
      avatar: 'student',
      time: 'Щойно',
      content: newPost,
      likes: 0,
      comments: 0,
      reposts: 0,
      liked: false,
    };

    setPosts([post, ...posts]);
    setNewPost('');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 bg-gradient-to-r from-pink-600/20 to-rose-600/20 border-b border-pink-500/30 backdrop-blur-sm">
        <h2 className="text-lg text-white">📖 TableBook</h2>
        <p className="text-xs text-pink-400">Університетська соц. мережа</p>
      </div>

      {/* New Post */}
      <div className="p-4 bg-gray-900/50 border-b border-pink-500/20">
        <div className="flex gap-3">
          <PixelAvatar variant="student" size={40} />
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Що нового?"
              className="w-full px-3 py-2 bg-black border border-pink-500/30 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm text-white placeholder-gray-500"
              rows={2}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handlePost}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-full text-sm hover:scale-105 transition-transform flex items-center gap-1 shadow-lg shadow-pink-500/30"
              >
                <Send className="w-4 h-4" />
                Опублікувати
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="flex-1 overflow-y-auto bg-black">
        {posts.map((post) => (
          <div key={post.id} className="p-4 border-b border-pink-500/10 bg-gray-900/30 hover:bg-gray-900/50 transition-colors">
            <div className="flex gap-3">
              <PixelAvatar variant={post.avatar as any} size={40} />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm text-white">{post.author}</h3>
                  <span className="text-xs text-gray-500">• {post.time}</span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{post.content}</p>

                {/* Actions */}
                <div className="flex items-center gap-6 text-gray-500">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`flex items-center gap-1 hover:text-pink-400 transition-colors ${
                      post.liked ? 'text-pink-400' : ''
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.liked ? 'fill-current' : ''}`} />
                    <span className="text-xs">{post.likes}</span>
                  </button>

                  <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-xs">{post.comments}</span>
                  </button>

                  <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                    <Repeat2 className="w-4 h-4" />
                    <span className="text-xs">{post.reposts}</span>
                  </button>

                  <button className="flex items-center gap-1 hover:text-pink-400 transition-colors">
                    <Share className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}