import { useState } from "react";
import { useContext } from "react";
import { UserContext } from "../Context/user";
import { CourseContext } from "../Context/course";
import { useNavigate } from "react-router-dom";

function CourseForm( { setCourses, courses } ) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { currentCourse, setCurrentCourse } = useContext(CourseContext)

    const [formData, setFormData] = useState({
        title: "",
        subject: "",
        instructor_id: user?.id,
        days: "",
        length: "",
        image: "",
        code: Math.floor(Math.random() * 100000)
      });

    function handleChange(e){
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    function handleSubmit(e){
        e.preventDefault();

        fetch('/courses', {
            method: 'POST',
            headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            },
            body: JSON.stringify(formData),
        })
        .then(res => res.json())
        .then(newCourse => {
            setCourses([...courses, newCourse])
            navigate(`/courses/${newCourse.id}`) 
            console.log(newCourse)
            setCurrentCourse(newCourse)
            })

    };

    return(
        <form onSubmit={handleSubmit} autoComplete="off" className="w-1/4 mx-auto" >
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" id="title" placeholder="Course Title" name="title" value={formData.title} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" id="subject" placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" id="days" placeholder="Meeting Days..." name="days" value={formData.days} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <select className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" name="length" id="length" onChange={handleChange}>
                        <option value="" disabled={true}>Choose a length</option>
                        <option value="Semester">Semester</option>
                        <option value="Full year">Full year</option>
                    </select>
                    {/* <input type="text" id="image" placeholder="Add an image (Optional)" name="image" value={formData.image} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/> */}
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" id="image" placeholder="Add an image (Optional)" name="image" value={formData.image} onChange={handleChange} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>
                <div className="relative z-0 mb-6 w-full group">
                    <input type="text" id="code" placeholder="code..." name="code" value={formData.code} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"/>
                </div>
                <button type="submit" className="text-white bg-charcoal hover:bg-yellow focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-10">Submit</button>
            </form>

    );
}

export default CourseForm;