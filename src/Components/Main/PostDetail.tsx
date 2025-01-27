"use client";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaFolder } from "react-icons/fa";

interface Post {
  id: number;
  date: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
}

const PostDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8081/posts/getID/${id}`);
        const data = await response.json();
        const postData = data;

        if (postData.image) {
          postData.image = `http://localhost:8081/posts/images/${id}`;
        }

        setPost(postData);
      } catch {
        setError("Error fetching post");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleBack = () => navigate("/dashboard/display");

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!post) {
    return <ErrorMessage message="Post not found" />;
  }
  const body = post.description;
  return (
    // <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className=" h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 py-12 px-4 sm:px-6 lg:px-8 lg:mx-0"
      >
        <Card className="min-w-7xl overflow-hidden shadow-2xl rounded-3xl py-12 px-4 sm:px-6 lg:px-8 border-0 bg-white/10 backdrop-blur-md bg-gradient-to-br from-cyan-100 via-indigo-200 to-blue-100">
          <CardHeader className="relative py-12 px-6">
            <motion.div
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <CardTitle className="text-4xl md:text-6xl font-extrabold text-center text-blue-800 mb-6 tracking-tight">
                {post.title}
              </CardTitle>
              <div className="flex justify-center items-center space-x-6 text-blue-400">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-xl" />
                  <span className="text-lg">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaFolder className="text-xl" />
                  <span className="text-lg">{post.category}</span>
                </div>
              </div>
            </motion.div>
          </CardHeader>

          <CardContent className="p-6 md:p-10">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col md:flex-row gap-10 justify-center items-center"
            >
              <div className="flex flex-col items-center w-full">
                <div
                  dangerouslySetInnerHTML={{ __html: body }}
                  className="text-lg text-cyan-500 bg-white/40 p-6 rounded-xl shadow-inner mt-0 mx-auto w-full max-w-4xl text-justify"
                ></div>
              </div>
            </motion.div>
          </CardContent>

          <CardFooter className="flex justify-center pb-8">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="bg-white text-teal-600 hover:bg-teal-100 transition-all duration-300 ease-in-out shadow-lg h-14 px-10 rounded-full text-lg font-semibold flex items-center space-x-2"
                onClick={handleBack}
              >
                <IoMdArrowRoundBack className="text-2xl" />
                <span>Back to Posts</span>
              </Button>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>
    // </AnimatePresence>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 py-12 px-4 sm:px-6 lg:px-8">
    <Card className="max-w-4xl mx-auto overflow-hidden shadow-2xl rounded-3xl border-0 bg-white/10 backdrop-blur-md">
      <CardHeader className="relative py-12 px-6">
        <Skeleton className="h-12 w-3/4 mx-auto mb-6 bg-white/20" />
        <div className="flex justify-center items-center space-x-6">
          <Skeleton className="h-6 w-32 bg-white/20" />
          <Skeleton className="h-6 w-32 bg-white/20" />
        </div>
      </CardHeader>
      <CardContent className="p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-10">
          <Skeleton className="h-80 md:w-1/2 rounded-2xl bg-white/20" />
          <div className="md:w-1/2">
            <Skeleton className="h-6 w-full mb-4 bg-white/20" />
            <Skeleton className="h-6 w-full mb-4 bg-white/20" />
            <Skeleton className="h-6 w-3/4 bg-white/20" />
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
);

const ErrorMessage: React.FC<{ message: string }> = ({ message }) => (
  <div className="min-h-screen bg-gradient-to-br from-teal-400 via-emerald-500 to-cyan-600 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
    <Card className="max-w-2xl w-full bg-white/10 backdrop-blur-md border-l-4 border-red-500 shadow-2xl rounded-3xl p-8">
      <CardContent className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            className="mx-auto h-20 w-20 text-red-500 mb-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-2xl font-semibold text-white">{message}</p>
        </motion.div>
      </CardContent>
    </Card>
  </div>
);

export default PostDetail;
