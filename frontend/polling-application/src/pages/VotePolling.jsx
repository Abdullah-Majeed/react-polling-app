import React, { useEffect } from 'react'
import { usePollContext } from '../context/PollContext';
import PollDetails from './PollDetails';
const VotePolling = () => {
  const { polls, dispatch } = usePollContext();
  useEffect(() => {
    const fetchPolls = async () => {
      const response = await fetch('http://localhost:4000/api/polls/all');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POLLS', payload: json });
      }

    }
    fetchPolls();
  }, [dispatch])
  return (
    <div className='home'>
      <div className='workouts'>
        {polls && polls.map((poll) => (
          <PollDetails key={poll._id} poll={poll} />
        ))}
      </div>

    </div>
  )
}

export default VotePolling