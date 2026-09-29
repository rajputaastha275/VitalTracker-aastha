
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import NavBar from '../Components/NavBar'

const UserDetails = () => {

  const navigate = useNavigate()

  const [age, setAge] = useState("")
  const [gender, setGender] = useState("")
  const [height, setHeight] = useState("")
  const [weight, setWeight] = useState("")
  const [targetWeight, setTargetWeight] = useState("")


  // Get existing user data
  useEffect(() => {

    const userId = localStorage.getItem("userId")

    if (!userId) {
      navigate("/login")
      return
    }

    const fetchUser = async () => {

      try {

        const response = await axios.get(
          `https://vitaltracker3.onrender.com/api/users/${userId}`
        )

        const user = response.data.user

        setAge(user.age || "")
        setGender(user.gender || "")
        setHeight(user.height || "")
        setWeight(user.weight || "")
        setTargetWeight(user.targetWeight || "")

      } catch (error) {

        console.log(
          error.response?.data ||
          error.message
        )

      }

    }

    fetchUser()

  }, [navigate])


  // Save updated details
  const handleSave = async (e) => {

    e.preventDefault()

    const userId = localStorage.getItem("userId")

    if (!userId) {
      alert("User ID not found. Please login again.")
      navigate("/login")
      return
    }

    try {

      await axios.put(
        `https://vitaltracker3.onrender.com/api/users/${userId}`,
        {
          age: Number(age),
          gender,
          height: Number(height),
          weight: Number(weight),
          targetWeight: Number(targetWeight)
        }
      )

      alert("Profile saved successfully!")

      navigate("/dashboard")

    } catch (error) {

      console.log(
        error.response?.data ||
        error.message
      )

      alert(
        error.response?.data?.message ||
        "Failed to save profile"
      )

    }

  }


  return (
    <>
      <NavBar />

      <h1 className='mt-5 mb-0 text-center'>
        Complete Your Profile
      </h1>

      <p className='text-center text-muted'>
        Help us personalize your health tracking experience.
      </p>


      <div className="container mt-4">

        <div className="row justify-content-center">

          <div
            className="col-md-6 rounded-3 p-4"
            style={{ backgroundColor: "#f5f5f5" }}
          >

            <form onSubmit={handleSave}>


              {/* Age */}

              <label className='fw-normal fs-5 mt-3'>
                Age
              </label>

              <input
                type='number'
                min='0'
                className='form-control mt-1'
                placeholder='Enter age'
                value={age}
                onChange={(e) => {

                  if (e.target.value >= 0) {
                    setAge(e.target.value)
                  }

                }}
                required
              />


              {/* Gender */}

              <label className='fw-normal fs-5 mt-4'>
                Gender
              </label>

              <select
                className='form-select mt-1'
                value={gender}
                onChange={(e) =>
                  setGender(e.target.value)
                }
                required
              >

                <option value="">
                  Select gender
                </option>

                <option value="Male">
                  Male
                </option>

                <option value="Female">
                  Female
                </option>

                <option value="Other">
                  Other
                </option>

                <option value="Prefer not to say">
                  Prefer not to say
                </option>

              </select>


              {/* Height */}

              <label className='fw-normal fs-5 mt-4'>
                Height (in cm)
              </label>

              <input
                type='number'
                min='0'
                className='form-control mt-1'
                placeholder='Enter height in cm'
                value={height}
                onChange={(e) => {

                  if (e.target.value >= 0) {
                    setHeight(e.target.value)
                  }

                }}
                required
              />


              {/* Weight */}

              <label className='fw-normal fs-5 mt-4'>
                Current Weight
              </label>

              <input
                type='number'
                min='0'
                className='form-control mt-1'
                placeholder='Enter current weight'
                value={weight}
                onChange={(e) => {

                  if (e.target.value >= 0) {
                    setWeight(e.target.value)
                  }

                }}
                required
              />


              {/* Target Weight */}

              <label className='fw-normal fs-5 mt-4'>
                Target Weight
              </label>

              <input
                type='number'
                min='0'
                className='form-control mt-1'
                placeholder='Enter target weight'
                value={targetWeight}
                onChange={(e) => {

                  if (e.target.value >= 0) {
                    setTargetWeight(e.target.value)
                  }

                }}
                required
              />


              <button
                type="submit"
                className="btn btn-dark w-100 mt-5 mb-3"
              >
                Save & Continue
              </button>


            </form>

          </div>

        </div>

      </div>
    </>
  )
}

export default UserDetails
