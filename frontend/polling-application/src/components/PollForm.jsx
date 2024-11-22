import React, { useState } from 'react'

const PollForm = () => {
    const [options, setOptions] = useState(["", ""]);
    const maxOptions = 5;

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted!");
        console.log("Question:", event.target.question.value);
        console.log("Options:", options);
        console.log("Image:", event.target.image.files[0]);
    };
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Poll</h3>
            <div className="form-group">
                <label htmlFor="question">Question:</label>
                <input
                    type="text"
                    id="question"
                    name="question"
                    placeholder="Enter your question"
                    required
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
                    id="image"
                    name="image"
                    accept="image/*"
                />
            </div>

            <button type="submit">Submit</button>
        </form>
    )
}

export default PollForm