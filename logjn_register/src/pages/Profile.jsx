import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} from "../redux/user/user";

function Profile() {
  const { userCurrent } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(userCurrent);
  // Khởi tạo formData với dữ liệu từ userCurrent
  const [formData, setFormData] = useState({
    username: userCurrent?.username || "",
    email: userCurrent?.email || "",
    password: "",
  });

  // Cập nhật formData khi giá trị trong form thay đổi
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateUserStart());

    // Tạo object mới chỉ chứa các trường cần thiết
    const updatedData = {
      username: formData.username,
      email: formData.email,
    };

    // Kiểm tra nếu có password mới thì thêm vào object update
    if (formData.password) {
      updatedData.password = formData.password;
    }

    try {
      const res = await fetch(
        `http://localhost:5000/api/user/${userCurrent._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
          credentials: "include",
        }
      );
      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailed(data.message));
        return;
      }

      // Chỉ lấy phần `others` từ response để dispatch thành công
      dispatch(updateUserSuccess(data.others));
    } catch (error) {
      dispatch(updateUserFailed(error.message));
    }

  };

  useEffect(() => {
    // Khởi tạo formData với dữ liệu từ userCurrent khi component được render lần đầu
    setFormData({
      username: userCurrent?.username || "",
      email: userCurrent?.email || "",
      password: "",
    });
  }, [userCurrent]);

  return (
    <>
      <h1 className="m-5 text-4xl font-bold text-center">Profile</h1>
      <div className="p-4 max-w-lg mx-auto border-2 border-gray-300 rounded-lg">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <img
            src={userCurrent.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto cursor-pointer"
          />

          <input
            type="text"
            placeholder="username"
            value={formData.username}
            className="border p-3 rounded-2xl w-full"
            id="username"
            onChange={handleChange}
          />

          <input
            type="email"
            placeholder="email"
            value={formData.email}
            className="border p-3 rounded-2xl"
            id="email"
            onChange={handleChange}
          />

          <input
            type="password"
            placeholder="password"
            value={formData.password}
            className="border p-3 rounded-2xl"
            id="password"
            onChange={handleChange}
          />

          <button
            type="submit"
            className="bg-slate-700 text-white p-3 rounded-2xl hover:bg-amber-700 hover:text-amber-50 cursor-pointer transition-colors 3s hover:border-blue-200"
          >
            Update
          </button>
        </form>

        <div className="flex justify-between text-red-700 mt-5">
          <p className="cursor-pointer hover:text-red-950 transition-colors 3s">
            Delete Account
          </p>
          <p className="cursor-pointer hover:text-red-950 transition-colors 3s">
            Sign out
          </p>
        </div>
      </div>
    </>
  );
}

export default Profile;
