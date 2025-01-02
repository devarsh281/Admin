import { myAPI } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Post {
  id: string;
  title: string;
  description: string;
  category: string;
}

const EditDeletePost: React.FC<{ PostId: string }> = ({ PostId }) => {
  const [post, setPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

 useEffect(() => {
     const fetchCategories = async () => {
       try {
         const result = await myAPI("category/getAll");
         console.log("API Response:", result);
         if (result.data && Array.isArray(result.data)) {
           const categoryNames = result.data.map(
             (category: { name: string }) => category.name
           );
           console.log("Category Names:", categoryNames);
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
  
  

  useEffect(() => {
    if (!PostId) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await myAPI(`posts/getID/${PostId}`);
        setPost(data);
      } catch {
        setError("Failed to fetch the post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [PostId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPost((prevData) => (prevData ? { ...prevData, [name]: value } : null));
  };

  const handleCategoryChange = (value: string) => {
    setPost((prevData) => (prevData ? { ...prevData, category: value } : null));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await myAPI(`posts/updatepost/${PostId}`, "PUT", JSON.stringify(post));
      setSuccess(true);
    } catch {
      setError("Failed to update the post.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!post) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await myAPI(`posts/delpost/${PostId}`, "DELETE");
      setPost(null);
      setSuccess(true);
    } catch {
      setError("Failed to delete the post.");
    } finally {
      setLoading(false);
    }
  };

  if (!post && !loading && !error) {
    return <div className="text-center py-4">Post Deleted</div>;
  }

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Edit Post
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="title"
                placeholder="Post Title"
                aria-label="Post Title"
                onChange={handleChange}
                value={post?.title ?? ""}
                className="border-2 focus:ring-2 focus:ring-pink-200 bg-white placeholder-gray-400 text-gray-800"
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="text"
                name="description"
                placeholder="Post Description"
                aria-label="Post Description"
                onChange={handleChange}
                value={post?.description ?? ""}
                className="border-2 focus:ring-2 focus:ring-pink-200 bg-white placeholder-gray-400 text-gray-800"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Select
                value={post?.category}
                onValueChange={handleCategoryChange}
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

            <div className="flex space-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                {loading ? "Updating..." : "Update Post"}
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Trash2 className="mr-2" />
                {loading ? "Deleting..." : "Delete Post"}
              </Button>
            </div>
          </form>

          {success && (
            <Alert
              variant="default"
              className="mt-4 bg-green-100 border-green-400 text-green-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Success!</AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert
              variant="destructive"
              className="mt-4 bg-red-100 border-red-400 text-red-700"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EditDeletePost;
