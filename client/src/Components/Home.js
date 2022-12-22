import Login from "./Login";
import SignupInstructor from "./SignupInstructor";
import { useContext, useEffect } from "react";
import { UserContext } from "../Context/user";
import { Link, useNavigate } from 'react-router-dom'
import SignupStudent from "./SignupStudent";

function Home() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)

    const handleLogout = () => {
        fetch('/logout', {
          method: 'DELETE'
        })
        .then((res) => {
          if (res.ok) {
            setUser(false);
            navigate('/');
          }
        });
      };

      useEffect(() => {if (user) {
        if (user.admin) {
          navigate(`/instructor/${user.id}/courses`)
        } else {
          navigate(`/student/${user.id}/courses`)
        }
      }}, [user])
    
    return (
      <div>
        <div className="bg-slate-200 min-h-screen flex flex-row">
          <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <h1 className='text-8xl font-bold my-8'>ExplorED</h1>
            <h2 className="text-xl italic mb-8">Learn wherever you are</h2>
            <div className="container ml-auto items-center justify-center flex-col bg-slate-200 min-h-screen">
              <button className="w-full text-center py-3 rounded bg-queenblue text-white hover:bg-yellow focus:outline-none my-1"><Link to='/SignupInstructor'>Sign up as an instructor</Link></button>
              <button className="w-full text-center py-3 rounded bg-queenblue text-white hover:bg-yellow focus:outline-none my-1 mb-10"><Link to='/SignupStudent'>Sign up as a student</Link></button>
            <div>
              <h3>Already have an account?</h3>
              <button className="w-full text-center py-3 rounded bg-queenblue text-white hover:bg-yellow focus:outline-none my-1"><Link to='/login'>Log in</Link></button>
            </div>
            </div>
          </div>
        </div>
      </div>
    ); 
}

export default Home;