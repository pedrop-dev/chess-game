/* eslint-disable react/prop-types */
import Nav from '../../components/Nav'
import './Settings.scss'
import './SettingsResponsivity.scss'
import Footer from '../../components/Footer'

//Icons
import { MdSettings } from "react-icons/md"

export default function Settings({ changeTheme }) {

    return (
        <> 
        <Nav />
        <div className="background_control">
            <main className='settings_main'>
                <h2><MdSettings/>Settings</h2>
                <ul className='settings_main_options'>
                    <li>
                        <h3>Change theme</h3>
                        <ul>
                            <li>
                                <a
                                    className='options_theme_button white_mode'
                                    onClick={changeTheme}>
                                    Change Theme
                                </a>
                            </li>
                        </ul>
                    </li>
            
                </ul>
            </main>
            <Footer />
        </div>
    </>
    )
}