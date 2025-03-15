import React from "react";
import { Link } from "react-router-dom";
import  { useNavigate } from "react-router-dom";
function Signup() {
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const nagigate = useNavigate();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Bắt đầu loading
    setError(null); // Xóa lỗi trước đó nếu có
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      nagigate('/login');
      setLoading(false);
      
      
    } catch (error) {
      setError("Đã có lỗi xảy ra!"); // Ghi nhận lỗi
      setLoading(false);
    }
  };

  return (
    <div className="text text-center flex flex-col gap-5 font-mono my-7 w-[40%] mx-auto border p-5 rounded-2xl">
      <h1 className="m-5 text-4xl font-bold">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-2xl"
          id="username"
          onChange={handleChange}
          disabled={loading} // Khóa input khi đang loading
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-2xl"
          id="email"
          onChange={handleChange}
          disabled={loading} // Khóa input khi đang loading
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-2xl"
          id="password"
          onChange={handleChange}
          disabled={loading} // Khóa input khi đang loading
        />
        <button
          type="submit"
          className="bg-slate-700 text-white p-3 rounded-2xl hover:bg-amber-700 hover:text-amber-50 cursor-pointer transition-colors 3s hover:border-blue-200"
          disabled={loading} // Khóa nút khi đang loading
        >
          {loading ? "Signing up..." : "Sign up"}{" "}
          {/* Hiển thị trạng thái loading */}
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}{" "}
      {/* Hiển thị lỗi nếu có */}
      <div className="flex gap-3 mt-4">
        <p>Have an account?</p>
        <Link to="/login" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
