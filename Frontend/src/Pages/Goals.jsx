
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Goals = () => {

  const [targetWeight, setTargetWeight] = useState("")
  const [stepsGoal, setStepsGoal] = useState("")
  const [waterGoal, setWaterGoal] = useState("")

  const [savedGoals, setSavedGoals] = useState(null)

  const userId = localStorage.getItem("userId")


  // FETCH GOALS

  const fetchGoals = async () => {

    try {

      const response = await axios.get(
        `https://vitaltracker3.onrender.com/api/health/${userId}`
      )

      const data = response.data

      // Find the latest record containing goals
      const goalData = [...data]
        .reverse()
        .find(
          (item) =>
            item.targetWeight !== undefined ||
            item.stepsGoal !== undefined ||
            item.waterGoal !== undefined
        )

      if (goalData) {

        setSavedGoals(goalData)

        setTargetWeight(
          goalData.targetWeight ?? ""
        )

        setStepsGoal(
          goalData.stepsGoal ?? ""
        )

        setWaterGoal(
          goalData.waterGoal ?? ""
        )

      }

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

    }

  }


  useEffect(() => {

    if (userId) {
      fetchGoals()
    }

  }, [])


  // SAVE GOALS

  const handleSaveGoals = async () => {

    if (!targetWeight || !stepsGoal || !waterGoal) {

      alert("Please enter all goals")

      return
    }


    if (
      Number(targetWeight) < 0 ||
      Number(stepsGoal) < 0 ||
      Number(waterGoal) < 0
    ) {

      alert("Goals cannot be negative")

      return
    }


    try {

      const response = await axios.post(
        "https://vitaltracker3.onrender.com/api/health",
        {
          userId: userId,

          targetWeight: Number(targetWeight),

          stepsGoal: Number(stepsGoal),

          waterGoal: Number(waterGoal)
        }
      )


      console.log(
        "Goals saved:",
        response.data
      )


      setSavedGoals(
        response.data.healthData
      )


      alert("Goals saved successfully!")

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

      alert("Failed to save goals")

    }

  }


  return (
    <>

      <div className="container mt-4">

        <h3 className="fw-bold mt-5 mb-5">
          My Goals
        </h3>


        {/* INPUTS */}

        <div className="row g-3 mb-4">


          {/* TARGET WEIGHT */}

          <div className="col-md-4">

            <label className="form-label">
              Target Weight (kg)
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter target weight"
              value={targetWeight}
              onChange={(e) => {

                if (e.target.value >= 0) {
                  setTargetWeight(e.target.value)
                }

              }}
            />

          </div>


          {/* STEPS GOAL */}

          <div className="col-md-4">

            <label className="form-label">
              Steps Goal
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter steps goal"
              value={stepsGoal}
              onChange={(e) => {

                if (e.target.value >= 0) {
                  setStepsGoal(e.target.value)
                }

              }}
            />

          </div>


          {/* WATER GOAL */}

          <div className="col-md-4">

            <label className="form-label">
              Water Goal (glasses)
            </label>

            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="Enter water goal"
              value={waterGoal}
              onChange={(e) => {

                if (e.target.value >= 0) {
                  setWaterGoal(e.target.value)
                }

              }}
            />

          </div>

        </div>


        {/* SAVE BUTTON */}

        <div className="d-flex justify-content-center mb-5">

          <button
            type="button"
            className="btn btn-dark"
            onClick={handleSaveGoals}
          >
            Save Goals
          </button>

        </div>


        {/* SAVED GOALS */}

        <div className="row mt-3">


          {/* TARGET WEIGHT */}

          <div className="col-md-4">

            <div
              className="card card1 p-3 text-center"
              style={{
                backgroundColor: "#f5f5f5"
              }}
            >

              <h4>
                🎯 Target Weight
              </h4>

              <h3>
                {savedGoals?.targetWeight ??
                  (targetWeight !== ""
                    ? targetWeight
                    : 55)} kg
              </h3>

            </div>

          </div>


          {/* STEPS */}

          <div className="col-md-4">

            <div
              className="card card1 p-3 text-center"
              style={{
                backgroundColor: "#f5f5f5"
              }}
            >

              <h4>
                👣 Steps Goal
              </h4>

              <h3>
                {savedGoals?.stepsGoal ??
                  (stepsGoal !== ""
                    ? stepsGoal
                    : 10000)}
              </h3>

            </div>

          </div>


          {/* WATER */}

          <div className="col-md-4">

            <div
              className="card card1 p-3 text-center"
              style={{
                backgroundColor: "#f5f5f5"
              }}
            >

              <h4>
                💧 Water Intake
              </h4>

              <h3>
                {savedGoals?.waterGoal ??
                  (waterGoal !== ""
                    ? waterGoal
                    : 8)} glasses
              </h3>

            </div>

          </div>


        </div>

      </div>

    </>
  )
}

export default Goals

