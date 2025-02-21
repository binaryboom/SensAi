import { SignIn } from '@clerk/clerk-react'
import React from 'react'

const login = () => {
  return (
    <div className='flex justify-center pt-40'>
      <SignIn signInUrl='/login' signUpUrl='/signup'/>
    </div>
  )
}

export default login
