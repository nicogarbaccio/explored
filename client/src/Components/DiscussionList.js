import { useParams, NavLink } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function DiscussionList( ){
    const [isLoaded, setIsLoaded] = useState(false)
    const [discussions, setDiscussions] = useState([])
    const { id } = useParams();
    const { user } = useContext(UserContext);

    const [formData, setFormData] = useState({
        title: "",
        body: "",
        course_id: id
      });

    useEffect(() => {
        fetch(`/courses/${id}/discussions`)
        .then((r) => r.json())
        .then(discussions => {
        setDiscussions(discussions);
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
        fetch('/discussions', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then((resp) => resp.json())
        .then((newDiscussion) => {setDiscussions([...discussions, newDiscussion]);
        setFormData({
            title: "",
            body: "",
            course_id: id
        });
        });
    };

    return (
        <div className='min-h-screen bg-slate-200 p-7 flex flex-col items-center'>
            <h1 className='text-4xl font-bold'>Discussions</h1>
                {discussions?.map(discussion => {
                    return (
                        <p className='my-8 ml-4'>
                            <NavLink to={`/discussion/${discussion.id}`} className="hover:text-blue-700">
                                <span className='font-bold' >{discussion.title}</span>
                            </NavLink>
                            <span> - {discussion.created_at.slice(0, 10)}</span>
                        </p>

                    )
                })}
            {user?.admin ?
                <>
                <h2 className='text-xl font-bold my-8'>Add a discussion</h2>
                <form onSubmit={handleSubmit} className="w-1/2">
                    <input type="text" id="title" placeholder="Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-1 w-full text-sm text-gray-900 bg-white border-1 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer mb-6"></input>
                    {/* <textarea type="textarea" id="body" placeholder="Body" name="body" value={formData.body} onChange={handleChange} rows="4" className="mt-4 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea> */}
                    <CKEditor 
                        editor={ClassicEditor}
                        data={formData.body}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setFormData({ ...formData, ["body"]: data })
                        }}
                    />
                    <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                </form>
                </>
            :
                null
            }
         </div>
    )
}

export default DiscussionList;