import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";

function Profile() {
  const { userCurrent } = useSelector((state) => state.user);

  return (
    <>
      <h1 className="m-5 text-4xl font-bold text-center">Profile</h1>
      <div className="p-4 max-w-lg mx-auto  border-2 border-gray-300 rounded-lg ">
        <form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <img
            src={userCurrent.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto cursor-pointer"
          />

        
          <input
            type="text"
            placeholder="username"
            value={userCurrent.username}
            className="border p-3 rounded-2xl w-full"
            id="username"
          />
          <input
            type="email"
            placeholder="email"
            value={userCurrent.email}
            className="border p-3 rounded-2xl"
            id="email"
          />
          <input
            type="password"
            placeholder="password"
            className="border p-3 rounded-2xl"
            id="password"
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
