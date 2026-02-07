import { useState, useEffect } from 'react';
import { signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { auth, provider } from '../../config/firebase-config.js';
import { useNavigate  } from 'react-router-dom';

const Auth = () => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check if user is already logged in on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                // User is already logged in, redirect to Dashboard
                navigate("/Dashboard");
            } else {
                // No user logged in, show Auth page
                setLoading(false);
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                setUser(result.user);
                console.log(result.user)
                navigate("/Dashboard"); 
            })
            .catch((error) => console.log(error));
    };
    // const handleLogout = () => {
    //     setUser(null);
    //     auth.signOut();
    // }

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-t from-secondary to-accent">
                <p className="text-textPrimary text-2xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className='bg-gradient-to-t from-secondary to-accent '>
            {!user && (
                <div className="flex items-center justify-center h-screen">
                    <button className='center px-6 py-5 text-3xl font-bold rounded bg-accent-soft m-10 hover:bg-accent text-textPrimary shadow-[0_0_10px_#22c55e,0_0_30px_#22c55e,0_0_40px_#22c55e] '
                        onClick={() => handleLogin()}>
                        Sign up with google
                    </button>
                </div>
            )}
        </div>
    );
};
export default Auth;