import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  PlusCircle,
  FileText,
  FolderPlus,
  Folder,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export const Side = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const menuItems = [
    { path: "/dashboard/display", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/dashboard/addpost", icon: PlusCircle, label: "Add Post" },
    { path: "/dashboard/posts", icon: FileText, label: "Manage Posts" },
    { path: "/dashboard/addcat", icon: FolderPlus, label: "Add Category" },
    { path: "/dashboard/category", icon: Folder, label: "Manage Category" },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="overflow-x-hidden">
      <div className="fixed top-0 left-0 w-full bg-slate-800 text-gray-200 p-4 z-50">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent">
            Blog Management
          </h1>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-200 focus:outline-none sm:hidden"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="sm:hidden mt-4 space-y-4"
          >
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                      isActive(item.path)
                        ? "bg-teal-600 text-white shadow-md"
                        : "hover:bg-teal-700 hover:text-white"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-teal-400" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-3 rounded-lg bg-red-600 text-white hover:bg-red-700"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ x: -200 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="hidden sm:block bg-slate-800 text-gray-200 h-screen w-64 fixed top-0 left-0 p-6 shadow-lg"
      >
        <nav>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-2xl font-bold mb-8 bg-gradient-to-r from-teal-400 to-blue-500 bg-clip-text text-transparent"
          >
            Blog Management
          </motion.h1>

          <ul className="space-y-2">
            {menuItems.map((item) => (
              <motion.li
                key={item.path}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * menuItems.indexOf(item), duration: 0.5 }}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-300 ${
                    isActive(item.path)
                      ? "bg-teal-600 text-white shadow-md transform scale-105"
                      : "text-gray-300 hover:bg-teal-700 hover:text-white hover:shadow-md hover:transform hover:scale-105"
                  }`}
                >
                  <item.icon
                    className={`w-5 h-5 ${
                      isActive(item.path) ? "text-blue-300" : "text-teal-400"
                    }`}
                  />
                  <span className="font-large text-lg">{item.label}</span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <motion.button
            onClick={handleLogout}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-12 flex items-center space-x-3 p-3 rounded-lg bg-transparent hover:bg-red-600 hover:text-white hover:shadow-md w-full"
          >
            <LogOut className="w-5 h-5 text-teal-400 group-hover:text-white" />
            <span className="font-bold text-gray-200 text-xl group-hover:text-white">
              Logout
            </span>
          </motion.button>
        </nav>
      </motion.div>

   
    </div>
  );
};
