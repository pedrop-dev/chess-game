/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import '../style/Nav.scss'
import '../style/NavResponsivity.scss'

//Icons
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { FaUser } from "react-icons/fa"
import { MdSettings } from "react-icons/md"
import { BiWorld } from "react-icons/bi"
import { SiGoogleanalytics } from "react-icons/si"

export default function Nav() {

    const [openNav, setOpenNav] = useState(false)

    const changeNav = () => {
        setOpenNav((curr) => !curr)
    }

    return (
        <>
            <nav className='header_nav_horizontal'>
                <div className="fixed_header_container">
                    <section className='header_section_nav'>
                        <AiOutlineMenu className='menuh_icon' onClick={changeNav} />
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
                </div>
            </nav>

            {openNav && 
                <nav className='nav_res_container'>
                    <ul className='nav_horizontal_ul'>
                        <Link to='/'>
                            <li><AiFillHome className='home_icon horizontal_icon' /><p>Home</p></li>
                        </Link>

                        <li><FaUser className='user_icon horizontal_icon' /><p>Account</p></li>

                        <Link to='/settings'>
                            <li><MdSettings className='sett_icon horizontal_icon' /><p>Settings</p></li>
                        </Link>

                        <li><BiWorld className='lang_icon horizontal_icon' /><p>Language</p></li>

                        <Link to='/game-analysis' >
                            <li className='game-analysis-width'><SiGoogleanalytics className='sett_icon horizontal_icon' /><p>Game analysis</p></li>
                        </Link>
                    </ul>
                </nav>
            }

            <header className='header_nav_vertical'>
                <Logo />

                <ul className='nav_vertical_ul vertical_icon'>
                    <Link to='/'>
                        <li><AiFillHome className='home_icon vertical_icon' /><p>Home</p></li>
                    </Link>
                    <li><FaUser className='user_icon vertical_icon' /><p>Account</p></li>
                    <Link to='/settings'>
                        <li><MdSettings className='sett_icon vertical_icon' /><p>Settings</p></li>
                    </Link>
                    <li><BiWorld className='lang_icon vertical_icon' /><p>Language</p></li>

                    <Link to='/game-analysis'>
                        <li><SiGoogleanalytics className='sett_icon vertical_icon' /><p>Game analysis</p></li>
                    </Link>
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
