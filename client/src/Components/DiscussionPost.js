import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import parse from 'html-react-parser';

function DiscussionPost({ discussionPost, onDeletePost, onUpdatePost }) {
    const [show, setShow] = useState(false)
    const { user } = useContext(UserContext);
    const { id, created_at, body, student } = discussionPost 
    const [updatedBody, setUpdatedBody] = useState(body)

    function handleDeletePost(){
        onDeletePost(discussionPost)
        fetch(`/discussion_posts/${id}`, {
            method:'DELETE'
          })
    }

    function handleUpdatePost(e) {
        e.preventDefault();
        fetch(`/discussion_posts/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({body: updatedBody}),
        })
        .then(res => res.json())
        .then(updatedDiscussionPost => onUpdatePost(updatedDiscussionPost))
        setShow(!show)
    }

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div className="my-7 bg-yellow p-3">
            <p className='text-sl'><span className="font-bold">{student?.first_name} {student?.last_name}, </span><span>posted on {created_at.slice(0, 10)}</span></p>
            <p className="p-3">{parse(body)}</p>
            {user?.id === student.id ?
                <>
                <div class="inline-flex">
                    <button onClick={handleDeletePost} class="bg-red-200 hover:bg-red-100 text-white font-semibold text-sm py-1 px-3 rounded-l">Delete</button>
                    <button onClick={toggleShowForm} class="bg-charcoal hover:bg-skobeloff text-white font-semibold text-sm py-1 px-3 rounded-r">Edit</button>
                </div>
                <form className={show ? "show" : "hide"} onSubmit={handleUpdatePost}>
                    <CKEditor
                        editor={ClassicEditor}
                        data={updatedBody}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setUpdatedBody(data)
                        }}
                    />
                    <button type='submit' class="bg-charcoal hover:bg-gray-400 text-white font-semibold text-sm py-1 px-3 rounded-r mt-4">Submit</button>
                </form>
                </>
            :
                null
            }
        </div>
    )
}

export default DiscussionPost;