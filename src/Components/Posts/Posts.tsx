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
    <div className=" ">
      <header className="bg-gradient-to-r from-emerald-500  to-teal-400 text-white py-6 shadow-lg">
        <h1 className="text-3xl font-bold text-center">Post Manager</h1>
      </header>

      <main className="p-6 flex flex-col items-center">
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            value={PostId}
            onChange={handlePostIdChange}
            placeholder="Enter Post ID"
            className="border-2 border-indigo-800 bg-white placeholder-indigo-400 text-indigo-800 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 shadow-md transition duration-300 hover:shadow-lg"
          />
          <button
            onClick={handleClearPost}
            className="bg-gradient-to-r from-teal-300 to-emerald-300 text-white text-bold py-2 px-6 rounded-md hover:from-emerald-600 hover:to-teal-700 transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Clear Post
          </button>
        </div>

        {PostId && (
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 border-2 border-indigo-100">
            <EditDeletePost PostId={PostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Posts;

