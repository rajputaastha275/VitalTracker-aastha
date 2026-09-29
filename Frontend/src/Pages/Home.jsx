
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NavBar from '../Components/NavBar'
import homeImage from '../assets/home.png'

const Home = () => {

    const navigate = useNavigate()

    const Login = () => {
        navigate("/login")
    }

    const Signup = () => {
        navigate("/signup")
    }

    return (
        <>
            <NavBar />

            <div className="container vh-100 d-flex align-items-center">

                <div className="row align-items-center w-100">

                    {/* Left Section */}
                    <div className="col-md-6 text-center text-md-start">

                        <h1>
                            Track Your Health.
                            <br />
                            Build Better Habits.
                        </h1>

                        <p className="fs-5 fw-light mt-3">
                            VitalTracker helps you monitor your daily wellness,
                            maintain healthy routines and stay motivated.
                        </p>

                        <p className="fw-light mt-4">
                            🤖 <strong>AI-powered health insights</strong>
                        </p>


                        <div className="d-flex justify-content-center justify-content-md-start gap-3 mt-5">

                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-4 px-4"
                                onClick={Login}
                            >
                                Login
                            </button>


                            <button
                                type="button"
                                className="btn btn-outline-dark rounded-4 px-4"
                                onClick={Signup}
                            >
                                Signup
                            </button>

                        </div>

                    </div>


                    {/* Right Section */}
                    <div className="col-md-6 d-flex justify-content-center mt-5 mt-md-0">

                        <img
                            src={homeImage}
                            alt="Personalized workout"
                            className="img-fluid"
                            style={{ maxWidth: "500px" }}
                        />

                    </div>

                </div>

            </div>

        </>
    )
}

export default Home
