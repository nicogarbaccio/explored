import { useState, useContext} from 'react'
import { UserContext } from "../Context/user";

export default function EmailChange() {

  const { user, setUser } = useContext(UserContext);
  const [show, setShow] = useState(true)
  const [email, setEmail] = useState("")

  function handleChange(e){
    setEmail(e.target.value)
  };

  function handleUpdate(e){
    e.preventDefault();

    if (user.admin) {
      fetch(`/instructors/${user?.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: email}),
      })
      .then((response) => {
        if (response.ok) {
          response.json().then((instructor) => {
            setUser(instructor)
            setShow(!show);
          });
        } else {
          response.json().then((resp) => alert(resp.errors));
        }
      })   
    } else {
      fetch(`/students/${user?.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: email}),
        })
        .then((response) => {
          if (response.ok) {
            response.json().then((student) => {
              setUser(student)
              setShow(!show);
            });
          } else {
            response.json().then((resp) => alert(resp.errors));
          }
        })        
    }
  };

  return (
    <div>
      <section class="min-h-screen bg-slate-200 ">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

          <div class={show ? "w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 mb-11" : "hide"}>
              <h2 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                  Change Email
              </h2>
              <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={handleUpdate}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Email</label>
                      <input type="text" name="email" id="email" value={email} onChange={handleChange} placeholder="" class="bg-gray-50 border border-gray-300 text-gray-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <button type="submit" class="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Change Email</button>
              </form>
          </div>

          <div className={show ? "hide" : "w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-sm dark:bg-gray-800 dark:border-gray-700 sm:p-8 text-center font-semibold mb-11"}>
              Email succesfully changed!
          </div>

        </div>
      </section>
    </div>
  )
}