import { useState } from 'react';
import { Post, Room } from '@/types';
import { useGameStore } from '@/store/gameStore';
import { motion } from 'framer-motion';
import { DiscussionPost } from './DiscussionPost';

interface DiscussionPanelProps {
  room: Room;
}

export const DiscussionPanel = ({ room }: DiscussionPanelProps) => {
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const { addPost, discussions } = useGameStore();

  const roomDiscussions = discussions?.filter(post => post.roomId === room.id) || [];

  const handleSubmitPost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: Post = {
      id: Date.now().toString(),
      roomId: room.id,
      userId: 'user-1', // In a real app, this would come from auth
      username: 'Player', // In a real app, this would come from auth
      title: newPostTitle,
      content: newPostContent,
      createdAt: Date.now(),
      likes: [],
      comments: []
    };

    addPost(newPost);
    setNewPostTitle('');
    setNewPostContent('');
    setShowNewPost(false);
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm rounded-lg p-6 mt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-300">Room Discussions</h2>
        <button
          onClick={() => setShowNewPost(true)}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
        >
          New Post
        </button>
      </div>

      {showNewPost && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-4 bg-purple-900/40 rounded-lg"
        >
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Post title..."
            className="w-full mb-3 p-2 bg-black/30 border border-purple-500/30 rounded-lg text-white"
          />
          <textarea
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            placeholder="Share your thoughts..."
            rows={4}
            className="w-full mb-3 p-2 bg-black/30 border border-purple-500/30 rounded-lg text-white resize-none"
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setShowNewPost(false)}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitPost}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
            >
              Post
            </button>
          </div>
        </motion.div>
      )}

      <div className="space-y-4">
        {roomDiscussions.length === 0 ? (
          <p className="text-gray-400 text-center py-8">No discussions yet. Be the first to start one!</p>
        ) : (
          roomDiscussions.map(post => (
            <DiscussionPost key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};