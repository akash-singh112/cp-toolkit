import PropTypes from "prop-types";
import './navbar.css'
import { Link } from "react-router-dom";

function Navbar ({darkMode,toggleDarkMode}) {
    return (
        <nav className="navbar">
            <div className="logo">CP Toolkit 🚀</div>
            <Link to='/' className='atags' >Home</Link>
            <Link to='/about' className='atags' >About</Link>
            <button className="toggle-mode" onClick={toggleDarkMode}>{darkMode ? "🌙" : "🌞"}</button>
        </nav>
    )
}

Navbar.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired
};

export default Navbar;