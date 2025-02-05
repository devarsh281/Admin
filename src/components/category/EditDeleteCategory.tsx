import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Trash2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { myAPI } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
}

const EditDeleteCategory: React.FC<{ categoryId: string }> = ({
  categoryId,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setLoading(true);
        const data = await myAPI(`category/getcategory/${categoryId}`);
        setCategory(data);
      } catch {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevData) =>
      prevData ? { ...prevData, [name]: value } : null
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await myAPI(
        `category/updatecategory/${categoryId}`,
        "PUT",
        JSON.stringify(category)
      );
      setSuccess(true);
    } catch {
      setError("Failed to update category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!category) return;

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await myAPI(`category/delcategory/${categoryId}`, "DELETE");
      setSuccess(true);
      setCategory(null);
    } catch {
      setError("Failed to delete category");
    } finally {
      setLoading(false);
    }
  };

  if (!category && !loading && !error)
    return <div className="text-center py-4">Category Deleted</div>;
  if (error) return <div className="text-red-600 py-4">Error: {error}</div>;

  return (
    <div className="p-4 bg-gradient-to-br from-emerald-100/10 to-teal-100/10 max-h-screen flex items-center justify-center">
      <Card className="w-full min-w-2xl sm:max-w-2xl md:max-w-4xl mx-auto shadow-lg border-2 border-green-300">
        <CardHeader className="bg-gradient-to-br from-emerald-400 to-teal-300">
          <CardTitle className="text-lg md:text-xl lg:text-2xl font-bold text-center text-white">
            Edit Category
          </CardTitle>
        </CardHeader>
        <CardContent className="bg-white p-4 sm:p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="block text-sm md:text-base font-medium text-amber-700"
              >
                Category
              </label>
              <Input
                type="text"
                name="name"
                placeholder="Category Name"
                aria-label="Category Name"
                onChange={handleChange}
                value={category ? category.name : ""}
                className="w-full border-2 border-emerald-300 focus:ring-2 focus:ring-orange-300 bg-amber-50 placeholder-amber-400 text-amber-800"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? "Updating..." : "Update Category"}
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              >
                <Trash2 className="mr-2" />
                {loading ? "Deleting..." : "Delete Category"}
              </Button>
            </div>
          </form>

          {success && (
            <Alert
              variant="default"
              className="mt-4 bg-green-100 border-green-400 text-green-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Successful!</AlertDescription>
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

export default EditDeleteCategory;
