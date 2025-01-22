"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { myAPI } from "@/lib/utils";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface user {
  username: string;
  password: string;
}
const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const [signUp, setsignUp] = useState<user>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsignUp((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const data = await myAPI("auth/register", "POST", JSON.stringify(signUp));
      console.log(data);

      setsignUp({ username: "", password: "" });
      navigate("/");
    } catch {
      setError("Failed to Register User.");
    }
  };

  return (
    <div className="p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-2xl bg-white/80 backdrop-filter backdrop-blur-lg">
        <CardHeader className="bg-gradient-to-r from-cyan-200 via-blue-400 to-indigo-500 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">
            Create Account
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
                placeholder="User Name"
                onChange={handleChange}
                value={signUp.username}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                required
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
                value={signUp.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                required
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan-200 via-blue-400 to-indigo-500"
              >
                Register
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
                <AlertDescription>
                  Login successful! Redirecting...
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
