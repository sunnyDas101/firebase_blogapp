import React from 'react'
import { useNavigate } from 'react-router-dom'

const VerifyEmail = () => {
    const navigate = useNavigate()

  return (
    <div className="container-fluid mb-4">
        <div className="container">
        <h2>Email Verification</h2>
      <p>
        Thank you for signing up! To complete the registration process, please
        verify your email address by checking your inbox.
      </p>
      <button className="btn btn-sign-in" onClick={()=> navigate("/auth")}>Back to login</button>
        </div>
    </div>
  )
}

export default VerifyEmail