// "use client"

// import { useState } from "react"
// import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../components/ui/card"
// import { Input } from "../components/ui/input"
// import { Button } from "../components/ui/button"
// import { Mail, Lock, User } from "lucide-react"

// const Signup = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [confirmPassword, setConfirmPassword] = useState("")
//   const [error, setError] = useState("")
//   const [loading, setLoading] = useState(false)
//   const { signup } = useAuth()
//   const navigate = useNavigate()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setError("")

//     try {
//       setLoading(true)

//       // Validate form
//       if (!name || !email || !password || !confirmPassword) {
//         throw new Error("Please fill in all fields")
//       }

//       if (password !== confirmPassword) {
//         throw new Error("Passwords do not match")
//       }

//       if (password.length < 6) {
//         throw new Error("Password must be at least 6 characters")
//       }

//       // Simulate signup
//       await new Promise((resolve) => setTimeout(resolve, 1000))

//       const success = signup({
//         id: "1",
//         name,
//         email,
//       })

//       if (success) {
//         navigate("/")
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <Card className="w-full max-w-md">
//         <CardHeader className="space-y-1">
//           <div className="flex justify-center mb-4">
//             <h1 className="text-3xl font-bold text-indigo-600">LegalSutra</h1>
//           </div>
//           <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
//           <CardDescription className="text-center">Enter your information to create an account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {error && <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4 text-sm">{error}</div>}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="space-y-2">
//               <div className="relative">
//                 <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="name"
//                   placeholder="Full Name"
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="relative">
//                 <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="email"
//                   placeholder="Email"
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="password"
//                   placeholder="Password"
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <div className="relative">
//                 <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   id="confirmPassword"
//                   placeholder="Confirm Password"
//                   type="password"
//                   value={confirmPassword}
//                   onChange={(e) => setConfirmPassword(e.target.value)}
//                   className="pl-10"
//                   required
//                 />
//               </div>
//             </div>
//             <Button type="submit" className="w-full h-10 bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
//               {loading ? "Creating account..." : "Create account"}
//             </Button>
//           </form>
//         </CardContent>
//         <CardFooter className="flex justify-center">
//           <p className="text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
//               Sign in
//             </Link>
//           </p>
//         </CardFooter>
//       </Card>
//     </div>
//   )
// }

// export default Signup

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/" /> : <Navigate to="/login" />;
};

export default Signup;
