import PropTypes from "prop-types";
import './navbar.css'
import { Link } from "react-router-dom";
import { ToggleButton } from "./toggleButton";
import { useEffect, useState } from "react";

function Navbar ({darkMode,toggleDarkMode,Topic}) {
    const [isScrolled,setIsScrolled] = useState(false);

    useEffect(()=>{
        function handleScroll () {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll',handleScroll);

        return () => {
            window.removeEventListener('scroll',handleScroll);
        };
    },[]);

    return (
        <div className="wholee">
            <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
                <div className="logo" style={{fontSize: '20px'}}>CP Toolkit 🚀</div>
                <div className="fb45">
                    <Link to='/' className='atags'>Home</Link>
                    <Link to='/about' className='atags'>About</Link>
                    <Link to='#' className="atags">Contact Us</Link>
                    <Link to='/feedback' className="atags">Feedback</Link>
                </div>
                <ToggleButton darkMode={darkMode} toggleDarkMode={toggleDarkMode}/>
            </nav>
            <br />
            <br />
            <div className="hero">
                <div className="hero-content">
                    <h3>{Topic}</h3>
                    <Link to='/about' className="cta-btn">Learn More</Link>
                </div>
            </div>
        </div>
    )
}

Navbar.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired,
    Topic: PropTypes.string.isRequired
};

export default Navbar;