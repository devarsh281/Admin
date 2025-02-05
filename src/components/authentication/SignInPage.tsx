import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { myAPI } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface user {
  username: string;
  password: string;
}

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const [signIn, setsignIn] = useState<user>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsignIn((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const data = await myAPI("auth/log", "POST", JSON.stringify(signIn));
      console.log(data);
      setsignIn({ username: "", password: "" });
      setSuccess(true);
      setTimeout(() => {
        navigate("/dashboard/display");
      }, 2000);
    } catch {
      setError("Failed to Login.");
    }
  };

  return (
    <div className="max-h-screen max-w-7xl flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl bg-white/80 backdrop-filter backdrop-blur-lg">
          <CardHeader className="bg-gradient-to-r from-teal-300 to-cyan-300 text-white p-6">
            <CardTitle className="text-3xl font-bold text-center">
              Welcome Back
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={handleChange}
                  value={signIn.username}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>
              <motion.div
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <Input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={handleChange}
                  value={signIn.password}
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-300 to-blue-300 hover:from-teal-600 hover:to-blue-400 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Login
                </Button>
              </motion.div>
            </form>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Alert
                  variant="destructive"
                  className="mt-4 bg-red-100 border-red-400 text-red-700 rounded-lg"
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
                transition={{ duration: 0.5 }}
              >
                <Alert className="mt-4 bg-green-100 border-green-400 text-green-700 rounded-lg">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertDescription>Login successful! Redirecting...</AlertDescription>
                </Alert>
              </motion.div>
            )}

            <motion.div
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <p className="text-gray-600">
                Not a User?{" "}
                <Button
                  asChild
                  className="bg-gradient-to-r from-blue-200 to-teal-200 hover:from-blue-500 hover:to-cyan-500 text-white hover:text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 ml-2"
                >
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignInPage;

