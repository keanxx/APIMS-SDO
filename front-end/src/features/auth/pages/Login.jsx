import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Mail, ArrowLeft, Loader2, Eye, EyeOff } from "lucide-react";
import Landing from "../components/Landing";
import { useAuth } from "../components/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [activeTab, setActiveTab] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Loading states
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isSendingReset, setIsSendingReset] = useState(false);

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const [loginData, setLoginData] = useState({
    employee_id: "",
    password: "",
  });

  const [signupData, setSignupData] = useState({
    employee_id: "",
    password: "",
  });

  const [forgotEmail, setForgotEmail] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  // ✅ INPUT HANDLERS
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.id]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.id]: e.target.value });
  };

  // ✅ REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);

    try {
      const res = await axios.post(`${API_URL}/auth/register`, signupData);

      if (res.status === 200 || res.status === 201) {
        alert("Registration successful! Please log in.");
        setSignupData({ employee_id: "", password: "" });
        setActiveTab("login");
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Registration failed.");
    } finally {
      setIsSigningUp(false);
    }
  };

  // ✅ LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const res = await axios.post(`${API_URL}/auth/signin/`, loginData);

      if (res.status === 200) {
        const { access_token, hr_role, employee_id } = res.data;

        // ✅ Use context login instead of localStorage directly
        login(access_token, hr_role, employee_id, { employee_id });

        // Redirect based on role
        if (hr_role === "user") {
          navigate("/user/dashboard");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error?.response?.data?.detail || "Login failed.");
      setIsLoggingIn(false);
    }
  };

  // ✅ FORGOT PASSWORD
  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsSendingReset(true);

    try {
      const res = await axios.post(`${API_URL}/auth/forgot-password`, {
        email: forgotEmail,
      });

      if (res.status === 200) {
        setResetEmailSent(true);
      }
    } catch (error) {
      alert(error?.response?.data?.message || "Failed to send reset link.");
    } finally {
      setIsSendingReset(false);
    }
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setResetEmailSent(false);
    setForgotEmail("");
  };

  const inputClassName =
    "bg-[#f3f7f3] border-[#2d5f2e]/20 focus-visible:!border-[#2d5f2e]";

  const buttonClassName =
    "w-full bg-gradient-to-r from-[#2d5f2e] to-[#3a7a3c] hover:from-[#3a7a3c] hover:to-[#4a9a4d] text-white shadow-md shadow-[#2d5f2e]/20 transition-all";

  const tabTriggerClassName =
    "data-[state=active]:bg-gradient-to-br data-[state=active]:from-[#2d5f2e] data-[state=active]:to-[#3a7a3c] data-[state=active]:text-white";

  return (
    <div className="flex h-[100vh] w-full">
      {/* LEFT */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#2d5f2e] via-[#3a7a3c] to-[#4a9a4d] p-12 flex-col justify-center text-white">
        <Landing />
      </div>

      {/* RIGHT */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {!showForgotPassword ? (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Get Started
                </h2>
                <p className="text-gray-600">
                  Create an account or sign in to continue
                </p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full mb-6 bg-white border border-[#2d5f2e]/15 p-1">
                  <TabsTrigger value="login" className={tabTriggerClassName}>
                    Log in
                  </TabsTrigger>
                  <TabsTrigger value="signup" className={tabTriggerClassName}>
                    Sign up
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <Card>
                    <CardContent className="pt-6">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                          <Label>Employee ID</Label>
                          <Input
                            id="employee_id"
                            value={loginData.employee_id}
                            onChange={handleLoginChange}
                            className={inputClassName}
                            disabled={isLoggingIn}
                            required
                          />
                        </div>

                        <div>
                          <Label>Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showLoginPassword ? "text" : "password"}
                              value={loginData.password}
                              onChange={handleLoginChange}
                              className={`${inputClassName} pr-10`}
                              disabled={isLoggingIn}
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowLoginPassword(!showLoginPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              disabled={isLoggingIn}
                            >
                              {showLoginPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className={buttonClassName}
                          disabled={isLoggingIn}
                        >
                          {isLoggingIn ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Logging in...
                            </>
                          ) : (
                            "Log in"
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="ghost"
                          className="w-full text-[#2d5f2e]"
                          onClick={() => setShowForgotPassword(true)}
                          disabled={isLoggingIn}
                        >
                          Forgot Password?
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <Card>
                    <CardContent className="pt-6">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div>
                          <Label>Employee ID</Label>
                          <Input
                            id="employee_id"
                            value={signupData.employee_id}
                            onChange={handleSignupChange}
                            className={inputClassName}
                            disabled={isSigningUp}
                            required
                          />
                        </div>

                        <div>
                          <Label>Password</Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showSignupPassword ? "text" : "password"}
                              value={signupData.password}
                              onChange={handleSignupChange}
                              className={`${inputClassName} pr-10`}
                              disabled={isSigningUp}
                              required
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowSignupPassword(!showSignupPassword)
                              }
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                              disabled={isSigningUp}
                            >
                              {showSignupPassword ? (
                                <EyeOff className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className={buttonClassName}
                          disabled={isSigningUp}
                        >
                          {isSigningUp ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Signing up...
                            </>
                          ) : (
                            "Sign up"
                          )}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <>
              {/* FORGOT PASSWORD */}
              <div className="py-7">
                <h2 className="text-[#1a2e1a] mb-2">Reset Password</h2>
                <p className="text-[#5a6c5a]">
                  Enter your email to receive a password reset link
                </p>
              </div>
              <Card>
                <form
                  onSubmit={handleForgotPasswordSubmit}
                  className="p-6 space-y-4"
                >
                  {!resetEmailSent ? (
                    <>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        disabled={isSendingReset}
                        required
                        className={inputClassName}
                      />

                      <Button
                        type="submit"
                        className={buttonClassName}
                        disabled={isSendingReset}
                      >
                        {isSendingReset ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          "Send Reset Link"
                        )}
                      </Button>
                    </>
                  ) : (
                    <div className="text-center space-y-4">
                      <Mail className="mx-auto text-[#2d5f2e]" />
                      <p>Check your email for the reset link.</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    variant="ghost"
                    className="w-full"
                    onClick={handleBackToLogin}
                    disabled={isSendingReset}
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                  </Button>
                </form>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
