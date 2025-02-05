import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface BlogPostModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    title: string
    date:string
    description: string
    views: number
  } | null
}

const BlogPostModal: React.FC<BlogPostModalProps> = ({ isOpen, onClose, post }) => {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{post.title}</DialogTitle>
          <DialogDescription>Views: {post.views}</DialogDescription>
          <DialogDescription>Date: {new Date(post.date).toLocaleDateString()}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="mt-2 max-h-[60vh]">
          <p className="text-muted-foreground">{post.description}</p>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default BlogPostModal

