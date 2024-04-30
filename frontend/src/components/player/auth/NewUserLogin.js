import React, { useState } from 'react'
import SignUp from './SignUp'
import SuccessfulRegistration from './SuccessfulRegistration'

const NewUserLogin = () => {
  const [succLogin, setSuccLogin] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center px-10 py-10">
      {succLogin ? <SuccessfulRegistration /> : <SignUp setSuccLogin={setSuccLogin} />}
    </div>
  )
}

export default NewUserLogin