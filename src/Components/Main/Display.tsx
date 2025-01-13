import { myAPI } from "@/lib/utils";
import  { useEffect, useState } from "react";
import {
  Loader2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Calendar,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Post {
  id: number;
  title: string;
  description: string;
  views: number;
  date: string;
  category: string;
}

interface Analyze {
  total: number;
}

const Display = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [analysis, setAnalysis] = useState<Analyze | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const postsPerPage = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myAPI("posts/getAll");
        if (Array.isArray(response)) {
          setPosts(response);
        } else if (response.data && Array.isArray(response.data)) {
          setPosts(response.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Error fetching posts");
      } finally {
        setLoading(false);
      }
    };

    const fetchAnalysis = async () => {
      try {
        const response = await myAPI("analysis/analytics");
        setAnalysis(response);
      } catch (err) {
        console.error("Error fetching analysis:", err);
        setError("Error fetching analysis");
      }
    };

    fetchData();
    fetchAnalysis();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await myAPI("category/getAll");
        if (Array.isArray(response.data)) {
          const categoryNames = response.data.map(
            (category: { name: string }) => category.name
          );
          setCategory(categoryNames);
        } else {
          console.error("No Category", response);
        }
      } catch {
        setError("Error fetching category");
      }
    };
    fetchCategory();
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }

    setFilteredPosts(filtered);
  }, [searchQuery, selectedCategory, posts]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent>
          <div className="text-destructive text-center py-8" role="alert">
            <span className="font-semibold text-xl">Error: </span>
            <span className="text-lg">{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
  };
  const totalBlogs = analysis && "total" in analysis ? analysis.total : 0;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen max-w-screen rounded"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h2 className="text-4xl font-bold text-indigo-800 mb-4 md:mb-0">
            Latest Blogs
          </h2>
          <p className="text-xl text-indigo-600 bg-white px-6 py-3 rounded-full shadow-lg">
            Total Blogs: {totalBlogs}
          </p>
        </div>

        {/* Search and Category Dropdown Section */}
        <div className="bg-gray-200 rounded-lg shadow-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative flex-grow text">
              <input
                type="text"
                placeholder="Search by title or description..."
                className="w-full px-4 py-2 pl-10 border-2 border-emerald-200 focus:ring-2 focus:ring-orange-300 bg-amber-50 placeholder-amber-400 text-amber-800 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-amber-400" />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger className="w-full md:w-[200px] text-lg border-2 border-emerald-300 focus:ring-2 focus:ring-orange-300 bg-amber-50 text-amber-800 rounded-lg">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {category.map((categories) => (
                  <SelectItem key={categories} value={categories}>
                    {categories}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Posts Section */}
        {filteredPosts.length === 0 ? (
          <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardContent>
              <div
                className="text-muted-foreground text-center py-8 text-xl"
                role="alert"
              >
                <span>No posts available</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
            initial="hidden"
            animate="show"
          >
            {currentPosts.map((post) => (
              <motion.div
                key={post.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <Card className="mt-5 flex flex-col justify-between h-[350px] hover:shadow-xl transition-shadow duration-300 bg-white">
                  <CardHeader className="bg-gradient-to-r from-pink-300 via-red-300 to-orange-300 text-white rounded-t-lg">
                    <CardTitle className="text-xl font-bold line-clamp-2 text-black/65">
                      {post.title}
                    </CardTitle>
                    <div className="flex items-center text-sm mt-2 text-black/50">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{formatDate(post.date)}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow overflow-hidden p-4">
                    <p className="text-gray-600 line-clamp-4">
                      {post.description}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center  p-4">
                    <div className="flex items-center text-gray-500">
                      <Eye className="w-4 h-4 mr-1" />
                      <span className="text-sm">{post.views} views</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/post/${post.id}`)}
                      className="bg-gradient-to-r from-orange-200 via-red-200 to-pink-200 text-black hover:from-pink-400 hover:via-red-400 hover:to-orange-400 transition-all duration-300 hover:text-white"
                    >
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-white hover:bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 border-2 border-indigo-400 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <span className="text-lg font-semibold text-indigo-800">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="bg-white hover:bg-indigo-100 text-indigo-800 font-semibold py-2 px-4 border-2 border-indigo-400 rounded-full shadow-md transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default Display;
