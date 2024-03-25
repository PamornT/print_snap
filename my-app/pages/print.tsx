import React, { useRef, useState } from 'react';

const PrintPage: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [snapshot, setSnapshot] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  const takeSnapshot = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      if (video && canvas) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setSnapshot(dataUrl);
      }
    }
  };

  return (
    <div>
      <h1>Print</h1>
      <p><button onClick={handlePrint}>Print</button></p>

      <div>
        <button onClick={startCamera}>Start Camera</button>
        <br />
        <video ref={videoRef} autoPlay playsInline style={{ maxWidth: '100%' }} />
        <br />
        <button onClick={takeSnapshot}>Take Snapshot</button>
        <br />
        {snapshot && (
          <div>
            <h2>Snapshot</h2>
            <img src={snapshot} alt="Snapshot" />
          </div>
        )}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default PrintPage;