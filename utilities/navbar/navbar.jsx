import PropTypes from "prop-types";
import './navbar.css'
import { Link } from "react-router-dom";
import { ToggleButton } from "./toggleButton";

function Navbar ({darkMode,toggleDarkMode}) {
    return (
        <nav className="navbar">
            <div className="logo">CP Toolkit 🚀</div>
            <Link to='/' className='atags' >Home</Link>
            <Link to='/about' className='atags' >About</Link>
            <ToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
        </nav>
    )
}

Navbar.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired
};

export default Navbar;