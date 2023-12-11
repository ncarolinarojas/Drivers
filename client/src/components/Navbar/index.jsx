import { NavLink } from "react-router-dom";
import '../Navbar/navbar.css';
import Logo from '../../assets/Logo.svg';

function Navbar() {
    return (
        <div className='container-nav'>
            <div>
                <img src={Logo} alt="logo-app" className='image'/>
            </div>
            <div className='options'>
                <div>
                    <ul>
                        <li >
                            <NavLink to={'/home'} className='link'>Home</NavLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='link'>
                            <NavLink to={'/createDriver'} className='link'>Create driver</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar