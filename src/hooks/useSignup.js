import { useState } from "react";
import { projectauth } from "../firebase/config";
import { parseAst } from "vite";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const {dispatch} = useAuthContext()

    const signup = async (email, password, displayName) => {
        setError(null)
        setIsPending(true)

        try {
            //signup user
            const res = await projectauth.createUserWithEmailAndPassword(email, password)
            console.log(res.user)

            if (!res) {
                throw new Error('could not complete signup')
            }

            //add display name to user
            await res.user.updateProfile({ displayName })

            //dispatch login action
            dispatch({type: 'LOGIN', payload: res.user})


            setIsPending(false)
            setError(null)
        }
        catch (err) {
            console.log(err.message)
            setError(err.message)
            setIsPending(false)
        }
    }
    return { error, isPending, signup }
}
