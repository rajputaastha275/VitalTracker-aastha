import React, { useState } from 'react'
import logo from "../assets/Logo.png"
import { FaUserCircle, FaRobot } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NavBar = ({ showIcons = false }) => {

  const navigate = useNavigate()

  const [showAI, setShowAI] = useState(false)
  const [analysis, setAnalysis] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const getAIAnalysis = async () => {

    try {

      setLoading(true)
      setError("")
      setAnalysis("")

      const userId = localStorage.getItem("userId")

      if (!userId) {
        setError("User information not found.")
        return
      }

      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          userId: userId
        }
      )

      if (response.data.success) {
        setAnalysis(response.data.analysis)
      } else {
        setError("Unable to generate analysis.")
      }

    } catch (error) {

      console.error("AI Error:", error)

      setError(
        error.response?.data?.message ||
        "Something went wrong while generating your analysis."
      )

    } finally {

      setLoading(false)

    }

  }


  return (
    <>

      <nav className="navbar navbar-light bg-light">

        <div className="container-fluid">

          <a
            className="navbar-brand d-flex align-items-center"
            href="#"
          >

            <img
              src={logo}
              alt="VitalTracker Logo"
              width="40"
              height="40"
              className="me-2"
            />

            <h1 className="m-0 fs-3">
              VitalTracker
            </h1>

          </a>


          {showIcons && (

            <div className="d-flex align-items-center">

              <FaUserCircle
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/profile")}
              />

            </div>

          )}

        </div>

      </nav>


      {showIcons && (

        <>

          {/* AI Floating Button */}

          <button
            onClick={() => setShowAI(!showAI)}
            style={{
              position: "fixed",
              bottom: "25px",
              right: "25px",
              width: "55px",
              height: "55px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#6c757d",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              zIndex: 1001
            }}
          >

            <FaRobot size={25} />

          </button>


          {/* AI Panel */}

          {showAI && (

            <div
              style={{
                position: "fixed",
                bottom: "95px",
                right: "25px",
                width: "350px",
                maxHeight: "500px",
                overflowY: "auto",
                backgroundColor: "white",
                borderRadius: "15px",
                padding: "20px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                zIndex: 1000
              }}
            >

              <h5>
                🤖 AI Health Coach
              </h5>

              <p>
                Get personalized insights based on your VitalTracker data.
              </p>


              <button
                className="btn btn-secondary"
                onClick={getAIAnalysis}
                disabled={loading}
              >

                {loading
                  ? "Analyzing..."
                  : "Analyze My Progress"
                }

              </button>


              {error && (

                <p className="text-danger mt-3">
                  {error}
                </p>

              )}


              {analysis && (

                <div className="mt-3">

                  <hr />

                  <div style={{ whiteSpace: "pre-line" }}>
                    {analysis}
                  </div>

                </div>

              )}

            </div>

          )}

        </>

      )}

    </>
  )
}

export default NavBar