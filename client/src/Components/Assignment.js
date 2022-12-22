import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import DeleteConfirmation from './DeleteConfirmation';
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Assignment(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignment, setAssignment] = useState([])
    const [submissions, setSubmissions] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formDataPatch, setFormDataPatch] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false)

    useEffect(() => {
        fetch(`/assignments/${id}`)
        .then((r) => r.json())
        .then(assignment => {
        setAssignment(assignment);
        setIsLoaded(true)
        setFormDataPatch({
            due_date: assignment.due_date,
            title: assignment.title,
            description: assignment.description
        })
    })
    }, [id])

    useEffect(() => {
        fetch(`/assignments/${id}/submissions`)
        .then((r) => r.json())
        .then(submissions => {
        setSubmissions(submissions);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormDataPatch({ ...formDataPatch, [name]: value });
    };

    function toggleEdit(){
        setShow(!show)
    }

    function handleDeleteAssignment(){
        fetch(`/assignments/${id}`, {
            method:'DELETE'
          })
          navigate(`/course/${assignment.course.id}/assignments`);
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/assignments/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formDataPatch),
        })
        .then(res => res.json())
        .then(updatedAssignment => setAssignment(updatedAssignment))
        setShow(!show)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('submission[student_id]', user?.id)
        formData.append('submission[assignment_id]', id)
        formData.append('submission[file]',
                         e.target.file.files[0])
        fetch('/submissions', {
           method: "POST",
           body: formData
        })
        .then(r => r.json())
        .then(submission => setSubmissions([...submissions, submission]))
        .catch((error) => console.error(error))
     }

     const destructuredIds = submissions.map(submission => submission.student_id)

     function handleToggle() {
        setShowConfirmation(!showConfirmation)
    }

    return (
        <div className='min-h-screen bg-slate-200 p-10 flex flex-col items-center'>
            <div>
                <h1 className='text-2xl font-bold text-center mb-5'>{assignment.title}</h1>
                <p className='text-l font-bold my-3 text-center BG'>Due date: {assignment.due_date}</p>
                <p>{parse(assignment.description)}</p>
            </div>

            {user?.admin ?
                <>
                    <button onClick={toggleEdit} className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 block">Edit Assignment</button>
                    <button onClick={handleToggle} className="text-white bg-red-200 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-6">Delete Assignment</button>
                    <form onSubmit={handlePatch} className={show ? "show w-1/2" : "hide"}>
                        <input type="text" id="due_date" placeholder="Due Date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} name="due_date" value={formDataPatch.due_date} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <input type="text" id="title" placeholder="title..." name="title" value={formDataPatch.title} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <CKEditor
                        editor={ClassicEditor}
                        data={formDataPatch.description}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setFormDataPatch({ ...formDataPatch, ["description"]: data })
                        }}
                        />
                        <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-8">Submit</button>
                    </form>
                    <div>
                        <h2 className='text-xl font-bold mb-4'>Submissions</h2>
                        {submissions.map(submission => {
                            return (
                                <div className='my-2'>
                                    <h3 className='inline-block font-semibold'>{submission.student_name}. </h3><a download href={submission.file_url} className="hover:text-blue-700"> {submission.file_name}</a>
                                </div>
                                )
                            })}
                    </div>
                </>
            :
                destructuredIds.indexOf(user?.id) !== -1 ? 
                    <>
                    <p className='mt-6 mb-4 font-bold'>Thank you for submitting!</p>
                    <div>
                    {submissions.map(submission => submission.student_id === user?.id ? 
                        <a download href={submission.file_url} className='ml-3 hover:text-blue-700 font-semibold'>{submission.file_name}</a>
                        :
                        null
                    )}
                    </div>
                    </>
                :
                <>
                <p className='mt-6 mb-4 font-bold'>Submit your assignment here:</p>
                <form onSubmit={handleSubmit}>
                    <input type="file" id="file" name="file"/>
                    <button type='submit' className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                </form> 
                </>
            }
            <div className={showConfirmation ? "show" : "hide"}>
                <DeleteConfirmation handleToggle={handleToggle} handleDelete={handleDeleteAssignment} show={showConfirmation} item="Assignment"/>
            </div>
        </div>
    )
}

export default Assignment;