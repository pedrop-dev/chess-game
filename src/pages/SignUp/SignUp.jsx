import HeaderAccount from '../../components/HeaderAccount'
import '../SignUp/SignUp.scss'
import '../SignUp/SignUpResponsivity.scss'
import { API_BASE_URL } from "../../constants.js"
import { useState } from 'react'
import Footer from '../../components/Footer'

//Icons
import { MdEmail, MdLock } from "react-icons/md";
import { BsFillPersonFill } from 'react-icons/bs'

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${API_BASE_URL}/api/signup`, {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: password,
                username: username
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.hasOwnProperty("result") && data.result === "success") {
                    alert("User registered, check your email to confirm");
                }
            });
    }

    return (
        <>
            <HeaderAccount />
            <main className='main_signup'>
                <section className="signup_section">
                    <h1 className='section_signup_h1'>
                        Enter your email and <br />password
                    </h1>
                    <p className='section_signup_p'>
                        Sign up allows you to <br /> create an account
                    </p>
                </section>

                <form className="main_form_signup" onSubmit={handleSubmit}>
                    <div>
                        <BsFillPersonFill className="email_pass_icons" />
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Username"
                            className="form_signup_text" />
                    </div>
                    <div>
                        <MdEmail className='email_pass_icons' />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder='Email'
                            className='form_signup_text'
                            name="email"
                        />
                    </div>

                    <div>
                        <MdLock className='email_pass_icons' />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder='Password'
                            className='form_signup_text'
                            name="password"
                        />
                    </div>

                    <input
                        type="submit"
                        value="Sign up"
                        className='form_signup_submit'
                    />
                </form>
            </main>
            <Footer />
        </>
    )
}
