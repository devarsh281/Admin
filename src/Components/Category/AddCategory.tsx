"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { myAPI } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <Card className="bg-gradient-to-br from-emerald-100/20 to-teal-100/20 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl font-bold text-center">
            Add Category
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
              <label
                htmlFor="title"
                className="text-md font-medium text-emerald-800"
              >
                Title
              </label>
              <Input
                type="text"
                id="title"
                name="name"
                value={category.name}
                onChange={handleChange}
                required
                className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white transition-all duration-300"
                >
                <Plus className="mr-2 h-5 w-5" /> Add Category
              </Button>
            </motion.div>
          </form>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  variant="destructive"
                  className="mt-4 bg-red-400/20 border-red-500 text-white"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Alert
                  variant="default"
                  className="mt-4 bg-green-400/20 border-green-500 text-black"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>
                    Category added successfully!
                  </AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AddCategory;
