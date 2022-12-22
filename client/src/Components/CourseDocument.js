import { useContext } from "react";
import { UserContext } from "../Context/user";

function CourseDocument ({ document, onDeleteDocument }){

    const { user } = useContext(UserContext);

    function handleDeleteDocument(e){
        fetch(`/course_documents/${document.id}`, {
            method:'DELETE'
          })
          onDeleteDocument(document)
    }

    return (
        <div className='my-5 ml-4 font-semibold'>
            <a download href={document.document_file_url} className="hover:text-blue-700">{document.document_file_name.slice(0, -4)}</a>
            { user?.admin ?
                <i className="fa-solid fa-xmark ml-2 cursor-pointer" onClick={handleDeleteDocument}></i>
            :
                ""
            }
        </div>
    )
}

export default CourseDocument;