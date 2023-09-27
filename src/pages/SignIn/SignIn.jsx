/* eslint-disable no-prototype-builtins */
import HeaderAccount from '../../components/HeaderAccount'
import '../SignIn/SignIn.scss'
import '../SignIn/SignInResponsivity.scss'
import { API_BASE_URL } from "../../constants.js"
import { useState } from "react"
import Footer from '../../components/Footer'
import { toast } from 'react-toastify'
import { useContext } from 'react'

//Icons
import { MdEmail, MdLock } from "react-icons/md";
import { BsFillPersonFill } from 'react-icons/bs'
import { ThemeContext } from '../../App'

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const { theme } = useContext(ThemeContext)

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/api/login`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.hasOwnProperty("access_token")) {
                    localStorage.setItem("token", data.access_token);
                    localStorage.setItem('username', username)
                    toast.success("Successful Login", {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: theme,
                    })
                }
            })
    }
    return (
        <>
            <HeaderAccount />
            <main className='main_signin'>
                <section className="signin_section">
                    <h1 className='section_signin_h1'>
                        Enter your email and <br />password
                    </h1>
                    <p className='section_signin_p'>
                        Sign in allows you to <br /> access your account
                    </p>
                </section>

                <form className="main_form_signin" onSubmit={handleSubmit}>
                    <div>
                        <BsFillPersonFill className="email_pass_icons" />
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="form_signin_text" />
                    </div>
                    <div>
                        <MdEmail className='email_pass_icons' />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            className='form_signin_text'
                        />
                    </div>

                    <div>
                        <MdLock className='email_pass_icons' />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='form_signin_text'
                        />
                    </div>

                    <input
                        type="submit"
                        value="Sign in"
                        className='form_signin_submit'
                    />
                </form>
            </main>
            <Footer />
        </>
    )
}
