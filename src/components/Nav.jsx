/* eslint-disable no-unused-vars */
import { Link } from 'react-router-dom'
import Logo from './Logo'
import '../style/Nav.scss'
import '../style/NavResponsivity.scss'

//Icons
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import { BiWorld } from "react-icons/bi"

export default function Nav() {
    return (
        <>
            <header className='header_nav_horizontal'>
                <section className='header_section_nav'>
                    <AiOutlineMenu className='menuh_icon'/>
                    <Logo />
                </section>

                <aside className="header_aside_account">

                    <Link to='/signup'>
                        <button className='account_signup'>
                            Sign Up
                        </button>
                    </Link>
                    
                    <Link to='/signin'>
                        <button className='account_signin'>
                            Sign In
                        </button>
                    </Link>
                </aside>
            </header>
        
            <header className='header_nav_vertical'>
                <Logo />

                <ul className='nav_vertical_ul vertical_icon'>
                    <li><AiFillHome className='home_icon vertical_icon'/><p>Home</p></li>
                    <li><FaUser className='user_icon vertical_icon'/><p>Account</p></li>
                    <li><MdSettings className='sett_icon vertical_icon'/><p>Settings</p></li>
                    <li><BiWorld className='lang_icon vertical_icon'/><p>Language</p></li>
                </ul>

                <aside className="header_aside_account_vertical">

                    <Link to='/signup'>
                        <button className='account_signup'>
                            Sign Up
                        </button>
                    </Link>
                    
                    <Link to='/signin'>
                        <button className='account_signin'>
                            Sign In
                        </button>
                    </Link>
                </aside>
            </header>
        </> 
    )
}