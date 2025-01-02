import React, { useState } from 'react';
import EditDeletePost from './EditDeletePost';

const Posts = () => {
  const [PostId, setPostId] = useState<string>("");

  const handlePostIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostId(e.target.value);
  };

  const handleClearPost = () => {
    setPostId("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white py-4">
        <h1 className="text-2xl font-bold text-center">Post Manager</h1>
      </header>

      <main className="p-6 flex flex-col items-center">
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={PostId}
            onChange={handlePostIdChange}
            placeholder="Enter Post ID"
            className="border-2 border-gray-300 bg-white placeholder-gray-500 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
          <button
            onClick={handleClearPost}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            Clear Post
          </button>
        </div>

        {PostId && (
          <div className="w-full max-w-2xl">
            <EditDeletePost PostId={PostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;
