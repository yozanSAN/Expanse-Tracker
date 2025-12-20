import { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../config/firebase-config.js';
import { useNavigate  } from 'react-router-dom';

const Auth = () => {

    const [user, setUser] = useState(null);
    const navigate = useNavigate();

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

    useEffect(() => {
        console.log(user)
    }, [user])

    return (
        <div className='bg-gradient-to-t from-secondary to-accent '>
            {!user && (
                <div class="flex items-center justify-center h-screen">
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