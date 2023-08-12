import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import './Settings.scss'
import './SettingsResponsivity.scss'

//Icons
import { MdSettings } from "react-icons/md"

export default function Settings() {
    return (
        <>
        <Nav />
        <main className='settings_main'>
            <h2><MdSettings/>Settings</h2>
            <ul className='settings_main_options'>
                <li>
                    Change theme
                    <ul>
                        <li>
                            <button className='options_theme_button white_mode'>White mode</button>
                        </li>
                        <li>
                            <button className='options_theme_button dark_mode'>Dark mode</button>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </main>
        <Footer />
    </>
    )
}