import React, { useEffect, useRef, useState } from 'react'
import { useAuthContext } from '../context/AuthContext';
import { usePollContext } from '../context/PollContext';


const EditPollForm = ({ editData, setEditData, setIsEdit }) => {
    // EDIT POLL FORM
    const { user } = useAuthContext();
    const { dispatch } = usePollContext();

    const [options, setOptions] = useState(["", ""]);
    const [question, setQuestion] = useState('');
    const [image, setImage] = useState('');
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const maxOptions = 5;
    const fileInputRef = useRef(null);
   
    // UPDATE INITAL DATA
    useEffect(() => {
        if (editData) {
            const optionList = editData.options.map((each) => each.text);
            setQuestion(editData.question);
            setOptions(optionList);
            setImage(editData.image);
        }
    }, [editData])
  
    // BASE64 CONVERT FUNCTION
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

    // SUBMIT EDIT FUNCTION
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
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
        const response = await fetch('http://localhost:4000/api/polls/' + editData._id, {
            method: 'PATCH',
            body: JSON.stringify(poll),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })
        const json = await response.json();
        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
            setIsLoading(false)
        }
        if (response.ok) {
            // https://stackoverflow.com/questions/42192346/how-to-reset-reactjs-file-input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
            setIsEdit(false);
            setEditData(null);
            setQuestion('');
            setOptions(["", ""])
            setImage('');
            setError(null)
            setEmptyFields([])
            setIsLoading(false)
            dispatch({ type: 'UPDATE_POLL', payload: json.message.poll });
        }
    };
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Update Poll</h3>
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
                {image !== '' && <img
                    src={image}
                    alt="Poll image"
                    style={{ maxWidth: '50px', border: '1px solid #ccc', display: 'flex', alignItems: 'center', marginTop: '8px' }}
                />}
                <input
                    type="file"
                    accept="image/*"
                    required={image === '' ? true : false}
                    onChange={handleFileChange}
                    ref={fileInputRef}
                />
            </div>

            <button disabled={isLoading} type="submit">Update</button>
            {error && <div className="error">{error}</div>}
            {isLoading && <div className="">Updating poll...</div>}
        </form>
    )
}

export default EditPollForm