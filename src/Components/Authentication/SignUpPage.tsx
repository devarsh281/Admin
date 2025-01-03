"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { myAPI } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface user {
  username: string;
  password: string;
}
const SignUpPage: React.FC = () => {
  const navigate=useNavigate();
  const [signUp, setsignUp] = useState<user>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

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

    try {
      const data = await myAPI("auth/register", "POST", JSON.stringify(signUp));
      console.log(data);

      
      setsignUp({ username: "", password: "" });
      alert('User Register Sucessfully')
      navigate("/")
    } catch {
      setError("Failed to Register User.");
    }
  };

  return (
    <div className="p-4">
      <Card className="w-full max-w-md mx-auto overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Register
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
                value={signUp.username}
                required
              />
            </div>
            <div className="space-y-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                value={signUp.password}
                required
              />
            </div>
            <Button type="submit">Register</Button>
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
         
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
