import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './Grid.css';

const Grid = ({ gazePoint }) => {
    const [activeItem, setActiveItem] = useState(null);

    // Define columns with their specific video start times in seconds
    const columns = [
        { id: 0, startTime: 30, label: "0:30", url: "https://www.youtube.com/watch?v=nKWmgsIuXOc" },
        { id: 1, startTime: 120, label: "2:00", url: "https://www.youtube.com/watch?v=VUJbDTIYlM4" },
        { id: 2, startTime: 180, label: "3:00", url: "https://www.youtube.com/watch?v=7hKbyXxWT2k" }
    ];

    useEffect(() => {
        if (!gazePoint.x && !gazePoint.y) return;

        // Use document.elementFromPoint to find the element under the gaze
        const element = document.elementFromPoint(gazePoint.x, gazePoint.y);

        // Check if the element is a grid item or inside one
        const gridItem = element ? element.closest('.grid-item') : null;

        if (gridItem) {
            // Extract interaction ID if needed, or just use the ID attribute
            const id = gridItem.id.replace('grid-item-', '');
            setActiveItem(parseInt(id));
        } else {
            setActiveItem(null);
        }
    }, [gazePoint]);

    return (
        <div className="grid-container">
            {columns.map((col) => (
                <div
                    key={col.id}
                    className={`grid-item ${activeItem === col.id ? 'active' : ''}`}
                    id={`grid-item-${col.id}`}
                >
                    <div className="video-wrapper">
                        <ReactPlayer
                            src={col.url}
                            playing
                            loop
                            muted
                            playsinline
                            width="100%"
                            height="100%"
                            controls={false}
                            style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', objectFit: 'cover' }}
                            onReady={(player) => player.seekTo(col.startTime)}
                            config={{
                                youtube: {
                                    playerVars: {
                                        start: col.startTime,
                                        controls: 0,
                                        showinfo: 0,
                                        rel: 0,
                                        autoplay: 1,
                                        loop: 1,
                                        mute: 1,
                                    }
                                }
                            }}
                        />
                        <div className="overlay" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Grid;
