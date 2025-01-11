import PropTypes from "prop-types"
import './toggleButton.css'

export function ToggleButton ({darkMode,toggleDarkMode}) {
    return (
        <>
            <label className="toggle-container">
                <input
                    type="checkbox"
                    className="toggle-mode"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
                <span className="toggle-slider"></span>
            </label>
        </>
    )
}

ToggleButton.propTypes = {
    darkMode: PropTypes.bool.isRequired,
    toggleDarkMode: PropTypes.func.isRequired
};
