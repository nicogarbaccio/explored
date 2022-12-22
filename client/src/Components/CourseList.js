import { useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CourseContext } from "../Context/course";
import { useEffect, useState } from "react";
import CourseForm from './CourseForm'
import CourseCard from './CourseCard';
import { UilPlus } from '@iconscout/react-unicons'

function CourseList( ){
    const { user } = useContext(UserContext)
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)
    const [courses, setCourses] = useState([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [show, setShow] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/instructors/${id}/courses`)
        .then((r) => r.json())
        .then(courses => {
        setCourses(courses);
        setIsLoaded(true)
    })
    }, [id])

    if (!isLoaded) return <h2>Loading...</h2>

    function toggleShowForm(){
        setShow(!show)
    }

    return (
        <div className='min-h-screen bg-slate-200 pt-1'>
            <h1 className='text-4xl font-bold my-4'>Welcome, {user?.first_name}</h1>
            <h2 className='text-2xl font-bold my-10 mb-10'>Your courses</h2>
            <div className='flex justify-center items-center'>
                {courses?.map(course => {
                    return (
                        <CourseCard key={course.id} id={course.id} title={course.title} subject={course.subject} days={course.days} length={course.length} code={course.code} image={course.image} course={course} setCurrentCourse={setCurrentCourse} />
                        )} )
                }
             </div>
            <button onClick={toggleShowForm} className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 mb-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <div className='flex items-center justify-center gap-1'><UilPlus size="20" color="#FFFFFF" />Add a course</div>
            </button>
            <div className={show ? "show my-9" : "hide"}> 
                <CourseForm setCourses={setCourses} courses={courses}/>
            </div>
         </div>
    )
}

export default CourseList;