import { signInWithGoogle, logout } from "../lib/firebase";
import { useAuth } from "../context/AuthContext";

const AuthButtons = () => {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default AuthButtons;
