import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
    <header>
        <nav>
            <ul>
                <li><Link to=''>Venues</Link></li>
                <li><Link to='/create_venue'>Create Venue</Link></li>
                <li><Link to='/update_venue'>Update Venue</Link></li>
            </ul>
        </nav>
    </header>
)

export default Header