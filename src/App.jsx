import { useState, useEffect } from 'react'
import './App.css'
import Grid from './components/Grid'
import Crosshair from './components/Crosshair'
import useEyeTracking from './hooks/useEyeTracking'

function App() {
  const gazePoint = useEyeTracking();

  return (
    <div className="app-container">
      {/* <h1>Eye Tracking Grid</h1> Remove header to give max space to grid? Or keep it overlay. */}
      {/* Visual Debug */}
      <div style={{ position: 'absolute', top: 10, left: 10, color: 'white', zIndex: 100, pointerEvents: 'none' }}>
        x: {Math.round(gazePoint.x)}, y: {Math.round(gazePoint.y)}
      </div>
      {/* <div className="instructions">
        Click on the grid squares to calibrate eye tracking. Look at the cursor.
      </div> */}
      <Crosshair x={gazePoint.x} y={gazePoint.y} />
      <Grid gazePoint={gazePoint} />
    </div>
  )
}

export default App
