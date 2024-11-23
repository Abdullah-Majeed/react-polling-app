import React, { useEffect } from 'react'
import { usePollContext } from '../context/PollContext';
import { useAuthContext } from '../context/AuthContext';
import HomePollDetails from '../components/HomePollDetails';
import PollForm from '../components/PollForm';
const Home = () => {
  const { polls, dispatch } = usePollContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchPolls = async () => {
      const response = await fetch('http://localhost:4000/api/polls', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_POLLS', payload: json });
      }
    }
    if (user) {
      fetchPolls();
    }
  }, [dispatch, user, polls])
  return (
    <div className='home'>
      <div className='workouts'>
        {polls && polls.map((poll) => (
          <HomePollDetails key={poll._id} poll={poll} />
        ))}
      </div>
      <PollForm />
    </div>
  )
}

export default Home