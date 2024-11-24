import React, { useEffect, useState } from 'react'
import { usePollContext } from '../context/PollContext';
import { useAuthContext } from '../context/AuthContext';
import HomePollDetails from '../components/HomePollDetails';
import PollForm from '../components/PollForm';
import EditPollForm from '../components/EditPollForm';

// HOME DASHBOARD
const Home = () => {
  const { polls, dispatch } = usePollContext();
  const { user } = useAuthContext();
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState(null);

  // FETCHING USER POLLS DATA
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
  if (polls === null || polls.length === 0) {
    return (
      <div className='home'>
        <div className='polls'>
          <h3 style={{ height: '50vh', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>Create a new poll and let the voting begin!</h3>
        </div>
        {isEdit ? <EditPollForm editData={editData} setEditData={setEditData} setIsEdit={setIsEdit} /> : <PollForm />}
      </div>)
  }
  return (
    <div className='home'>
      <div className='polls'>
        {polls && polls.map((poll) => (
          <HomePollDetails key={poll._id} poll={poll} setEditData={setEditData} setIsEdit={setIsEdit} />
        ))}
      </div>
      {isEdit ? <EditPollForm editData={editData} setEditData={setEditData} setIsEdit={setIsEdit} /> : <PollForm />}
    </div>
  )
}

export default Home