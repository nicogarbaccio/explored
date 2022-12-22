import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/user";

function Login() {

  const { user, setUser } = useContext(UserContext)
  const [ formData, setFormData ] = useState({
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    }).then( (resp) => {
      if (resp.ok) {
        resp.json().then( (user) => {
          setUser(user);
          if (user.admin === true) {
            navigate(`/instructor/${user.id}/courses`);
          } else {
            navigate(`/student/${user.id}/courses`);
          }

        });
      } else {
        resp.json().then( (json) => {
          alert(json.errors)
        });
      }
    });
  };

  return (
      <>
    {user ?

      user.admin ?

      navigate(`/instructors/${user.id}/courses`)

       :

       navigate(`/students/${user.id}/courses`)

    :

        <div className="bg-slate-200 min-h-screen flex flex-row">
        <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">

          <h1 className="mb-8 text-4xl text-center font-bold">ExplorED</h1>

          <form onSubmit={ handleSubmit } className="bg-white px-6 py-8 rounded shadow-md text-black w-full">

            <h1 className="mb-8 text-xl text-center font-bold">Welcome Back!</h1>

            <input
            label="Email"
            type="text"
            required
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={ handleChange }
            placeholder='Email'
            name="email"
            value={ email }
            />

            <input
            label="Password"
            type="password"
            required
            className="block border border-grey-light w-full p-3 rounded mb-4"
            onChange={ handleChange }
            placeholder='Password'
            name="password"
            value={ password }
            />
            <button type='submit' className="w-full text-center py-3 rounded bg-queenblue text-white hover:bg-yellow focus:outline-none my-1">Login</button>
          </form>

            <div class="text-grey-dark mt-6">
            Would you like to create an account?{' '}
            <a class="no-underline border-b border-blue-600 text-charcoal hover:text-yellow" href="../">
                Sign Up
            </a>.
          </div>
        </div>
      </div>

   }
   </>
  );
}

export default Login;