import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import DiscussionPost from "./DiscussionPost";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function DiscussionPostList( { discussionId }) {
    const [discussionPosts, setDiscussionPosts] = useState([])
    const { user } = useContext(UserContext)
    const [postData, setPostData] = useState({
        discussion_id: discussionId,
        student_id: user?.id,
        body: ""
    });

    useEffect(() => {
        fetch(`/discussions/${discussionId}/discussion_posts`)
        .then((r) => r.json())
        .then(discussionPosts => {
        setDiscussionPosts(discussionPosts);
    })
    }, [discussionId])

    function handlePostChange(e){
        const { name, value } = e.target;
        setPostData({ ...postData, [name]: value });
    }

    function handleSubmit(e){
        e.preventDefault();
        fetch('/discussion_posts', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(postData),
        })
        .then((resp) => resp.json())
        .then((discussionPost) => {setDiscussionPosts([...discussionPosts, discussionPost]);
        setPostData({
            discussion_id: discussionId,
            student_id: discussionPost.student?.id,
            body: ""
        });
        });
    };

    function onDeletePost(deletedDiscussionPost){  
        const filteredDiscussionPosts = discussionPosts.filter(discussionPost => discussionPost.id !== deletedDiscussionPost.id)
        setDiscussionPosts(filteredDiscussionPosts)
    }

    function onUpdatePost(updatedDiscussionPost){  
        const updatedDiscussionPosts = discussionPosts.map(discussionPost => {
            if (discussionPost.id === updatedDiscussionPost.id){
                return updatedDiscussionPost
            } else {
                return discussionPost
            }
        })
        setDiscussionPosts(updatedDiscussionPosts)
    }


    return (
        <div>
            {user?.admin ?
                <>
                {discussionPosts.map(discussionPost => <DiscussionPost discussionPost={discussionPost} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost}/>)}
                </>
            :
                <>
                {discussionPosts.map(discussionPost => <DiscussionPost discussionPost={discussionPost} onDeletePost={onDeletePost} onUpdatePost={onUpdatePost}/>)}
                <h2 className='text-xl font-bold my-8'>Post a response below!</h2>
                <form onSubmit={handleSubmit} className="w-full">
                    <CKEditor
                        editor={ClassicEditor}
                        data={postData.body}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setPostData({ ...postData, ["body"]: data })
                        }}
                    />
                    <button type='submit' className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                </form>
                </>
            }
        </div>
    )
}

export default DiscussionPostList;