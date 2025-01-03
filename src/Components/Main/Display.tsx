'use client'

import { myAPI } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface Post {
  id: number
  title: string
  description: string
}

const Display = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myAPI('posts/getAll')
        if (Array.isArray(response)) {
          setPosts(response)
        } else if (response.data && Array.isArray(response.data)) {
          setPosts(response.data)
        } else {
          throw new Error('Invalid data format')
        }
      } catch (err) {
        console.error('Error fetching posts:', err)
        setError("Error fetching posts")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4 bg-red-50 rounded-md" role="alert">
        <span className="font-semibold">Error: </span>
        <span>{error}</span>
      </div>
    )
  }

  if (posts.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4 bg-gray-50 rounded-md" role="alert">
        <span>No posts available</span>
      </div>
    )
  }

  return (
    <div>
        <div>
            <p className='text-2xl font-big text-gray-600 uppercase tracking-wider'>Blogs</p>
        </div>
    <div className="bg-white shadow-sm rounded-lg overflow-hidden mt-5">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Post ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-blue-50 transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{post.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{post.title}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{post.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Display

