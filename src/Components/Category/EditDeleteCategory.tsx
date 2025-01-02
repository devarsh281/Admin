'use client'

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2, Trash2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { myAPI } from "@/lib/utils"

interface Category {
  id: string;
  name: string;
}

const EditDeleteCategory: React.FC<{ categoryId: string }> = ({ categoryId }) => {
  const [category, setCategory] = useState<Category | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await myAPI(`category/getcategory/${categoryId}`)
        setCategory(data)
      } catch  {
        setError("Failed to load data")
      }
    }

    fetchCategory()
  }, [categoryId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCategory((prevData) => prevData ? { ...prevData, [name]: value } : null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!category) return

    setError(null) 
    setSuccess(false)
    console.log("Submitting data for category:", category);

    try {
      await myAPI(`category/updatecategory/${categoryId}`, 'PUT',JSON.stringify( category)) 
      setSuccess(true)
    } catch  {
      setError("Failed to load data")
    }
  }

  const handleDelete = async () => {
    if (!category) return
    setError(null)
    setSuccess(false)

    try {
      await myAPI(`category/delcategory/${categoryId}`, "DELETE")
      setSuccess(true)
      setCategory(null) 
    } catch {
      setError("Failed to load data")
    }
  }

  if (!category && !error) return <div className="text-center py-4">Category Deleted</div>;
  if (error) return <div className="text-red-600 py-4">Error: {error}</div>;

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader >
          <CardTitle className="text-2xl font-bold text-center">Edit Category</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="name"
                placeholder="Category Name"
                aria-label="Category Name"
                onChange={handleChange}
                value={category?.name ?? ""}
                className="border-2  focus:ring-2 focus:ring-pink-200 bg-white placeholder-gray-400 text-gray-800"
                required
              />
            </div>
            <div className="flex space-x-4">
              <Button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                Update Category
              </Button>
              <Button
                type="button"
                onClick={handleDelete}
                className="w-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
              >
                <Trash2 className="mr-2" />
                Delete Category
              </Button>
            </div>
          </form>

          {success && (
            <Alert variant="default" className="mt-4 bg-green-100 border-green-400 text-green-700">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>successful!</AlertDescription>
            </Alert>
          )}
          {error && (
            <Alert variant="destructive" className="mt-4 bg-red-100 border-red-400 text-red-700">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}  

export default EditDeleteCategory
