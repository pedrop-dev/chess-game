import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import './Home.scss'
import io from 'socket.io-client'
import { API_BASE_URL } from '../../constants.js'
import { useState, useEffect } from 'react'

//Icons 
import { FaChessPawn } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"

const socket = io(API_BASE_URL)


export default function Home() {
    const [username, setUsername] = useState('')

    const handleJoinRoom = () => {
      socket.emit('join_room', { username })
      console.log("JOINING ROOM")
    }

    useEffect(() => {
    socket.on("success_join_room", (data) => {
      localStorage.setItem('username', username);
      window.location.href = "/play-game?" + new URLSearchParams({room: data.room});
    }, [])
  })

    return (
        <>
            <Nav />
            <main className='home_main'>
                <h1 className='home_main_h1'>Play Chess!</h1>
                <section className='home_main_section'>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    <button className='home_section_online home_buttons' onClick={handleJoinRoom}>
                        <FaChessPawn/>Play Online
                    </button>

                    <button className='home_section_computer home_buttons'>
                        <FaRobot/>Play Computer
                    </button>
                </section>
                <section>
                </section>

            </main>
            <Footer />
        </>
    )
}
