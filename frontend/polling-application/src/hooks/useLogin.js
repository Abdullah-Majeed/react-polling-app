import { useState } from "react"
import { useAuthContext } from "../context/AuthContext";
import { usePollContext } from "../context/PollContext";

export const useLogin = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchPolls } = usePollContext();
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    
    // LOGIN FUNTION 
    const login = async (email, password) => {
        const response = await fetch('http://localhost:4000/api/user/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const json = await response.json();

        if (!response.ok) {
            setIsLoading(false);
            setError(json.error);
        }
        if (response.ok) {
            localStorage.setItem('user', JSON.stringify(json));
            dispatchPolls({ type: 'SET_POLLS', payload: null })
            dispatch({ type: 'LOGIN', payload: json });
            setIsLoading(false);
        }
    }
    return { login, error, isLoading }
}