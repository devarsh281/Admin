"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { myAPI } from "@/lib/utils";
import { motion } from "framer-motion";

interface PostData {
  title: string;
  description: string;
  category: string;
  image: File | null;
}

const AddPosts: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    category: "",
    image: null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await myAPI("category/getAll");
        console.log("API Response:", result);
        if (result.data && Array.isArray(result.data)) {
          const categoryNames = result.data.map(
            (category: { name: string }) => category.name
          );
          setCategories(categoryNames);
        } else {
          console.error("Data is not an array or missing:", result);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setPostData({
      ...postData,
      image: file,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("title", postData.title);
      formData.append("description", postData.description);
      formData.append("category", postData.category);
      if (postData.image) {
        formData.append("image", postData.image);
      }

      const response = await fetch("http://localhost:8081/posts/addpost", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSuccess(true);
        setPostData({ title: "", description: "", category: "", image: null });
      } else {
        throw new Error("Failed to submit the post");
      }
    } catch (error) {
      setError("Failed to Post Data: " + (error instanceof Error ? error.message : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-h-screen max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5,ease:"easeInOut" }}
      >
        <Card className="bg-gradient-to-br from-emerald-100/20 to-teal-100/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">Add Post</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="title" className="text-md font-medium text-emerald-800">
                  Title
                </label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                  required
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </motion.div>

              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="description" className="text-md font-medium text-emerald-800">
                  Description
                </label>
                <Textarea
                  id="description"
                  name="description"
                  value={postData.description}
                  onChange={handleChange}
                  required
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </motion.div>

              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="category" className="text-md font-medium text-emerald-800">
                  Category
                </label>
                <Select
                  value={postData.category}
                  onValueChange={(value) => handleChange({ target: { name: "category", value } } as any)}
                  required
                >
                  <SelectTrigger className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>

              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="image" className="text-md font-medium text-emerald-800">
                  Image
                </label>
                <Input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  required
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300"
                >
                  {loading ? "Submitting..." : "Add Post"}
                </Button>
              </motion.div>
            </form>

            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-100 border-red-400 text-red-700">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert variant="default" className="mt-4 bg-emerald-100 text-emerald-700 border-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>Post added successfully!</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddPosts;
