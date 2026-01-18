import { useState, useEffect } from 'react';

const useEyeTracking = () => {
    const [gazePoint, setGazePoint] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const webgazer = window.webgazer;

        if (webgazer) {
            webgazer.setGazeListener((data, clock) => {
                if (data) {
                    setGazePoint({ x: data.x, y: data.y });
                }
            }).begin();

            // Basic configuration
            webgazer.showVideoPreview(false) /* shows the video */
                .showPredictionPoints(true) /* shows the red dot */
                .applyKalmanFilter(true); /* smooths the gaze */
        }

        return () => {
            if (webgazer) {
                webgazer.pause();
            }
        };
    }, []);

    return gazePoint;
};

export default useEyeTracking;
