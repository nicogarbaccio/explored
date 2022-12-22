import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import SyllabusEntry from './SyllabusEntry';
import parse from 'html-react-parser'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Syllabus( ){
    const { id } = useParams();
    const [isLoaded, setIsLoaded] = useState(false)
    const [syllabus, setSyllabus] = useState([])
    const [entries, setEntries] = useState([])
    const [show, setShow] = useState(true)
    const [description, setDescription] = useState(syllabus?.description)
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        date: "",
        assignment: "",
        syllabus_id: id
      });

    useEffect(() => {
        fetch(`/syllabuses/${id}`)
        .then((r) => r.json())
        .then(syllabus => {
        setSyllabus(syllabus);
        setIsLoaded(true)
    })
    }, [id])

    useEffect(() => {
        fetch(`/syllabuses/${id}/syllabus_entries`)
        .then((r) => r.json())
        .then(entries => {
        setEntries(entries);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>
  
    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/syllabus_entries', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((entry) => {setEntries([...entries, entry]);
        setFormData({
            date: entry.date,
            assignment: "",
            syllabus_id: id
        });
        });
    };

    function onDeleteEntry(deletedEntry){
        const filteredEntries = entries.filter(entry => entry.id !== deletedEntry.id)
        setEntries(filteredEntries)
    }

    function onUpdateEntry(updatedEntry){
        const updatedEntries = entries.map(entry => {
            if (entry.id === updatedEntry.id){
                return updatedEntry
            } else {
                return entry
            }
        })
        setEntries(updatedEntries)
    }

    function handlePatch(e) {
        e.preventDefault()
        setShow(!show)
        fetch(`/syllabuses/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({description: description}),
        })
        .then(res => res.json())
        .then(updatedSyllabus => setSyllabus(updatedSyllabus))
        setShow(!show)
    }


    return (
        <div className='min-h-screen bg-slate-200 flex flex-col items-center'>
            <div className='flex flex-col justify-center items-center'>
            <h1 className='text-4xl font-bold my-8'>{syllabus.course?.title}</h1>
            { user?.admin ?
                <button type='submit' className={show ? "text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" : "hide"} onClick={(e) => setShow(!show)}>Edit Syllabus</button>
            :
                ""
            }
            </div>
            <p className={show ? 'show text-justify my-8' : 'hide'}>{parse(syllabus.description)}</p>
            <form className={show ? 'hide' : 'show'} onSubmit={handlePatch}>
                <CKEditor
                    editor={ClassicEditor}
                    data={syllabus.description}
                    onChange={(event, editor) => {
                        const data = editor.getData()
                        setDescription(data)
                    }}
                />
                <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>
            {entries.map(entry => {
                return (
                    <SyllabusEntry entry={entry} onDeleteEntry={onDeleteEntry} onUpdateEntry={onUpdateEntry}/>
                )
            })}
            {user?.admin ?
                <div className='flex flex-col justify-center items-center'>
                <h2 className='text-l font-semibold mt-5'>To continue building your syllabus, add assigned readings with their corresponding due date below.</h2>
                <form onSubmit={handleSubmit} className="w-1/4 mt-10">
                    <input type="date" id="date" placeholder="date..." name="date" value={formData.date} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                    <input type="text" id="assignment" placeholder="Assignment" name="assignment" value={formData.assignment} onChange={handleChange} class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                    <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4 mb-10">Submit</button>
                </form>
                </div>
            :
                null
            }
         </div>
    )
}

export default Syllabus;