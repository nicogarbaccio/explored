import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AssignmentList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [assignments, setAssignments] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        due_date: "",
        title: "",
        description: "",
        course_id: id
      });
    

    useEffect(() => {
        fetch(`/courses/${id}/assignments`)
        .then((r) => r.json())
        .then(assignments => {
        setAssignments(assignments);
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
        fetch('/assignments', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((assignment) => {setAssignments([...assignments, assignment]);
        setFormData({
            due_date: "",
            title: "",
            description: "",
            course_id: id
        });
        });
    };


    return (
        <div className='min-h-screen bg-slate-200 p-10 flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Assignments</h1>
                {assignments.map(assignment => {
                    return (
                        <p className='my-8 ml-4'>
                            <NavLink to={`/assignment/${assignment.id}`} className="hover:text-blue-700">
                                <span className='font-bold'>{assignment.title}</span>
                            </NavLink>
                            <span> - Due: {assignment.due_date.slice(5)}</span>
                        </p>

                    )
                })}
            {user?.admin ?
                <>
                    <h2 className='text-xl font-bold my-8'>Add an assignment</h2>
                    <form onSubmit={handleSubmit} className='flex flex-col'>
                        <input type="text" id="due_date" placeholder="Due Date" onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} name="due_date" value={formData.due_date} onChange={handleChange} className="block py-2.5 px-1 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <input type="text" id="title" placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-1 my-3 text-sm text-gray-900 bg-white border-1 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                        <CKEditor
                        editor={ClassicEditor}
                        data={formData.description}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setFormData({ ...formData, ["description"]: data })
                        }}
                        />
                        <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                    </form>
                </>
            :
                null
            }
         </div>
    )
}

export default AssignmentList;