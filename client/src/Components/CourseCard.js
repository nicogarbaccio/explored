import React from "react";
import { Link } from 'react-router-dom';

function CourseCard ({
    key,
    id,
    title,
    subject,
    days,
    length,
    code,
    course,
    setCurrentCourse,
    image = "https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
}) {
    return (
        <div className="flex flex-col justify-center items-center mx-5">
        <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mb-5">
            <img class="rounded-t-lg" src={image} alt={title} />
            <div class="p-5">
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white hover:text-red-100"><Link to={`/courses/${id}`} onClick={(e) => setCurrentCourse(course)}>{title}</Link></h5>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{subject}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{days}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{length}</p>
                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{code}</p>
            </div>
        </div>
        </div>
    )
}

export default CourseCard;