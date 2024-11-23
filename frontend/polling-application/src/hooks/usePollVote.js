import { useState } from "react"
import { usePollContext } from "../context/PollContext";

export const usePollVote = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [sucess, setSucess] = useState(null);
    const { dispatch } = usePollContext();
    const pollVote = async (id, optionText) => {
        setIsLoading(true);
        setError(null);
        setSucess(null);
        const response = await fetch('http://localhost:4000/api/polls/vote/' + id, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ optionText })
        });
        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setIsLoading(false);
        }
        if (response.ok) {
            dispatch({ type: 'UPDATE_POLL', payload: json })
            setSucess("Vote submitted successfully");
            setIsLoading(false);
        }
    }
    return { pollVote, error, isLoading, sucess }
}