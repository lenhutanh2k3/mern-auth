import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailed,
} from "../redux/user/user.jsx";
import OAuth from "../components/OAuth.jsx";
function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const {error,loading}=useSelector((state) => state.user);
  const nagigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(loginFailed(data.message));
        return;
      }
      nagigate("/");
      dispatch(loginSuccess(data));
    } catch (error) {
      dispatch(loginFailed(error.message));
    }
  };
  return (
    <div className="text text-center flex flex-col gap-5 font-mono my-7 w-[40%] mx-auto border p-5 rounded-2xl">
      <h1 className="m-5 text-4xl font-bold">Log in</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
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
        <OAuth/>
      </form>

      {/* Hiển thị lỗi nếu có */}
      <div className="flex gap-3 mt-4">
        <p>Don't have an account?</p>
        <Link to="/sign-up" className="text-blue-500 hover:text-blue-700">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Login;
