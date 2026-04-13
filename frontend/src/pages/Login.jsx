import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { loginUser } from "../utils/api";
import RecordLogo from "../components/RecordLogo";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await loginUser(formData);
      // Store token and user info
      localStorage.setItem("record_token", data.data.token);
      localStorage.setItem("record_user", JSON.stringify(data.data));
      toast.success(data.message || "Login successful!");
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-bg min-h-screen flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 px-8 py-10 sm:px-10 sm:py-12">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <RecordLogo size="large" />
          </div>

          {/* Heading */}
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-1">
            Sign in to Record!
          </h1>
          <p className="text-gray-500 text-center mb-8 text-sm">
            Let's open your skill repository.
          </p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 text-sm placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-record-orange/20 focus:border-record-orange ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-3.5 bg-gray-50 border rounded-lg text-gray-900 text-sm placeholder-gray-400 transition-all duration-200 focus:ring-2 focus:ring-record-orange/20 focus:border-record-orange pr-12 ${
                    errors.password ? "border-red-400" : "border-gray-200"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              id="login-submit-btn"
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-record-orange hover:bg-record-orange-dark text-white font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md shadow-record-orange/20 hover:shadow-lg hover:shadow-record-orange/30 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Signing in...
                </>
              ) : (
                "Login to Record"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 text-center">
            <p className="text-sm text-gray-400">
              Do you have an account?{" "}
              <Link
                to="/signup"
                className="text-record-orange hover:text-record-orange-dark font-medium transition-colors"
              >
                Create account.
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">
            © Record.{" "}
            <span className="font-semibold text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
              Privacy Policy
            </span>{" "}
            |{" "}
            <span className="font-semibold text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">
              Terms of Service
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
