import './heroTopic.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

function HeroTopic ({Topic}) {
    return (
        <>
            <div className="hero">
                <div className="hero-content">
                    <h3>{Topic}</h3>
                    <Link to='/about' className="cta-btn">Learn More</Link>
                </div>
            </div>
        </>
    )
}

HeroTopic.propTypes = {
    Topic: PropTypes.string.isRequired
};

export default HeroTopic