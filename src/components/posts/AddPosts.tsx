import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { myAPI } from "@/lib/utils"
import { motion } from "framer-motion"
import { Editor } from "@tinymce/tinymce-react"

interface PostData {
  title: string
  description: string
  category: string
}

const AddPosts: React.FC = () => {
  const [postData, setPostData] = useState<PostData>({
    title: "",
    description: "",
    category: "",
  })
  const [loading, setLoading] = useState(false)
  const [categories, setCategories] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await myAPI("category/getAll")
        if (result.data && Array.isArray(result.data)) {
          setCategories(result.data.map((category: { name: string }) => category.name))
        } else {
          throw new Error("Invalid category data received.")
        }
      } catch (err) {
        console.error("Error fetching categories:", err)
      }
    }

    fetchCategories()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPostData((prev) => ({ ...prev, [name]: value }))
  }

  const handleEditorChange = (content: string) => {
    setPostData((prev) => ({ ...prev, description: content }))
  }

  const handleImageUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("http://localhost:8081/posts/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`Failed to upload image. Status: ${response.status}`)
      }

      const data = await response.json()
      if (data.location) {
        const cleanLocation = data.location.replace(/^\/uploads\//, "")
        const imageUrl = data.location.startsWith("http")
          ? data.location
          : `http://localhost:8081/posts/getimage/${cleanLocation}`
        return imageUrl
      } else {
        throw new Error("No image URL in the response.")
      }
    } catch (err) {
      console.error("Error uploading image:", err)
      alert("Image upload failed. Please try again.")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const response = await myAPI("posts/addpost", "POST", JSON.stringify(postData))

      if (!response.ok) {
        throw new Error("Failed to submit the post.")
      }

      setSuccess(true)
      setPostData({ title: "", description: "", category: "" })
    } catch  {
      setError("Failed to submit data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen max-w-md">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Card className="bg-gradient-to-br from-emerald-100/20 to-teal-100/20 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl font-bold text-center">Add Post</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Title Input */}
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
                  disabled={loading}
                  className="border-emerald-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </motion.div>

              {/* Description Input */}
              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="description" className="text-md font-medium text-emerald-800">
                  Description
                </label>
                <Editor
                  apiKey="g333xllon02vrlqeoxj08kt6kkcm20h4sxyp8pj2sc5ehle0"
                  value={postData.description}
                  onEditorChange={handleEditorChange}
                  init={{
                    height: 400,
                    menubar: false,
                    plugins: ["image", "link", "lists", "advlist", "textcolor", "align"],
                    toolbar: "undo redo | formatselect | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist | link image",
                    file_picker_types: "image",
                    images_upload_url: "http://localhost:8081/posts/upload-image",
                    file_picker_callback: (callback,_value, meta) => {
                      if (meta.filetype === "image") {
                        const input = document.createElement("input")
                        input.type = "file"
                        input.accept = "image/*"
                        input.onchange = async () => {
                          const file = input.files?.[0]
                          if (file) {
                            try {
                              const imageUrl = await handleImageUpload(file)
                              callback(imageUrl, { alt: file.name })
                            } catch (err) {
                              console.error("Image upload failed:", err)
                              alert("Image upload failed. Please try again.")
                            }
                          }
                        }

                        input.click()
                      }
                    },
                  }}
                />
              </motion.div>

              {/* Category Select */}
              <motion.div className="space-y-2" whileHover={{ scale: 1.02 }}>
                <label htmlFor="category" className="text-md font-medium text-emerald-800">
                  Category
                </label>
                <Select
                  value={postData.category}
                  onValueChange={(value) => setPostData((prev) => ({ ...prev, category: value }))}
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

              {/* Submit Button */}
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

            {/* Success Alert */}
            {success && (
              <Alert variant="default" className="mt-4 bg-green-100 border-green-500 text-green-800">
                <CheckCircle2 className="h-4 w-4 mr-2" />
                <AlertDescription>Post submitted successfully!</AlertDescription>
              </Alert>
            )}
            {error && (
              <Alert variant="destructive" className="mt-4 bg-red-100 border-red-500 text-red-800">
                <AlertCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default AddPosts

