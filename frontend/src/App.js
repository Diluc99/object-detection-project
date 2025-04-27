import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [captureInterval, setCaptureInterval] = useState(null);
  const [status, setStatus] = useState('Ready');

  // Start webcam when component mounts
  useEffect(() => {
    startWebcam();
    return () => {
      stopCapture();
      stopWebcam();
    };
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing webcam:", err);
      setStatus('Error accessing webcam');
    }
  };

  const stopWebcam = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };

  const captureFrame = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append('image', blob, 'webcam-capture.jpg');

      setStatus('Processing...');
      
      try {
        // Send to backend for processing
        const response = await axios.post('http://localhost:5000/detect', formData);
        
        // Update detections state
        setDetections(response.data.detectedObjects);
        
        // Draw bounding boxes
        drawDetectionBoxes(response.data.detectedObjects);
        
        setStatus('Detection complete');
      } catch (error) {
        console.error('Error detecting objects:', error);
        setStatus('Detection failed');
      }
    }, 'image/jpeg');
  };

  const drawDetectionBoxes = (objects) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear previous drawings
    context.clearRect(0, 0, width, height);
    
    // Redraw the current frame
    context.drawImage(videoRef.current, 0, 0, width, height);
    
    // Draw bounding boxes for each object
    objects.forEach(object => {
      // Since AWS Rekognition doesn't return exact bounding boxes in this mode,
      // we'll just highlight the entire frame and show labels
      context.strokeStyle = '#FF0000';
      context.lineWidth = 3;
      context.strokeRect(5, 5, width - 10, height - 10);
      
      // Add label at the top
      context.fillStyle = '#FF0000';
      context.font = '16px Arial';
      const y = 25;
      context.fillText(`${object.Name} (${Math.round(object.Confidence)}%)`, 10, y);
    });
  };

  const startCapture = () => {
    setIsCapturing(true);
    setStatus('Starting capture...');
    
    // Capture frame immediately
    captureFrame();
    
    // Then set interval for continuous capture
    const interval = setInterval(captureFrame, 3000); // Every 3 seconds
    setCaptureInterval(interval);
  };

  const stopCapture = () => {
    if (captureInterval) {
      clearInterval(captureInterval);
      setCaptureInterval(null);
    }
    setIsCapturing(false);
    setStatus('Capture stopped');
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Real-Time Object Detection</h1>
      
      <div className="row">
        <div className="col-md-8">
          <div className="position-relative">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="border rounded mb-3 d-none"
              style={{ width: '100%' }}
            />
            <canvas 
              ref={canvasRef} 
              className="border rounded mb-3"
              style={{ width: '100%' }}
            />
            <div className="status-badge">
              {status}
            </div>
          </div>
          
          <div className="d-flex justify-content-center mb-4">
            {!isCapturing ? (
              <button className="btn btn-primary me-2" onClick={startCapture}>
                Start Detection
              </button>
            ) : (
              <button className="btn btn-danger me-2" onClick={stopCapture}>
                Stop Detection
              </button>
            )}
            <button className="btn btn-secondary" onClick={captureFrame}>
              Capture Single Frame
            </button>
          </div>
        </div>
        
        <div className="col-md-4">
          <div className="card">
            <div className="card-header bg-dark text-white">
              Detected Objects
            </div>
            <div className="card-body" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              {detections.length > 0 ? (
                <ul className="list-group">
                  {detections.map((object, index) => (
                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                      {object.Name}
                      <span className="badge bg-primary rounded-pill">
                        {Math.round(object.Confidence)}%
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No objects detected yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;