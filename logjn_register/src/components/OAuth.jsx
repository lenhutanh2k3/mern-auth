import React from "react";
import "../assets/google-logo.png";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../../api/firebase.js";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../redux/user/user.jsx";
function OAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      navigate("/");
      dispatch(loginSuccess(data));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleGoogle}
      className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold cursor-pointer hover:text-white p-3 border border-blue-500 hover:border-transparent rounded-xl transition-colors duration-150"
    >
      Login with Google
    </button>
  );
}

export default OAuth;
