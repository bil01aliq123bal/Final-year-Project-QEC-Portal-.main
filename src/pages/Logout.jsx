import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the loginData token from localStorage
    localStorage.removeItem("loginData");

    // Show a success message
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 3000,
    });

    // Redirect to the homepage
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-white font-medium text-sm md:text-base bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2"
    >
      Logout
    </button>
  );
};

export default Logout;