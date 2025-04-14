import { useState } from 'react';
import { Post } from '@/types';
import { useGameStore } from '@/store/gameStore';
import { motion, AnimatePresence } from 'framer-motion';

interface DiscussionPostProps {
  post: Post;
}

export const DiscussionPost = ({ post }: DiscussionPostProps) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const { likePost, addComment } = useGameStore();

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      userId: 'user-1', // In a real app, this would come from auth
      username: 'Player', // In a real app, this would come from auth
      content: newComment,
      createdAt: Date.now(),
      likes: []
    };

    addComment(post.id, comment);
    setNewComment('');
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-purple-900/40 rounded-lg border border-purple-500/30"
    >
      <div className="mb-2">
        <h3 className="text-xl font-semibold text-purple-200">{post.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>{post.username}</span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      <p className="text-gray-300 mb-4">{post.content}</p>

      <div className="flex items-center gap-4">
        <button
          onClick={() => likePost(post.id)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
        >
          <span>{post.likes.length > 0 ? '❤️' : '🤍'}</span>
          <span>{post.likes.length} likes</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-purple-400 transition-colors"
        >
          <span>💬</span>
          <span>{post.comments.length} comments</span>
        </button>
      </div>

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-purple-500/30"
          >
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 p-2 bg-black/30 border border-purple-500/30 rounded-lg text-white"
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white transition-colors"
              >
                Comment
              </button>
            </div>

            <div className="space-y-3">
              {post.comments.map(comment => (
                <div key={comment.id} className="p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-purple-300">{comment.username}</span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-300">{comment.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};