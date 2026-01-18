import React from 'react';
import './Crosshair.css';

const Crosshair = ({ x, y }) => {
    // If no coordinates, don't render or render off-screen
    if (x === 0 && y === 0) return null;

    return (
        <div
            className="crosshair"
            style={{ left: x, top: y }}
        />
    );
};

export default Crosshair;
