import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import CourseDocument from './CourseDocument';

function CourseDocumentList (){

    const [documents, setDocuments] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const { user } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/courses/${id}/course_documents`)
        .then((r) => r.json())
        .then(documents => {
        setDocuments(documents);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('course_document[course_id]', id)
        formData.append('course_document[document_file]',
                         e.target.file.files[0])
        fetch('/course_documents', {
           method: "POST",
           body: formData
        })
        .then(r => r.json())
        .then(document => setDocuments([...documents, document]))
        .catch((error) => console.error(error))
     }

     function onDeleteDocument(deletedDocument){
        const filteredDocuments = documents.filter(document => document.id !== deletedDocument.id)
        setDocuments(filteredDocuments)
    }


    return (
        <div className='min-h-screen bg-slate-200 p-7 flex flex-col items-center'>
            <h1 className='text-2xl font-bold mb-8'>Course Documents</h1>
            <div>
                {documents.map(document => <CourseDocument document={document} onDeleteDocument={onDeleteDocument}/>)}
            </div>
            { user?.admin ?
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
                <input className='rounded-lg bg-white' type="file" id="file" name="file"/>
                <button type='submit' className="block text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-3 py-1 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4">Submit</button>
                </form>
            :
                ""
            }
        </div>
    )
}

export default CourseDocumentList;