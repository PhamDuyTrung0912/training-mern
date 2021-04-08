import React from 'react'
import LoginForm from '../component/auth/LoginForm'
import RegisterForm from '../component/auth/RegisterForm'

const Auth = ({ authRouter }) => {
    return (
        <>
            Learn it ~~
            {
                authRouter === "login" && <LoginForm />
            }
            {
                authRouter === "register" && <RegisterForm />
            }
        </>
    )
}

export default Auth
