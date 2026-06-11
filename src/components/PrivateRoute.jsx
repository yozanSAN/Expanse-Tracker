import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase-config';
import { Loader2 } from 'lucide-react';

export default function PrivateRoute({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Still checking auth state — show a spinner
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-primary">
        <Loader2 className="animate-spin text-accent" size={40} />
      </div>
    );
  }

  // Not logged in — redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Logged in — render the page
  return children;
}