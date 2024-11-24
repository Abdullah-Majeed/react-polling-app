import React, { useEffect } from 'react'
import { usePollContext } from '../context/PollContext';
import PollDetails from '../components/PollDetails';
const VotePolling = () => {
  const { polls, dispatch } = usePollContext();

  // FETCHING UNAUTHORIZED POLLS DATA FOR VOTE
  useEffect(() => {
    const fetchPolls = async () => {
      const response = await fetch('http://localhost:4000/api/polls/all');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POLLS', payload: json });
      }

    }
    fetchPolls();
  }, [dispatch, polls])
  if (polls.length === 0) {
    return <h3 style={{ height: '50vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Oops! No polls available at the moment. Please check back later!</h3>
  }
  return (
    <div className='home'>
      <div className='polls'>
        {polls && polls.map((poll) => (
          <PollDetails key={poll._id} poll={poll} />
        ))}
      </div>
    </div>
  )
}
export default VotePolling