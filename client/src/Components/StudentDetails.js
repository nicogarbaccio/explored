import { useParams } from 'react-router-dom'
import { useState, useEffect } from "react";
import SubmissionRow from './SubmissionRow';

function StudentDetails() {
    const [student, setStudent] = useState("")
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/course_students/${id}`)
        .then((r) => r.json())
        .then(student => {
        setStudent(student);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    const { course, course_student_info, submissions } = student

    return (
        <div className='min-h-screen bg-slate-200 p-7 flex flex-col items-center'>
            <h1 className='text-3xl font-bold mb-4'>{course_student_info}</h1>
            <h2 className='text-xl font-semibold mb-4'>{course.title}</h2>
            <div class="overflow-x-auto relative mt-10">
                <table class="w-1/3 text-sm text-center text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="py-3 px-3">Assignment</th>
                            <th scope="col" class="py-3 pr-9">Submission</th>
                            <th scope="col" class="py-3 pr-9">Grade</th>
                        </tr>
                    </thead>
                </table>
            </div>
            {submissions.map(submission => <SubmissionRow submission={submission} />)}
        </div>

    )
}

export default StudentDetails;