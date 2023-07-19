/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom'
import '../style/Footer.scss'
import '../style/FooterResponsivity.scss'
import Logo from './Logo'

//Icons
import { AiFillGithub } from "react-icons/ai"
import { BsLinkedin } from "react-icons/bs"
import { BiLogoDiscord } from "react-icons/bi"

export default function Footer() {
    return (
        <footer className='footer_component'>
            <section className="footer_section">
                {/*<div className="section_logo_wrapper">
                    <FaChessPawn className='pawn_icon'/>
                    <h2>Chess</h2>
                </div>*/}
                <Logo />
            </section>

            <section className="footer_section">
                <h2>Contact</h2>
                <ul>
                    <li><a href="mailto:contact@gmail.com">contact@gmail.com</a></li>
                    <li><a href="mailto:contact@gmail.com">contact@gmail.com</a></li>
                    <li><a href="mailto:contact@gmail.com">contact@gmail.com</a></li>
                </ul>
            </section>

            <section className="footer_section">
                <h2>About Us</h2>
                <ul>
                    <li>Help</li>
                    <li>Features</li>
                    <li>Privacy</li>
                </ul>
            </section>

            <section className="footer_section">
                <h2>Social</h2>
                <div className="section_icons_wrapper">
                    <a href="#">
                        <AiFillGithub className='github_icon footer_icons'/>
                    </a>
                    <a href="#">
                        <BsLinkedin className='linkedin_icon footer_icons'/>
                    </a>
                    <a href="#">
                        <BiLogoDiscord className='discord_icon footer_icons'/>
                    </a>
                </div>
            </section>
        </footer>
    )
}