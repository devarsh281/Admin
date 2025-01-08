"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { myAPI } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface user {
  username: string;
  password: string;
}
const SignInPage: React.FC = () => {
  const navigate=useNavigate();
  const [signIn, setsignIn] = useState<user>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

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

    try {
      const data = await myAPI("auth/log", "POST", JSON.stringify(signIn));
      console.log(data);
      setsignIn({ username: "", password: "" });
      navigate("/dashboard/display")
    } catch {
      setError("Failed to Login.");
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="text"
                name="username"
                placeholder="User Name"
                onChange={handleChange}
                value={signIn.username}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={signIn.password}
                required
              />
            </div>
            <Button type="submit">Login</Button>
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
          <div className="mt-5">
            Not a User ? <Button className="h-8 bg-gray-300"><Link to='/signup' className="text-white hover:text-white">SignUp</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignInPage;
