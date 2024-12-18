import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { usePollContext } from "../context/PollContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchPolls } = usePollContext();

    // SIGNUP FUNCTION
    const signup = async (email, password) => {
        setIsLoading(true);
        setError(false);

        const response = await fetch('http://localhost:4000/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatchPolls({ type: 'SET_POLLS', payload: null })
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    }
    return { signup, error, isLoading }
}