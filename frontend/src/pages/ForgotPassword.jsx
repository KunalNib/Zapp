import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/forgot-password`,
        { email }
      );

      if (res.data.success) {
        toast.success("OTP sent to your email");

        navigate(`verify-otp/${email}`, {
          state: { email },
        });
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to send OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-blue-400">
            Forgot Password
          </CardTitle>

          <CardDescription>
            Enter your registered email address.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid gap-2">
            <Label>Email</Label>

            <Input
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={submitHandler}
            className="w-full bg-blue-600 hover:bg-blue-900"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              "Send OTP"
            )}
          </Button>

          <Link
            to="/login"
            className="text-blue-900 hover:underline"
          >
            Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;