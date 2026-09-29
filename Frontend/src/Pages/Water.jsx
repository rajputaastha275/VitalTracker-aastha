
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Water = () => {

  const [water, setWater] = useState("")
  const [waterData, setWaterData] = useState([])

  const userId = localStorage.getItem("userId")


  const fetchWaterData = async () => {

    try {

      const response = await axios.get(
        `https://vitaltracker3.onrender.com/api/health/${userId}`
      )

      const filteredData = response.data.filter(
        (item) =>
          item.water !== undefined &&
          item.water !== null
      )

      setWaterData(filteredData)

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

    }

  }


  useEffect(() => {

    if (userId) {
      fetchWaterData()
    }

  }, [])


  const handleAddWater = async () => {

    if (!water) {

      alert("Please enter water intake")

      return

    }


    try {

      await axios.post(
        "https://vitaltracker3.onrender.com/api/health",
        {
          userId,
          water: Number(water)
        }
      )


      alert("Water intake saved successfully!")

      setWater("")

      fetchWaterData()

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

      alert("Failed to save water intake")

    }

  }


  // Today's date

  const today = new Date().toLocaleDateString()


  // Find today's record

  const todayData = waterData.find(
    (item) =>
      new Date(item.date).toLocaleDateString() === today
  )


  // Today's total water

  const todayWater = todayData
    ? Number(todayData.water)
    : 0


  return (
    <>

      <h3 className='fw-bold mt-5 mb-4'>
        Water Intake Tracker
      </h3>


      {/* Today's total */}

      <div
        className="card p-3 mb-4 text-center"
        style={{ backgroundColor: "#f5f5f5" }}
      >

        <h5 className="text-muted">
          💧 Today's Water Intake
        </h5>

        <h2 className="fw-bold">
          {todayWater} / 8 Glasses
        </h2>

      </div>


      <input
        type='number'
        className='form-control'
        placeholder="Enter water intake"
        value={water}
        onChange={(e) => setWater(e.target.value)}
      />


      <div className="d-flex justify-content-center mt-4">

        <button
          type="button"
          className="btn btn-dark"
          onClick={handleAddWater}
        >
          Add water
        </button>

      </div>


      <table className="table table-hover text-center mt-4">

        <thead>

          <tr>
            <th>Date</th>
            <th>Water Intake (glasses)</th>
          </tr>

        </thead>


        <tbody>

          {waterData.map((item) => (

            <tr key={item._id}>

              <td>
                {new Date(item.date).toLocaleDateString()}
              </td>

              <td>
                {item.water}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  )
}

export default Water
