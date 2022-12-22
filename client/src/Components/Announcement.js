import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function Announcement(){
    const [isLoaded, setIsLoaded] = useState(false)
    const [announcement, setAnnouncement] = useState([])
    const [show, setShow] = useState(false)
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const [formData, setFormData] = useState([]);

    useEffect(() => {
        fetch(`/announcements/${id}`)
        .then((r) => r.json())
        .then(announcement => {
        setAnnouncement(announcement);
        setIsLoaded(true)
        setFormData({
            title: announcement.title,
            body: announcement.body
        })
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function toggleEdit(){
        setShow(!show)
    }

    function handleDeleteAnnouncement(){
        fetch(`/announcements/${id}`, {
            method:'DELETE'
          })
          navigate(`/course/${announcement.course.id}/announcements`);
    }

    function handlePatch(e) {
        e.preventDefault()
        fetch(`/announcements/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(updatedAnnouncement => setAnnouncement(updatedAnnouncement))
        setShow(!show)
    }

    return (
        <div className='min-h-screen bg-slate-200 flex flex-col items-center text-justify p-10'>
            <div>
                <h1 className='text-2xl font-bold text-center mb-5'>{announcement.title}</h1>
                <p className='my-3'>{announcement.created_at.slice(0, 10)}</p>
                <p>{parse(announcement.body)}</p>
            </div>
            {user?.admin ?
                <div>
                <button onClick={toggleEdit} className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 block">Edit Announcement</button>
                <button onClick={handleDeleteAnnouncement} className="text-white bg-red-200 hover:bg-red-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6 block">Delete Announcement</button>
                <form onSubmit={handlePatch} className={show ? "show w-1/2 mt-4" : "hide"}>
                    <input type="text" id="title" placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"></input>
                    <CKEditor
                        editor={ClassicEditor}
                        data={formData.body}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setFormData({ ...formData, ["body"]: data })
                        }}
                    />
                    <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-8">Submit</button>
                </form>
                </div>
            :
                null
            }
        </div>
    )
}

export default Announcement;