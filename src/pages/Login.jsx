import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged, getRedirectResult } from "firebase/auth";
import { signInWithGoogle } from "../lib/firebase";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result) {
          console.log("User signed in:", result.user);
          navigate("/");
        }
      } catch (error) {
        console.error("Redirect Sign-In Error:", error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User is already signed in:", user);
        navigate("/");
      }
    });

    checkRedirectResult();

    return () => unsubscribe();
  }, [auth, navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-sm w-full text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">LegalSutra</h1>
        <p className="text-gray-600 mb-6">Your trusted legal companion</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Sign in</h2>
        
        {/* Google Sign-In Button */}
        <button
          onClick={signInWithGoogle}
          className="w-full flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-300"
        >
          <img
            src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
            alt="Google Logo"
            className="w-5 h-5"
          />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
