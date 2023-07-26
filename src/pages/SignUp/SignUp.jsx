import HeaderAccount from '../../components/HeaderAccount'
import Footer from '../../components/Footer'
import '../SignUp/SignUp.scss'
import '../SignUp/SignUpResponsivity.scss'

export default function SignUp() {
    return (
        <>
            <HeaderAccount/>
            <main className='main_signup'>
                <section className="signup_section">
                    <h1 className='section_signup_h1'>
                        Enter your email and <br/>password
                    </h1>
                    <p className='section_signup_p'>
                        Sign up allows you to <br/> create an account
                    </p>
                </section>

                <form className="main_form_signup">
                    <input 
                        type="text" 
                        placeholder='Email'
                        className='form_signup_text'
                    />

                    <input 
                        type="text" 
                        placeholder='Password'
                        className='form_signup_text'
                    />

                    <input 
                        type="submit" 
                        value="Sign up"
                        className='form_signup_submit'
                    />
                </form>
            </main>
            <Footer/>
        </>
    )
}