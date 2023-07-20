import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import './Home.scss'

//Icons 
import { FaChessPawn } from "react-icons/fa"
import { FaRobot } from "react-icons/fa"

export default function Home() {
    return (
        <>
            <Nav />
            <main className='home_main'>
                <h1 className='home_main_h1'>Play Chess!</h1>
                <section className='home_main_section'>
                    <button className='home_section_online home_buttons'>
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