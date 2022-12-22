import { NavLink, useParams } from 'react-router-dom'
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CourseContext } from "../Context/course";
import { useEffect, useState } from "react";
import CourseCard from './CourseCard';
import { UilPlus } from '@iconscout/react-unicons'

function CourseListStudent( ){
        const { user } = useContext(UserContext)
        const { currentCourse, setCurrentCourse } = useContext(CourseContext)
        const [courses, setCourses] = useState([])
        const [isLoaded, setIsLoaded] = useState(false)
        const [show, setShow] = useState(false)
        const [displayError, setDisplayError] = useState(false)
        const [code, setCode] = useState("")
        const { id } = useParams();

        useEffect(() => {
            fetch(`/students/${id}/courses`)
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

        function handleChange(e){
            setCode(e.target.value);
        };

        function handleSubmit(e){
            e.preventDefault();
    
            fetch('/course_students', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                },
                body: JSON.stringify({code: code, student_id: id}),
            })
            .then(res => {
                if(res.ok){
                    res.json().then(newCourse => {
                    setCourses([...courses, newCourse.course])
                    setCode("")})
                    setShow(!show)
                } else {
                    setShow(!show)
                    setDisplayError(!displayError)
                }
            })
        };

    return (
        <div className='min-h-screen bg-slate-200 pt-1'>
            <h1 className='text-4xl font-bold my-8'>Welcome, {user?.first_name}</h1>
            <h2 className='text-2xl font-bold my-8'>Your courses</h2>
            <div className='flex justify-center items-center'>
                {courses?.map(course => {
                    return (
                        <CourseCard key={course.id} id={course.id} title={course.title} subject={course.subject} days={course.days} length={course.length} code={course.code} image={course.image} course={course} setCurrentCourse={setCurrentCourse} />
                        )} )
                }
             </div>
            <button onClick={toggleShowForm} className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <div className='flex items-center justify-center gap-1'><UilPlus size="20" color="#FFFFFF" />Add a course</div>
            </button>
            <div className={show ? "show my-9 w-1/12 mx-auto" : "hide"}> 
                <form onSubmit={handleSubmit} autoComplete="off" >
                    <div>
                        <input type="text" id="code" placeholder="Code" name="code" value={code} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-charcoal focus:outline-none focus:ring-0 focus:border-charcoal peer text-center"/>
                    </div>
                    <button type="submit" className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5 mb-10">Submit</button>
                </form>
            </div>
            <div className={displayError ? "show mt-4 font-semibold" : "hide"}>
                <p>Please enter a valid course code.</p>
                <button className='mt-4 hover:text-yellow' onClick={() =>{
                    setShow(!show)
                    setDisplayError(!displayError)}}>Try again.</button>
            </div>
         </div>
    )
}

export default CourseListStudent;