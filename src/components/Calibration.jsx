import React, { useState, useEffect } from 'react';
import './Calibration.css';

const Calibration = ({ onCalibrationComplete }) => {
    // 9 points distributed: Top-Left, Top-Center, Top-Right, etc.
    // Using percentages to distribute across window
    const points = [
        { x: '10%', y: '10%' }, { x: '50%', y: '10%' }, { x: '90%', y: '10%' },
        { x: '10%', y: '50%' }, { x: '50%', y: '50%' }, { x: '90%', y: '50%' },
        { x: '10%', y: '90%' }, { x: '50%', y: '90%' }, { x: '90%', y: '90%' }
    ];

    const [clickCount, setClickCount] = useState(0);
    // Track clicks per current point if we wanted to require multiple clicks per point, 
    // but for simplicity we will just track total clicks or require 1 click per unique point.
    // Better approach: track which points are "done"
    const [completedPoints, setCompletedPoints] = useState([]);

    const handlePointClick = (index) => {
        // Record the calibration point
        // WebGazer records clicks automatically for calibration, but explicit recordScreenPosition can be safer
        // window.webgazer.recordScreenPosition(x, y, 'click'); -> processed automatically on click

        if (!completedPoints.includes(index)) {
            const newCompleted = [...completedPoints, index];
            setCompletedPoints(newCompleted);

            if (newCompleted.length === points.length) {
                // All points clicked
                alert("Calibration Complete!");
                onCalibrationComplete();
            }
        }
    };

    return (
        <div className="calibration-container">
            <div className="calibration-instructions">
                {completedPoints.length === 0 && <p>Click each red dot to calibrate eye tracking.</p>}
                <p>{completedPoints.length} / {points.length} points calibrated</p>
            </div>

            {points.map((pt, index) => (
                <div
                    key={index}
                    className="calibration-point"
                    style={{
                        left: pt.x,
                        top: pt.y,
                        backgroundColor: completedPoints.includes(index) ? '#00ff00' : 'red', // Green if done
                        opacity: completedPoints.includes(index) ? 0.5 : 1
                    }}
                    onClick={() => handlePointClick(index)}
                />
            ))}
        </div>
    );
};

export default Calibration;
