import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("parentToken", token);
      navigate("/dashboard");
    }

    // else {
    //     navigate("/login"); // fallback if no token
    //   }
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-gray-700 text-lg">Redirecting...</p>
    </div>
  );
};

export default AuthCallback;
