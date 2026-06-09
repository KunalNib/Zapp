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
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useLocation, useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [loading, setLoading] = useState(false);

  const {email}=useParams();

  const submitHandler = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/verify-otp/${email}`,
        {
          otp,
          newPassword,
          confirmPassword
        }
      );

      if (res.data.success) {
        toast.success("Password reset successfully");

        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to reset password"
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
            Verify OTP
          </CardTitle>

          <CardDescription>
            Enter OTP sent to your email and create a new password.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-4">
            <div>
              <Label>OTP</Label>

              <Input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>

            <div>
              <Label>New Password</Label>

              <div className="relative">
                <Input
                  type={showPassword1 ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) =>
                    setNewPassword(e.target.value)
                  }
                />

                {showPassword1 ? (
                  <EyeOff
                    className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
                    onClick={() =>
                      setShowPassword1(!showPassword1)
                    }
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
                    onClick={() =>
                      setShowPassword1(!showPassword1)
                    }
                  />
                )}
              </div>
            </div>

            <div>
              <Label>Confirm Password</Label>

              <div className="relative">
                <Input
                  type={showPassword2 ? "text" : "password"}
                  placeholder="New Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

                {showPassword2 ? (
                  <EyeOff
                    className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
                    onClick={() =>
                      setShowPassword2(!showPassword2)
                    }
                  />
                ) : (
                  <Eye
                    className="absolute right-3 top-3 h-4 w-4 cursor-pointer"
                    onClick={() =>
                      setShowPassword2(!showPassword2)
                    }
                  />
                )}
              </div>
            </div>
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
                Updating...
              </>
            ) : (
              "Reset Password"
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

export default VerifyOtp;