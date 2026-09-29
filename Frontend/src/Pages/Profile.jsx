
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../Components/NavBar'
import { FaUserCircle } from 'react-icons/fa'

const Profile = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState(null)
  const [targetWeight, setTargetWeight] = useState(null)


  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) {
      navigate("/login")
      return
    }


    const fetchUser = async () => {

      try {

        // Get user details
        const userResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/users/${userId}`
        )

        setUser(userResponse.data.user)


        // Get health data
        const healthResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/health/${userId}`
        )

        const healthData = healthResponse.data


        console.log(
          "PROFILE HEALTH DATA:",
          healthData
        )


        // Find latest record containing target weight
        const goalData = [...healthData]
          .sort(
            (a, b) =>
              new Date(b.date) -
              new Date(a.date)
          )
          .find(
            item =>
              item.targetWeight != null
          )


        console.log(
          "PROFILE GOAL DATA:",
          goalData
        )


        if (goalData?.targetWeight != null) {

          setTargetWeight(
            goalData.targetWeight
          )

        } else {

          setTargetWeight(null)

        }


      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        )

      }

    }


    fetchUser()

  }, [navigate])


  const handleLogout = () => {

    localStorage.removeItem("userId")
    localStorage.removeItem("userName")

    alert("Logged out successfully!")

    navigate("/login")

  }


  if (!user) {

    return (
      <>

        <NavBar />

        <div className="text-center mt-5">
          Loading profile...
        </div>

      </>
    )

  }


  return (
    <>

      <NavBar />


      <div className="container mt-5 d-flex justify-content-center">

        <div
          className="card p-4 col-12 col-md-8 col-lg-6 shadow-sm rounded-4"
          style={{ backgroundColor: "#f5f5f5" }}
        >


          <h2 className="mb-4 text-center text-md-start">
            Profile
          </h2>


          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start">


            {/* Profile Icon */}

            <div className="order-1 order-md-2">

              <FaUserCircle
                size={100}
                className="mb-4 mt-2 mt-md-5"
              />

            </div>


            {/* Profile Details */}

            <div className="order-2 order-md-1">

              <p className="mb-3">
                <strong>👤 Name:</strong> {user.name}
              </p>

              <p className="mb-3">
                <strong>📧 Email:</strong> {user.email}
              </p>

              <p className="mb-3">
                <strong>📏 Height:</strong>{' '}
                {user.height ?? "Not set"} cm
              </p>

              <p className="mb-3">
                <strong>⚖️ Current Weight:</strong>{' '}
                {user.weight ?? "Not set"} kg
              </p>

              <p className="mb-3">
                <strong>🎯 Target Weight:</strong>{' '}
                {targetWeight ?? "Not set"} kg
              </p>

              <p className="mb-3">
                <strong>🎂 Age:</strong>{' '}
                {user.age ?? "Not set"}
              </p>

              <p className="mb-3">
                <strong>🚻 Gender:</strong>{' '}
                {user.gender ?? "Not set"}
              </p>

            </div>

          </div>


          {/* Buttons */}

          <div className="d-flex flex-column flex-md-row justify-content-center mt-4">

            <button
              className="btn btn-dark rounded-3 px-4 mb-2 mb-md-0"
              onClick={() =>
                navigate("/userDetails")
              }
            >
              Edit Profile
            </button>


            <button
              className="btn btn-danger rounded-3 px-4 ms-0 ms-md-3"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>


        </div>

      </div>

    </>
  )

}

export default Profile
