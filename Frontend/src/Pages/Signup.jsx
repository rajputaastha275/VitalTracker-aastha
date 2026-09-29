
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../Components/NavBar'

const Signup = () => {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const handleSignup = async (e) => {

    e.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {

      const response = await axios.post(
        "https://vitaltracker3.onrender.com/api/users/register",
        {
          name,
          email,
          password
        }
      )

      console.log("Signup response:", response.data)

      // Save user ID
      localStorage.setItem(
        "userId",
        response.data.user._id
      )

      alert("Registration successful!")

      navigate("/userDetails")

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

      alert(
        error.response?.data?.message ||
        "Registration failed"
      )

    }
  }


  return (
    <>
      <NavBar />

      <h1 className='mt-5 mb-0 text-center'>
        Signup
      </h1>

      <p className='text-center text-muted'>
        Create your account and start your health journey.
      </p>


      <div className="container mt-4">

        <div className="row justify-content-center">

          <div
            className="col-md-6 rounded-3 p-4"
            style={{ backgroundColor: "#f5f5f5" }}
          >

            <form onSubmit={handleSignup}>

              <label className='fw-normal fs-5 mt-2'>
                Full Name
              </label>

              <input
                type='text'
                className='form-control mt-1'
                placeholder='Enter full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />


              <label className='fw-normal fs-5 mt-4'>
                Email Address
              </label>

              <input
                type='email'
                className='form-control mt-1'
                placeholder='Enter email address'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />


              <label className='fw-normal fs-5 mt-4'>
                Password
              </label>

              <input
                type='password'
                className='form-control mt-1'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />


              <label className='fw-normal fs-5 mt-4'>
                Confirm Password
              </label>

              <input
                type='password'
                className='form-control mt-1'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />


              <button
                type="submit"
                className="btn btn-dark w-100 mt-5"
              >
                Signup
              </button>


              <p className='mt-3 text-center'>
                Already have an account?

                <span
                  onClick={() => navigate("/login")}
                  className='fw-bold text-decoration-underline ms-2'
                  style={{ cursor: "pointer" }}
                >
                  Login
                </span>

              </p>

            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default Signup
