
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import NavBar from '../Components/NavBar'
import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {

  const [targetWeight, setTargetWeight] = useState(null)

  const [userName, setUserName] = useState("User")


  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) {
      console.log("User ID not found")
      return
    }


    const fetchUser = async () => {

      try {

        // Get user details
        const userResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/users/${userId}`
        )

        const user = userResponse.data.user

        setUserName(user.name || "User")


        // Get health data
        const healthResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/health/${userId}`
        )

        const healthData = healthResponse.data

        console.log(
          "DASHBOARD HEALTH DATA:",
          healthData
        )


        // Find the latest record containing goals
        const goalData = [...healthData]
          .sort(
            (a, b) =>
              new Date(b.date) -
              new Date(a.date)
          )
          .find(
            item =>
              item.targetWeight != null ||
              item.stepsGoal != null ||
              item.waterGoal != null
          )


        console.log(
          "DASHBOARD GOAL DATA:",
          goalData
        )


        // Set target weight
        if (goalData?.targetWeight != null) {

          setTargetWeight(
            goalData.targetWeight
          )

        } else {

          setTargetWeight(null)

        }


      } catch (error) {

        console.log(
          "Dashboard Error:",
          error.response?.data ||
          error.message
        )

      }

    }


    fetchUser()

  }, [])


  return (
    <>

      <NavBar showIcons={true} />


      {/* Welcome Section */}

      <div className="container-fluid mt-4">

        <div className="row align-items-center">


          {/* Welcome Message */}

          <div className="col-md-8">

            <h2 className="fw-bold mb-1">

              Hello! {userName} 👋

            </h2>

            <p className="text-muted mb-0">

              Start tracking your health today!

            </p>

          </div>


          {/* Target Weight */}

          <div className="col-md-4 d-flex justify-content-end">

            <div
              className="card border-0 shadow-sm text-center"
              style={{
                backgroundColor: "#f5f5f5",
                width: "220px"
              }}
            >

              <div className="p-2">

                <small className="text-muted">
                  🎯 Target
                </small>

                <h5 className="fw-bold mb-0">

                  {targetWeight != null
                    ? `${targetWeight} kg`
                    : "Not set"}

                </h5>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Dashboard Navigation */}

      <ul className="nav nav-tabs justify-content-center mt-4">


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to=""
            end
          >
            Dashboard
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to="weight"
          >
            Weight
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to="water"
          >
            Water
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to="steps"
          >
            Steps
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to="bmi"
          >
            BMI
          </NavLink>

        </li>


        <li className="nav-item">

          <NavLink
            className="nav-link"
            to="goals"
          >
            Goals
          </NavLink>

        </li>

      </ul>


      {/* Child Pages */}

      <div className="container mt-4">

        <Outlet />

      </div>

    </>

  )

}

export default Dashboard
