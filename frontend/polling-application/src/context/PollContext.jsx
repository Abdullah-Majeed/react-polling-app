import { createContext, useContext, useReducer } from "react"

const PollContext = createContext();

export const usePollContext = () => {
    return useContext(PollContext);
}

export const pollReducer = (state, action) => {
    switch (action.type) {
        case 'SET_POLLS':
            return { polls: action.payload }
        case 'CREATE_POLL':
            return { polls: [action.payload, ...state.polls] }
        case 'DELETE_POLL':
            return { polls: state.polls.filter((each) => each._id !== action.payload._id) }
        default:
            return state
    }
}
const PollContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(pollReducer, {
        polls: null
    })
    return (
        <PollContext.Provider value={{ ...state, dispatch }}>
            {children}
        </PollContext.Provider>
    )
}
export default PollContextProvider