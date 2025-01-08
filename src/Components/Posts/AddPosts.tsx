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
  // const [currentindex,setCurrentindex]

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
    <div className="container mx-auto p-4 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Add Post</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium text-gray-700">
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="title"
                value={postData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description
              </label>
              <Textarea
                id="description"
                name="description"
                value={postData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Category
              </label>
              <Select
                value={postData.category}
                onValueChange={(value) => handleChange({ target: { name: "category", value } } as any)}
                required
              >
                <SelectTrigger>
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
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium text-gray-700">
                Image
              </label>
              <Input
                type="file"
                id="image"
                name="image"
                onChange={handleFileChange}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Submitting..." : "Add Post"}
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert variant="default" className="mt-4 bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Post added successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddPosts;
