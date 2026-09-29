
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Steps = () => {

  const [steps, setSteps] = useState("")
  const [stepsData, setStepsData] = useState([])
  const [stepsGoal, setStepsGoal] = useState(10000)

  const userId = localStorage.getItem("userId")


  const fetchStepsData = async () => {

    try {

      const response = await axios.get(
        `https://vitaltracker3.onrender.com/api/health/${userId}`
      )

      const data = response.data


      // Only step records

      const filteredData = data.filter(
        (item) =>
          item.steps !== undefined &&
          item.steps !== null
      )

      setStepsData(filteredData)


      // Find latest saved steps goal

      const goalData = [...data]
        .reverse()
        .find(
          (item) =>
            item.stepsGoal !== undefined &&
            item.stepsGoal !== null
        )


      if (goalData) {

        setStepsGoal(
          Number(goalData.stepsGoal)
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
      fetchStepsData()
    }

  }, [])


  const handleSaveSteps = async () => {

    if (!steps) {

      alert("Please enter today's steps")

      return

    }


    try {

      await axios.post(
        "https://vitaltracker3.onrender.com/api/health",
        {
          userId: userId,
          steps: Number(steps)
        }
      )


      alert("Steps saved successfully!")

      setSteps("")

      fetchStepsData()

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

      alert("Failed to save steps")

    }

  }


  return (
    <>

      <h3 className='fw-bold mt-5 mb-4'>
        Steps Tracker
      </h3>


      <p className="text-muted">
        Daily Goal: {stepsGoal.toLocaleString()} steps
      </p>


      <input
        type='number'
        className='form-control'
        placeholder="Enter today's steps"
        value={steps}
        onChange={(e) =>
          setSteps(e.target.value)
        }
      />


      <div className="d-flex justify-content-center mt-4">

        <button
          type="button"
          className="btn btn-dark"
          onClick={handleSaveSteps}
        >
          Add Steps
        </button>

      </div>


      <table className="table table-hover mt-4 text-center">

        <thead>

          <tr>

            <th scope="col">
              Date
            </th>

            <th scope="col">
              Steps
            </th>

            <th scope="col">
              Remaining Steps
            </th>

          </tr>

        </thead>


        <tbody>

          {stepsData.map((item) => {

            const currentSteps =
              Number(item.steps) || 0


            const remainingSteps =
              Math.max(
                stepsGoal - currentSteps,
                0
              )


            return (

              <tr key={item._id}>

                <th scope="row">

                  {new Date(
                    item.date
                  ).toLocaleDateString()}

                </th>


                <td>

                  {currentSteps.toLocaleString()}

                </td>


                <td>

                  {remainingSteps === 0

                    ? "Goal Achieved ✅"

                    : remainingSteps.toLocaleString()

                  }

                </td>

              </tr>

            )

          })}

        </tbody>

      </table>

    </>

  )

}

export default Steps
