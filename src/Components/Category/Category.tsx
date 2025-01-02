import React, { useState } from 'react'
import EditDeleteCategory from './EditDeleteCategory';

const Category = () => {
     const [categoryId, setCategoryId] = useState<string>("");

     const handleCategoryIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         setCategoryId(e.target.value);
       };
     
       const handleClearCategory = () => {
         setCategoryId("");
       };
  return (
    <div>
      <header>
        <h1 className="text-2xl font-bold">Category Manager</h1>
      </header>
      <main className="p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={categoryId}
            onChange={handleCategoryIdChange}
            placeholder="Enter Category ID"
            className="border-2 border-black-300 bg-white placeholder-gray-400 text-gray-800"
          />
          <button
            onClick={handleClearCategory}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
          >
            Clear Category
          </button>
        </div>

        {categoryId && <EditDeleteCategory categoryId={categoryId} />}
      </main>
    </div>
  )
}

export default Category