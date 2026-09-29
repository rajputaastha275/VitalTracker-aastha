
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  const handleLogin = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
        "https://vitaltracker3.onrender.com/api/users/login",
        {
          email,
          password
        }
      )

      console.log("LOGIN RESPONSE:", response.data)


      // Get user from response

      const user = response.data.user


      if (!user) {

        alert("User data not received from server")

        return
      }


      // Save user ID

      localStorage.setItem(
        "userId",
        user._id
      )


      // Save user name

      localStorage.setItem(
        "userName",
        user.name
      )


      console.log(
        "Saved user name:",
        user.name
      )


      alert("Login successful!")

      navigate("/dashboard")

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      )

      alert(
        error.response?.data?.message ||
        "Login failed"
      )

    }

  }


  return (
    <>

      <NavBar />


      <h1 className='mt-5 mb-0 text-center'>
        Login
      </h1>


      <p className='text-center text-muted'>
        Welcome back! Login to continue your health journey.
      </p>


      <div className="container mt-4 mb-4">

        <div className="row justify-content-center">

          <div
            className="col-md-6 rounded-3 p-4"
            style={{
              backgroundColor: "#f5f5f5"
            }}
          >

            <form onSubmit={handleLogin}>


              <label className='fw-normal fs-5 mt-2'>
                Email Address
              </label>

              <input
                type='email'
                className='form-control mt-2 py-2'
                placeholder='Enter email address'
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />


              <label className='fw-normal fs-5 mt-4'>
                Password
              </label>

              <input
                type='password'
                className='form-control mt-2 py-2'
                placeholder='Enter password'
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />


              <button
                type="submit"
                className="btn btn-dark w-100 mt-4 py-2"
              >
                Login
              </button>


              <p className='mt-3 text-center'>

                Don't have an account?

                <span
                  onClick={() =>
                    navigate("/signup")
                  }
                  className='fw-bold text-decoration-underline ms-2'
                  style={{
                    cursor: "pointer"
                  }}
                >
                  Signup
                </span>

              </p>

            </form>

          </div>

        </div>

      </div>

    </>
  )
}

export default Login

