import { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

function SyllabusForm( { course, setCourse } ) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [text, setText] = useState("")

    function handleSubmit(e){
        e.preventDefault();
        fetch('/syllabuses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
                description: text,
                course_id: id
            }),
        })
        .then(res => res.json())
        .then(syllabus => {
            setCourse({title: course.title, syllabus: syllabus})
            navigate(`/syllabus/${syllabus.id}`);
        })
    };

    return(
        <form onSubmit={handleSubmit} autoComplete="off" >
                <div>
                    <CKEditor
                        editor={ClassicEditor}
                        data={text}
                        onChange={(event, editor) => {
                            const data = editor.getData()
                            setText(data)
                        }}
                    />
                </div>
                <button className="text-white bg-skobeloff hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-3 mt-5" type="submit">Submit</button>
        </form>

    );
}

export default SyllabusForm;