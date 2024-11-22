import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { usePollVote } from '../hooks/usePollVote';
const PollDetails = ({ poll }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedPollId, setSelectedPollId] = useState(null);
    const { pollVote, error, sucess, isLoading } = usePollVote();
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
        setSelectedPollId(option._id);
    }
    return (
        <div className='workout-details'>
            <h4>{poll.question}</h4>
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
            {/* <span className="material-symbols-outlined">delete</span> */}
        </div>
    )
}

export default PollDetails