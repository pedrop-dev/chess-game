import { Link } from 'react-router-dom'
import '../style/HeaderAccount.scss'
import Logo from './Logo'

import { FaArrowLeft } from 'react-icons/fa'

export default function HeaderAccount() {
    return (
        <header className="create_account_header">
            <Link to='/' >
                <FaArrowLeft className='arrow_left_icon'/>
            </Link>
            
            <div className="create_account_logo">
                <Logo/>
            </div>
        </header>
    )
}