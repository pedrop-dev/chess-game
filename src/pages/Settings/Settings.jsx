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
                    <h3>Change theme</h3>
                    <ul>
                        <li>
                            <a className='options_theme_button white_mode'>White mode</a>
                        </li>
                        <li>
                            <a className='options_theme_button dark_mode'>Dark mode</a>
                        </li>
                    </ul>
                </li>
                
            </ul>
        </main>
        <Footer />
    </>
    )
}