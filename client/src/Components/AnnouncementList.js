import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function AnnouncementList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [announcements, setAnnouncements] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [title, setTitle] = useState("")

    const [text, setText] = useState("")
    

    useEffect(() => {
        fetch(`/courses/${id}/announcements`)
        .then((r) => r.json())
        .then(announcements => {
        setAnnouncements(announcements);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        setTitle(e.target.value)
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/announcements', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
                title: title,
                body: text,
                course_id: id
              }),
        })
        .then((resp) => resp.json())
        .then((announcement) => {
            setAnnouncements([...announcements, announcement])
            navigate(`/announcement/${announcement.id}`);
        });
    };

    console.log(announcements.length)
    return (
        <div className='min-h-screen bg-slate-200 p-7 flex flex-col items-center'>
            <h1 className='text-4xl font-bold my-5'>Announcements</h1>
                { announcements.length  ? 
                    announcements.map(announcement => {
                        return (
                            <p className='my-8 ml-4 text-lg'>
                                <NavLink to={`/announcement/${announcement.id}`} className="hover:text-blue-700">
                                    <span className='font-bold hover:text-yellow'>{announcement.title}</span>
                                </NavLink>
                                <span> - {announcement.created_at.slice(5, 10)}</span>
                            </p>

                        )
                    })
                :
                    <p>There are no announcements yet!</p>
                }
            {user?.admin ?
                <>
                    <h2 className='text-xl font-bold my-8'>Add an announcement</h2>
                    <form onSubmit={handleSubmit} className="w-1/2">
                        <input type="text" id="title" placeholder="Title" name="title" value={title} onChange={handleChange} className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-white border-1 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-6"></input>
                        <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setText(data)
                        }}
                        />
                        <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-6">Submit</button>
                    </form>
                </>
            :
                null
            }


         </div>
    )
}

export default AnnouncementList;