import { useParams, NavLink, useNavigate } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { useState, useEffect } from "react";

function StudentGrades(){

    const [isLoaded, setIsLoaded] = useState(false)
    const [submissions, setSubmissions] = useState([])
    const [course, setCourse] = useState("")
    const { id } = useParams();
    const { user } = useContext(UserContext);

    fetch(`/submissions/${user?.id}/grades`)
    .then((r) => r.json())
    .then(submissions => {
    setSubmissions(submissions);
    setIsLoaded(true)
    })

    fetch(`/courses/${id}`)
    .then((r) => r.json())
    .then(course => {
    setCourse(course);
    setIsLoaded(true)
    })

    if (!isLoaded) return <h2>Loading...</h2>

    const filteredSubmissions = submissions.filter(submission => submission.assignment.course_id === course.id) 

    return (
        <div className='min-h-screen bg-slate-200 p-7'>
            <h1 className='text-3xl font-bold mb-4'>Grades</h1>
            <h2 className='text-xl font-semibold mb-4'>{course.title}</h2>
            <div class="overflow-x-auto relative mt-10 flex flex-col items-center">
                <table class="w-1/3 text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-3">Assignment</th>
                            <th scope="col" class="py-3 px-3">Grade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSubmissions.map(submission => {
                    return (
                        <tr className='class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"'>
                            <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white w-1/3">{submission.assignment.title}</td>
                            <td class="py-4 px-6 w-1/3">{submission.grade?.letter_grade}</td>
                        </tr>
                                )
                            })}
                    </tbody>
                </table>
            </div>
            <div>
            </div>
        </div>
    )
}

export default StudentGrades;