
import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weight = () => {

  const [weight, setWeight] = useState("")
  const [weightData, setWeightData] = useState([])

  const userId = localStorage.getItem("userId")


  const fetchWeightData = async () => {

    try {

      const response = await axios.get(
        `https://vitaltracker3.onrender.com/api/health/${userId}`
      )

      // Only show records that contain weight
      const filteredData = response.data.filter(
        (item) =>
          item.weight !== undefined &&
          item.weight !== null
      )

      setWeightData(filteredData)

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

    }

  }


  useEffect(() => {

    if (userId) {
      fetchWeightData()
    }

  }, [])


  const handleSaveWeight = async () => {

    if (!weight) {

      alert("Please enter your weight")

      return
    }


    try {

      await axios.post(
        "https://vitaltracker3.onrender.com/api/health",
        {
          userId: userId,
          weight: Number(weight)
        }
      )


      alert("Weight saved successfully!")

      setWeight("")

      fetchWeightData()

    } catch (error) {

      console.log(
        error.response?.data || error.message
      )

      alert("Failed to save weight")

    }

  }


  return (
    <>

      <h3 className='fw-bold mt-5 mb-4'>
        Weight Tracker
      </h3>


      <input
        type='number'
        className='form-control'
        placeholder="Enter today's weight"
        value={weight}
        onChange={(e) =>
          setWeight(e.target.value)
        }
      />


      <div className="d-flex justify-content-center mt-4">

        <button
          type="button"
          className="btn btn-dark"
          onClick={handleSaveWeight}
        >
          Save Weight
        </button>

      </div>


      <table className="table table-hover text-center mt-4">

        <thead>

          <tr>
            <th scope="col">Date</th>
            <th scope="col">Weight (in kg)</th>
          </tr>

        </thead>


        <tbody>

          {weightData.map((item) => (

            <tr key={item._id}>

              <th scope="row">
                {new Date(
                  item.date
                ).toLocaleDateString()}
              </th>

              <td>
                {item.weight} kg
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </>
  )
}

export default Weight;
