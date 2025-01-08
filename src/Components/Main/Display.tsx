'use client'

import { myAPI } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import BlogPostModal from './BlogPostModel'

interface Post {
  id: number
  title: string
  description: string
  views: number
  date: string
}

interface Analyze {
  total: number
}

const Display = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [analysis, setAnalysis] = useState<Analyze | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const postsPerPage = 6

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
        setError('Error fetching posts')
      } finally {
        setLoading(false)
      }
    }

    const fetchAnalysis = async () => {
      try {
        const response = await myAPI('analysis/analytics')
        setAnalysis(response)
      } catch (err) {
        console.error('Error fetching analysis:', err)
        setError('Error fetching analysis')
      }
    }

    fetchData()
    fetchAnalysis()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="w-full">
        <CardContent>
          <div className="text-destructive text-center py-4" role="alert">
            <span className="font-semibold">Error: </span>
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (posts.length === 0) {
    return (
      <Card className="w-full">
        <CardContent>
          <div className="text-muted-foreground text-center py-4" role="alert">
            <span>No posts available</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const totalBlogs = analysis && 'total' in analysis ? analysis.total : 0
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(posts.length / postsPerPage)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-foreground">Latest Blogs</h2>
        <p className="text-lg text-muted-foreground">
          Total Blogs: {totalBlogs}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <Card key={post.id} className="flex flex-col justify-between h-[300px]">
            <CardHeader>
              <CardTitle className="text-lg font-medium line-clamp-2">{post.title}</CardTitle>
              <span className="text-sm text-muted-foreground text-left">{formatDate(post.date)}</span>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <p className="text-muted-foreground line-clamp-4">{post.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">{post.views} views</span>
              <Button variant="outline" size="sm" onClick={() => setSelectedPost(post)}>
                Read More
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center items-center space-x-2 mt-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <BlogPostModal
        isOpen={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        post={selectedPost}
      />
    </div>
  )
}

export default Display

