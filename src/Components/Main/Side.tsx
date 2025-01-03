import { Link } from "react-router-dom";
import { PlusCircle, FileText, FolderPlus, Folder, LayoutDashboard } from 'lucide-react';

export const Side = () => {
  return (
    <div className="bg-cyan-950 text-gray-200 h-screen w-64 fixed top-0 left-0 p-6">
      <nav>
        <h1 className="text-xl font-bold mb-8">Blog Management</h1>
        <ul className="space-y-4">
          <li>
            <Link 
              to="/dashboard/display" 
              className="flex items-center space-x-3 p-2 text-white rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <LayoutDashboard className="w-5 h-5 text-red-400" />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/addpost" 
              className="flex items-center space-x-3 p-2 text-white rounded-lg hover:bg-red-600 hover:text-red-100 transition-colors"
            >
              <PlusCircle className="w-5 h-5 text-red-400" />
              <span>Add Post</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/posts" 
              className="flex items-center space-x-3 p-2 text-white rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <FileText className="w-5 h-5 text-red-400" />
              <span>Manage Posts</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/addcat" 
              className="flex items-center space-x-3 p-2 text-white rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <FolderPlus className="w-5 h-5 text-red-400" />
              <span>Add Category</span>
            </Link>
          </li>
          <li>
            <Link 
              to="/dashboard/category" 
              className="flex items-center space-x-3 p-2 text-white  rounded-lg hover:bg-red-600 hover:text-white transition-colors"
            >
              <Folder className="w-5 h-5 text-red-400 hover:text-white" />
              <span>Manage Category</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

