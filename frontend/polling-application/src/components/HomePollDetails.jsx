import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { usePollVote } from '../hooks/usePollVote';
import { useAuthContext } from '../context/AuthContext';
import { usePollContext } from '../context/PollContext';
const HomePollDetails = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const { pollVote, error, sucess, isLoading } = usePollVote();
    const { user } = useAuthContext();
    const { dispatch } = usePollContext();
    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('http://localhost:4000/api/polls/' + poll._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        
        if (response.ok) {
            dispatch({ type: 'DELETE_POLL', payload: json })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const optionText = selectedOption
        if (optionText === '') {
            alert("Please select option");
            return;
        }
        await pollVote(poll._id, optionText);
        setSelectedOption("");
    }
    const handleChange = (e, option) => {
        setSelectedOption(e.target.value);
    }
    return (
        <div className='workout-details'>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                    src={poll.image}
                    alt="Poll image"
                    style={{ maxWidth: '50px', border: '1px solid #ccc' }}
                />
                <h4 style={{ marginLeft: '8px' }}>{poll.question}</h4>

            </div>
            <form onSubmit={handleSubmit}>
                {poll.options.map((option) => (
                    <div key={option.text} style={{ display: 'flex', alignItems: 'center' }}>
                        <input style={{ width: '1%', margin: '0px', padding: '0px' }} type='radio' id={option.text} name="poll" checked={selectedOption === option.text} value={option.text} onChange={(e) => handleChange(e, option)} />
                        <label htmlFor={option.text} style={{ marginLeft: '8px' }}>{option.text}</label><br />
                    </div>
                ))}
                <button disabled={isLoading} style={{ marginTop: '8px' }}>Submit</button>
                {error && <div className='error'>{error}</div>}
                {sucess && <div className='success'>{sucess}</div>}
            </form>
            {/* <p>Created {formatDistanceToNow(new Date(poll.createdAt), { addSuffix: true })}</p> */}
            <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        </div>
    )
}

export default HomePollDetails