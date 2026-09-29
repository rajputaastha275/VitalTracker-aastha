import React, { useState } from 'react'

const BMI = () => {
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [bmi, setBMI] = useState("")
    const [status, setStatus] = useState("")

    const calculateBMI = () => {
        if(!height || !weight) {
            alert("Enter height and weight")
            return;
        }
        const bmiValue = weight / ((height / 100) * (height / 100))
        setBMI(bmiValue.toFixed(1));

        if (bmiValue < 18.5) {
            setStatus("Underweight");
        } else if (bmiValue < 25) {
            setStatus("Healthy Weight");
        } else if (bmiValue < 30) {
            setStatus("Overweight");
        } else {
            setStatus("Obese");
        }
    }
  return (
    <>
    <div className="container mt-5 mb-5 d-flex justify-content-center">
        <div className="card p-4 w-50 shadow-sm rounded-4">
            <h2 className='text-center mb-4'>BMI Calculator</h2>
            <label className='form-label'>Height (cm)</label>
            <input type='number'
            className='form-control'
            placeholder='Enter height'
            value={height}
            onChange={(e) => setHeight(e.target.value)}/>

            <label className='form-label mt-3'>Weight (kg)</label>
            <input type='number'
            className='form-control '
            placeholder='Enter weight'
            value={weight}
            onChange={(e) => setWeight(e.target.value)}/>

            <div className="text-center">
                <button type="button" class="btn btn-dark mt-5" onClick={calculateBMI}>Calculate BMI</button>
            </div>

            {bmi && (
                <div className="card mt-4 p-3 text-center">
                    <h4>Your BMI : {bmi}</h4>
                    <p className='mb-0'>
                        <strong>Status : </strong>{status}
                    </p>
                </div>
            )}

        </div>

    </div>
    </>
  )
}

export default BMI