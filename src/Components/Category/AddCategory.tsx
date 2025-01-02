"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { myAPI } from "@/lib/utils";

interface AddCategory {
  name: string;
}

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState<AddCategory>({
    name: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const data = await myAPI(
        "category/addcategory",
        "POST",
        JSON.stringify(category)
      );
      console.log(data);

      setSuccess(true);
      setCategory({ name: "" });
    } catch {
      setError("Failed to fetch the Post Category.");
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Category Name"
                onChange={handleChange}
                value={category.name}
                required
              />
            </div>
            <Button type="submit">Add Category</Button>
          </form>

          {error && (
            <Alert
              variant="destructive"
              className="mt-4 bg-red-100 border-red-400 text-red-700"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert
              variant="default"
              className="mt-4 bg-green-100 border-green-400 text-green-700"
            >
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Category added successfully!</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AddCategory;
