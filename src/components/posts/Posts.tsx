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
      <header className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white py-6 shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-bold text-center">Post Manager</h1>
      </header>

      <main className="py-6 sm:py-6 flex flex-col items-center flex-grow">
        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-6 w-full max-w-md sm:max-w-lg">
          <input
            type="text"
            value={PostId}
            onChange={handlePostIdChange}
            placeholder="Enter Post ID"
            className="flex-1 border-2 border-indigo-800 bg-white placeholder-indigo-400 text-indigo-800 py-2 px-1 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300 hover:shadow-lg"
          />
          <button
            onClick={handleClearPost}
            className="w-full sm:w-auto bg-gradient-to-r from-teal-300 to-emerald-300 text-white text-bold py-2 px-6 rounded-md hover:from-emerald-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Clear Post
          </button>
        </div>

        {PostId && (
          <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-lg shadow-xl py-6 border-2 border-indigo-100">
            <EditDeletePost PostId={PostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;
