import { useState } from 'react';
import Select from 'react-select'; // Import react-select
import './Create.css';

const categories = [
    { value: 'development', label: 'Development' },
    { value: 'design', label: 'Design' },
    { value: 'sales', label: 'Sales' },
    { value: 'marketing', label: 'Marketing' }
];

export default function Create() {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [duedate, setDuedate] = useState('');
    const [category, setCategory] = useState(null); // Set initial state to null

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, details, duedate, category);
    };

    return (
        <div className="create-form">
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>Project Name</span>
                    <input
                        required
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                </label>

                <label>
                    <span>Project Details</span>
                    <textarea
                        required
                        onChange={(e) => setDetails(e.target.value)}
                        value={details}
                    ></textarea>
                </label>

                <label>
                    <span>Set Due Date</span>
                    <input
                        required
                        type="date"
                        onChange={(e) => setDuedate(e.target.value)}
                        value={duedate}
                    />
                </label>

                <label>
                    <span>Project Category</span>
                    <Select
                        options={categories}
                        onChange={(selectedOption) => setCategory(selectedOption)}
                        value={category}
                    />
                </label>

                <button className="btn">Add Project</button>
            </form>
        </div>
    );
}
