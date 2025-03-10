// "use client"

// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext"
// import { useState } from "react"
// import { Menu, X, User, Home, Upload, LogOut } from "lucide-react"

// const Navbar = () => {
//   const { currentUser, logout } = useAuth()
//   const navigate = useNavigate()
//   const [isOpen, setIsOpen] = useState(false)

//   const handleLogout = () => {
//     logout()
//     navigate("/login")
//   }

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex">
//             <div className="flex-shrink-0 flex items-center">
//               <Link to="/" className="text-2xl font-bold text-indigo-600">
//                 LegalSutra
//               </Link>
//             </div>
//             <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
//               <Link
//                 to="/"
//                 className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-gray-900"
//               >
//                 <Home className="mr-1 h-4 w-4" />
//                 Home
//               </Link>
//               <Link
//                 to="/upload"
//                 className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               >
//                 <Upload className="mr-1 h-4 w-4" />
//                 Upload
//               </Link>
//               <Link
//                 to="/profile"
//                 className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
//               >
//                 <User className="mr-1 h-4 w-4" />
//                 Profile
//               </Link>
//             </div>
//           </div>
//           <div className="hidden sm:ml-6 sm:flex sm:items-center">
//             <button
//               onClick={handleLogout}
//               className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//             >
//               <LogOut className="mr-1 h-4 w-4" />
//               Logout
//             </button>
//           </div>
//           <div className="-mr-2 flex items-center sm:hidden">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
//             >
//               <span className="sr-only">Open main menu</span>
//               {isOpen ? (
//                 <X className="block h-6 w-6" aria-hidden="true" />
//               ) : (
//                 <Menu className="block h-6 w-6" aria-hidden="true" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isOpen && (
//         <div className="sm:hidden">
//           <div className="pt-2 pb-3 space-y-1">
//             <Link
//               to="/"
//               className="block pl-3 pr-4 py-2 border-l-4 border-indigo-500 text-base font-medium text-indigo-700 bg-indigo-50"
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <Home className="mr-2 h-5 w-5" />
//                 Home
//               </div>
//             </Link>
//             <Link
//               to="/upload"
//               className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <Upload className="mr-2 h-5 w-5" />
//                 Upload
//               </div>
//             </Link>
//             <Link
//               to="/profile"
//               className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//               onClick={() => setIsOpen(false)}
//             >
//               <div className="flex items-center">
//                 <User className="mr-2 h-5 w-5" />
//                 Profile
//               </div>
//             </Link>
//             <button
//               onClick={() => {
//                 handleLogout()
//                 setIsOpen(false)
//               }}
//               className="block w-full text-left pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
//             >
//               <div className="flex items-center">
//                 <LogOut className="mr-2 h-5 w-5" />
//                 Logout
//               </div>
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   )
// }

// export default Navbar

import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../lib/firebase";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="text-lg font-bold">LegalSutra</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.displayName}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-blue-500 px-4 py-2 rounded">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
