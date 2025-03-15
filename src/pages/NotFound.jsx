import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">404 | Page Not Found</h1>
      <Link to="/home" className="btn bg-red-500 text-white hover:bg-red-600">
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound