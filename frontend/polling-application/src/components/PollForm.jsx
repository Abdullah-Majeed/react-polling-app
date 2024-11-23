import React, { useRef, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { usePollContext } from '../context/PollContext';

const PollForm = () => {
    const { user } = useAuthContext();
    const { dispatch } = usePollContext();

    const [options, setOptions] = useState(["", ""]);
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState('');
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    const maxOptions = 5;
    const fileInputRef = useRef(null);

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const handleAddOption = () => {
        if (options.length < maxOptions) {
            setOptions([...options, ""]);
        } else {
            alert("Maximum 5 options are allowed.");
        }
    };

    const handleOptionChange = (index, value) => {
        const updatedOptions = [...options];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
            try {
                const base64 = await toBase64(file);
                setImage(base64); // Store Base64 string
            } catch (error) {
                setError('Error converting file to Base64:', error)
            }
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setEmptyFields([]);

        if (!user) {
            setError('You must be logged in')
            return
        }

        const optionsList = options.map((option) => {
            return { text: option }
        })
        const poll = { question, options: optionsList, image };

        console.log(poll)

        const response = await fetch('http://localhost:4000/api/polls', {
            method: 'POST',
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            // https://stackoverflow.com/questions/42192346/how-to-reset-reactjs-file-input
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; 
            }
            setQuestion('');
            setOptions(["", ""])
            setImage('');
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_POLL', payload: json })
        }
    };
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Poll</h3>
            <div className="form-group">
                <label htmlFor="question">Question:</label>
                <input
                    type="text"
                    id="question"
                    placeholder="Enter your question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label>Options:</label>
                <div id="optionsContainer" className="options-container">
                    {options.map((option, index) => (
                        <input
                            key={index}
                            type="text"
                            name={`option-${index}`}
                            placeholder={`Option ${index + 1}`}
                            value={option}
                            onChange={(e) => handleOptionChange(index, e.target.value)}
                            required
                        />
                    ))}
                </div>
                <button
                    type="button"
                    id="addOption"
                    className="add-option"
                    onClick={handleAddOption}
                >
                    Add Option
                </button>
            </div>

            <div className="form-group">
                <label htmlFor="image">Attach an Image:</label>
                <input
                    type="file"
                    // id="image"
                    // name="image"
                    accept="image/*"
                    required
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </div>

            <button type="submit">Submit</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PollForm