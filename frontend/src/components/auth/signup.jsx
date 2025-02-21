import { SignUp } from '@clerk/clerk-react'
import React from 'react'

const signup = () => {
  return (
    <div className='flex justify-center pt-40'>
      <SignUp signInUrl='/login' signUpUrl='/signup'  />
    </div>
  )
}

export default signup
