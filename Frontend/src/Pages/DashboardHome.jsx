
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const DashboardHome = () => {

  const navigate = useNavigate()

  const [healthData, setHealthData] = useState(null)
  const [userData, setUserData] = useState(null)


  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) {
      console.log("User ID not found")
      return
    }


    const fetchData = async () => {

      try {

        // Get user details
        const userResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/users/${userId}`
        )

        setUserData(userResponse.data.user)


        // Get health data
        const healthResponse = await axios.get(
          `https://vitaltracker3.onrender.com/api/health/${userId}`
        )

        const data = healthResponse.data

        console.log(
          "FULL HEALTH RESPONSE:",
          data
        )


        // Find the latest record containing goals
        const goalRecord = [...data]
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
          "LATEST GOAL RECORD:",
          goalRecord
        )


        // Latest health record
        const latestRecord = [...data]
          .sort(
            (a, b) =>
              new Date(b.date) -
              new Date(a.date)
          )[0]


        setHealthData({

          ...(latestRecord || {}),

          targetWeight:
            goalRecord?.targetWeight,

          stepsGoal:
            goalRecord?.stepsGoal,

          waterGoal:
            goalRecord?.waterGoal

        })


      } catch (error) {

        console.log(
          "Dashboard Error:",
          error.response?.data ||
          error.message
        )

      }

    }


    fetchData()

  }, [])


  return (
    <>

      <h3 className="fw-bold mt-5 mb-4">
        Health Summary
      </h3>


      <div className="row g-3 mb-3">


        {/* Target Steps */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/dashboard/steps")
            }
          >

            <h6 className="text-muted">
              👣 Target Steps
            </h6>

            <h3>
              {healthData?.stepsGoal ?? 10000}
            </h3>

          </div>

        </div>


        {/* Achieved Steps */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/dashboard/steps")
            }
          >

            <h6 className="text-muted">
              🚶 Achieved Steps
            </h6>

            <h3>
              {healthData?.steps ?? 0}
            </h3>

          </div>

        </div>


        {/* Current Weight */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/dashboard/weight")
            }
          >

            <h6 className="text-muted">
              ⚖️ Current Weight
            </h6>

            <h3>
              {userData?.weight
                ? `${userData.weight} kg`
                : "0 kg"}
            </h3>

          </div>

        </div>


        {/* Height */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/dashboard/bmi")
            }
          >

            <h6 className="text-muted">
              📏 Height
            </h6>

            <h3>
              {userData?.height
                ? `${userData.height} cm`
                : "0 cm"}
            </h3>

          </div>

        </div>


        {/* Water Intake */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5",
              cursor: "pointer"
            }}
            onClick={() =>
              navigate("/dashboard/water")
            }
          >

            <h6 className="text-muted">
              💧 Water Intake
            </h6>

            <h3>
              {healthData?.water ?? 0}
              {" / "}
              {healthData?.waterGoal ?? 8}
              {" Glasses"}
            </h3>

          </div>

        </div>


        {/* Target Weight */}

        <div className="col-md-4">

          <div
            className="card card1 p-4 shadow-sm"
            style={{
              backgroundColor: "#f5f5f5"
            }}
          >

            <h6 className="text-muted">
              🎯 Target Weight
            </h6>

            <h3>

              {healthData?.targetWeight != null
                ? `${healthData.targetWeight} kg`
                : "Not set"}

            </h3>

          </div>

        </div>


      </div>

    </>
  )
}

export default DashboardHome
