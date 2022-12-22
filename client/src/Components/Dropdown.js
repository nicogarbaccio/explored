import { useState } from "react";
import { NavLink } from 'react-router-dom'

function Dropdown ( { currentCourse, user } ){

    const [show, setShow] = useState(false)
    
    return (
        <div class="relative inline-block text-left">
            <div>
                <button type="button" class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500" id="menu-button" aria-expanded="true" aria-haspopup="true" onClick={(e) => setShow(!show)}>
                {currentCourse.title}
                <svg class="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
                </button>
            </div>
            <div class={show ? "show origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" : "hide"} role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                <NavLink to={`/syllabus/${currentCourse.syllabus?.id}`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-0">Syllabus</span>
                </NavLink> 
                <NavLink to={`/course/${currentCourse.id}/assignments`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-1">Assignments</span>
                </NavLink>
                <NavLink to={`/course/${currentCourse.id}/announcements`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-2">Announcements</span>
                </NavLink>
                <NavLink to={`/course/${currentCourse.id}/discussion_board`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-3">Discussion Board</span>
                </NavLink>
                <NavLink to={`/course/${currentCourse.id}/documents`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-4">Course Documents</span>
                </NavLink>
                {user?.admin ?

                    <NavLink to={`/course/${currentCourse.id}/students`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-5">Students</span>
                    </NavLink>
                :
                    <NavLink to={`/course/${currentCourse.id}/grades`} onClick={(e) => setShow(!show)}>
                    <span className='hover:bg-gray-100 text-gray-700 block px-4 py-2 text-sm' role="menuitem" tabindex="-1" id="menu-item-6">Grades</span>
                    </NavLink>
                }
                </div>
            </div>
        </div>

    )
}

export default Dropdown;