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
import { Textarea } from "@/components/ui/textarea";

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
        console.log(data.id);
        
        setPost(data);
      } catch {
        setError("Failed to fetch the post data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [PostId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    <div className="p-4 bg-gradient-to-br from-emerald-100/10 to-teal-100/10 max-h-screen flex items-center justify-center">
      <Card className="w-full max-w-4xl mx-auto shadow-lg border-2 border-green-300">
        <CardHeader className="bg-gradient-to-br from-emerald-400 to-teal-300 ">
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center text-white">
            Edit Post
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm md:text-base font-medium text-amber-700"
              >
                Title
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Post Title"
                aria-label="Post Title"
                onChange={handleChange}
                value={post?.title ?? ""}
                className="w-full border-2 border-emerald-300 focus:ring-2 focus:ring-orange-300 bg-amber-50 placeholder-amber-400 text-amber-800"
                required
              />
            </div>
  
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm md:text-base font-medium text-amber-700"
              >
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Post Description"
                aria-label="Post Description"
                onChange={handleChange}
                value={post?.description ?? ""}
                className="w-full border-2 border-emerald-300 focus:ring-2 focus:ring-orange-300 bg-amber-50 placeholder-amber-400 text-amber-800"
                required
              />
            </div>
  
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm md:text-base font-medium text-amber-700"
              >
                Category
              </label>
              <Select
                value={post?.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger className="w-full border-2 border-emerald-300 focus:ring-2 focus:ring-orange-300 bg-amber-50 text-amber-800">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent className="bg-amber-50 border-amber-300">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-amber-800 hover:bg-amber-200"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
  
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Post"}
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
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
