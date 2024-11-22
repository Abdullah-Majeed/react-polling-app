import { useAuthContext } from "../context/AuthContext"
import { usePollContext } from "../context/PollContext";

export const useLogout = () => {
    const { dispatch } = useAuthContext();
    const { dispatch: dispatchPolls } = usePollContext()
    const logout = () => {
        localStorage.removeItem('user');
        dispatch({ type: 'LOGOUT' });
        dispatchPolls({ type: 'SET_POLLS', payload: null })
    }

    return { logout }
}
