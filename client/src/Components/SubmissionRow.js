import { useState, useEffect } from "react";

function SubmissionRow({ submission }) {
    const [grade, setGrade] = useState("")
    const [show, setShow] = useState(false)
    const [letterGrade, setLetterGrade] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const { id, file_url, file_name, student_id, assignment } = submission

    useEffect(() => {
        fetch(`/grades/submission/${id}`)
        .then((r) => r.json())
        .then(grade => {
        setGrade(grade);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function handleChange(e){
        setLetterGrade(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        fetch('/grades', {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify({
                letter_grade: letterGrade,
                submission_id: id
            }),
        })
        .then((resp) => resp.json())
        .then(grade => setGrade(grade));
    };

    function handleDeleteGrade(){
         fetch(`/grades/submission/${id}`, {
            method:'DELETE'
          })
        setGrade("")
    }

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div class="overflow-x-auto relative">
        <form onSubmit={handleSubmit} className>
            <table class="w-1/3 text-sm text-center text-gray-500 dark:text-gray-400">
            <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3">{assignment.title}</td>
                <td scope="row" class="py-4 px-6 w-1/3"><a download href={file_url} className="hover:text-blue-700">{file_name}</a></td>
                {grade ? 
                    <>
                    <td class="py-4 px-6 w-1/3">
                        <span className="font-bold">{grade.letter_grade}</span>
                        <i className="fa-solid fa-xmark cursor-pointer ml-2 text-sm" onClick={handleDeleteGrade}></i>
                    </td>
                    </>

                 :
                    <td class="px-6 w-1/3">

                        <input type="text" id="letter_grade" name="letter_grade" value={letterGrade} onChange={handleChange} className="block py-2.5 px-0 w-1/3 mx-auto text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer text-center"></input> 
                        <button type='submit'>Grade</button>

                    </td>}
            </tr>
            </tbody>
            </table>
        </form>
        </div>
    )
}

export default SubmissionRow;