import { FirebaseContext } from '../store/Context'
import React, { useState, useContext } from 'react'
import { useNavigate } from "react-router-dom";



export default function Signup() {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  //firebase object deconstructing
  const { firebase } = useContext(FirebaseContext)

  const handleSubmit = (e) => {
    //to prevent refreshing page on submit
    e.preventDefault()
    firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredentials)=>{
      userCredentials.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('admins').add({
          id:userCredentials.user.uid,
          name:name,
          phone:phone,
          username: username
        }).then(()=>{
          navigate('/login ')
        })
      })
      
    })
  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
            SignUp
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit} >

            <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-left">
                Name
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => { setName(e.target.value) }}
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="on"
                  required
                  placeholder="Enter Name"
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tel" className="block text-sm font-medium leading-6 text-left">
                Phone
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => { setPhone(e.target.value) }}
                  id="phone"
                  name="phone"
                  type="tel"
                  autoComplete='on'
                  required
                  placeholder="type +91"
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-left">
                Email
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => { setEmail(e.target.value) }}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  placeholder="Enter email"
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="text" className="block text-sm font-medium leading-6 text-left">
                Username
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => { setUsername(e.target.value) }}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="on"
                  required
                  placeholder="Enter Username"
                  className="block w-full rounded-md border-0 py-1.5  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-red-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-left">
                Password
              </label>

              <div className="mt-2">
                <input
                  onChange={(e) => { setPassword(e.target.value) }}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="Enter Password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-gray-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
