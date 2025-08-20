import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users")) || [];
      const foundUser = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (foundUser) {
        localStorage.setItem("user", JSON.stringify(foundUser));
        toast.success(`Welcome back, ${foundUser.name}!`);
        navigate("/onboarding");
      } else {
        toast.error("Invalid email or password");
      }

      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-indigo-100"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-10 h-10 grid place-items-center rounded-full bg-indigo-100">
            <LogIn className="w-5 h-5 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
              Email
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 transition duration-200">
              <Mail className="w-4 h-4 opacity-70" />
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full bg-transparent outline-none text-sm"
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex items-center gap-2 rounded-xl border border-gray-300 px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-400 transition duration-200">
              <Lock className="w-4 h-4 opacity-70" />
              <input
                id="password"
                type={showPwd ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={onChange}
                placeholder="••••••••"
                className="w-full bg-transparent outline-none text-sm"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPwd((s) => !s)}
                className="p-1 opacity-70 hover:opacity-100"
              >
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:opacity-90 transition duration-300 transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-600 mt-6 text-center">
          Don't have an account?{" "}
          <Link className="text-indigo-600 font-medium hover:underline" to="/signup">
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}