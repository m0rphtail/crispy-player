import React from 'react'
import './separator.css'
import shuffle from '../../assets/shuffle.png'

function Separator() {
    return (
        <div className="separator-container">
            <div className="separator-circle">
                <img src={shuffle} alt="shuffle" width="30" />
            </div>
        </div>
    )
}

export default Separator
