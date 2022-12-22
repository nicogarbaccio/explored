import React, { useContext, useState } from 'react';
import { UserContext } from '../Context/user';

function SyllabusEntry({ entry, onDeleteEntry, onUpdateEntry }) {

    const [show, setShow] = useState(false)
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState({
        date: entry.date,
        assignment: entry.assignment
      });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleDeleteEntry(e){
        fetch(`/syllabus_entries/${entry.id}`, {
            method:'DELETE'
          })
          onDeleteEntry(entry)
    }

    function toggleShowForm(){
        setShow(!show)
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/syllabus_entries/${entry.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedEntry => onUpdateEntry(updatedEntry))
        setShow(!show)
    }

    return (
        <div className="text-left my-6 ml-4">
            <span className="font-bold">{entry.date.slice(5)}</span> <span>&mdash; {entry.assignment}</span>
            {user?.admin ?
                <div>
                    <i className="fa-solid fa-xmark mx-2 cursor-pointer text-xs" onClick={handleDeleteEntry}></i>
                    <i class="fa-solid fa-pen-to-square cursor-pointer text-xs" onClick={toggleShowForm}></i>
                    <form className={show ? "show w-1/4 my-3" : "hide"} onSubmit={handlePatch}>
                        <input type="date" id="date" placeholder="date..." name="date" value={formData.date} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <input type="text" id="assignment" placeholder="assignment..." name="assignment" value={formData.assignment} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                    </form>
                </div>
            :
             null
            }
            
        </div>
    )
}

export default SyllabusEntry;