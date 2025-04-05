import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../lib/firebase";
import { User } from "lucide-react"; 

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">LegalSutra</h1>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="mr-4">{user.displayName}</span>
            <Link
              to="/profile"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition"
            >
              <User className="mr-1 h-5 w-5" />
              Profile
            </Link>
            <button
              onClick={logout}
              className="bg-red-500 px-4 py-2 rounded text-white hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;