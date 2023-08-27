/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import './Home.scss'
import './HomeResponsivity.scss'
import io from 'socket.io-client'
import { API_BASE_URL } from '../../constants.js'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

//Icons 
import { FaChessPawn } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"

const socket = io(API_BASE_URL)


export default function Home() {

    const handleJoinRoom = () => {
        const token = localStorage.getItem('token');
        if (token === null || token == undefined) {
            console.log('user not logged in');
            return;
        }
        socket.emit('join_room', { token })
        console.log("JOINING ROOM")
    }

    useEffect(() => {
        socket.on("success_join_room", (data) => {
            window.location.href = "/play-game?" + new URLSearchParams({ room: data.room });
        }, [])
    })

    return (
        <>
            <Nav />
            <div className="background_control">
                <main className='home_main'>
                    <h1 className='home_main_h1'>Play Chess!</h1>
                    <section className='home_main_section'>
                        <Link to='/play-game'>
                            <button className='home_section_online home_buttons' onClick={handleJoinRoom}>
                                <FaChessPawn />Play Online
                            </button>
                        </Link>
                        <Link to='/play-bot'>
                            <button className='home_section_computer home_buttons'>
                                <FaRobot />Play Computer
                            </button>
                        </Link>
                    </section>
                    <section className='home_second_section'>
                        <p>Let's play</p>
                        <div className='home_board'>
                            <img src="../../chessboard.png" alt="chess-board image" />
                        </div>
                    </section>
                </main>
            </div>
            <Footer />
        </>
    )
}
