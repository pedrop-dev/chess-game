import HeaderAccount from '../../components/HeaderAccount'
import Footer from '../../components/Footer'
import '../SignIn/SignIn.scss'
import '../SignIn/SignInResponsivity.scss'

//Icons
import { MdEmail, MdLock } from "react-icons/md";

export default function SignIn() {
    return (
        <>
            <HeaderAccount/>
            <main className='main_signin'>
                <section className="signin_section">
                    <h1 className='section_signin_h1'>
                        Enter your email and <br/>password
                    </h1>
                    <p className='section_signin_p'>
                        Sign in allows you to <br/> access your account
                    </p>
                </section>

                <form className="main_form_signin">
                    <div>
                        <MdEmail className='email_pass_icons'/>
                        <input
                            type="text"
                            placeholder='Email'
                            className='form_signin_text'
                        />
                    </div>

                    <div>
                        <MdLock className='email_pass_icons'/>
                        <input
                            type="text"
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
            <Footer/>
        </>
    )
}