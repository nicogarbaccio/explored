import { NavLink, useNavigate } from 'react-router-dom'
import { useContext, useState } from "react";
import { UserContext } from "../Context/user";
import { CourseContext } from "../Context/course";
import Dropdown from './Dropdown';

function Navbar(){
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext)
  const { currentCourse, setCurrentCourse } = useContext(CourseContext)
  const [show, setShow] = useState(false)

  const handleLogout = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then((res) => {
      if (res.ok) {
        setUser(null);
        navigate('/login');
      }
    });
  };

  return (
    <>
    { user ?
      <nav className="p-6 bg-charcoal rounded border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="mx-4 flex flex-wrap justify-between items-center">
              <NavLink exact to="/" className="flex items-center">
                  <span className="self-center text-xl font-semibold whitespace-nowrap text-white tracking-widest">ExplorED</span>
              </NavLink>
              <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex justify-center items-center ml-3 text-gray-400 rounded-lg md:hidden hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-500" aria-controls="navbar-solid-bg" aria-expanded="false" onClick={(e) => setShow(!show)}>
                <span className="sr-only">Open main menu</span>
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              </button>
              <div class={show ? "hidden w-full md:block md:w-auto" : "w-full md:block md:w-auto"} id="navbar-solid-bg">
                <ul class="flex flex-col mt-4 bg-gray-50 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700 text-center">
                  <li>
                    <NavLink to={`/profile/${user.id}`} className="mt-1 block py-2 pr-4 pl-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 dark:text-yellow text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-semibold" aria-current="page"  onClick={(e) => setCurrentCourse(null)}>
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to={user.admin ? `/instructor/${user.id}/courses` : `/student/${user.id}/courses`} className="mt-1 block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-semibold" aria-current="page"  onClick={(e) => setCurrentCourse(null)}>
                      My Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/logout' onClick={ handleLogout } className="mt-1 block py-2 pr-4 pl-3 text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-yellow md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent font-semibold">
                      Log out
                    </NavLink>
                  </li>
                  {
                    currentCourse ?
                    <Dropdown currentCourse={currentCourse} user={user} />
                    :
                    null
                  }
                </ul>
              </div>
            </div>
        </nav>
        :
        ""
      }
    </>
  );
};

export default Navbar;