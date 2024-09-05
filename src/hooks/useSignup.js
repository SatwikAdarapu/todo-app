import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthContext } from "./useAuthContext";
import { doc, setDoc } from "firebase/firestore";
import { projectFirestore } from "../firebase/config";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const auth = getAuth();
    const storage = getStorage();

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null);
        setIsPending(true);

        try {
            // Signup user 
            const res = await createUserWithEmailAndPassword(auth, email, password);

            if (!res) {
                throw new Error('Could not complete signup');
            }

            // Upload user thumbnail
            let imgUrl = '';
            if (thumbnail) {
                try {
                    const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
                    const storageRef = ref(storage, uploadPath);
                    const img = await uploadBytes(storageRef, thumbnail);
                    imgUrl = await getDownloadURL(img.ref);
                } catch (thumbnailError) {
                    throw new Error('Thumbnail upload failed.');
                }
            }

            // Add display name and photoURL to user profile
            await updateProfile(res.user, { displayName, photoURL: imgUrl || '' });

            // Create a user document in Firestore
            await setDoc(doc(projectFirestore, 'users', res.user.uid), {
                online: true,
                displayName,
                photoURL: imgUrl
            });

            // Dispatch login action
            dispatch({ type: 'LOGIN', payload: res.user });

            setIsPending(false);
            setError(null);
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                setError('Email is already in use. Please try logging in.');
            } else {
                setError(err.message);
            }
            setIsPending(false);
        }
    };

    return { error, isPending, signup };
};
