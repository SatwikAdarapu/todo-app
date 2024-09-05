import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from './useAuthContext';
import { projectFirestore } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch, user } = useAuthContext();
    const navigate = useNavigate();

    const auth = getAuth();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        try {
            if (user) {
                // Update Firestore user document to set `online` to false
                const userRef = doc(projectFirestore, 'users', user.uid);
                await updateDoc(userRef, { online: false });
            }

            // Sign the user out
            await signOut(auth);

            // Dispatch logout action to update context
            dispatch({ type: 'LOGOUT' });

            // Navigate to login page
            navigate('/login');

            // Update state
            if (!isCancelled) {
                setIsPending(false);
                setError(null);
            }
        } catch (err) {
            if (!isCancelled) {
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { logout, error, isPending };
};
