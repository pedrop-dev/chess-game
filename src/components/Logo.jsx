import '../style/Logo.scss'

import { FaChessPawn } from "react-icons/fa"

export default function Logo() {
    return (
        <div className="logo_wrapper">
            <FaChessPawn className='pawn_icon'/>
            <h2>Chess</h2>
        </div>
    )
}