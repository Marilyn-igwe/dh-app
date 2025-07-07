import React from 'react';
import { useNavigate } from 'react-router-dom';
import keepDistance from '../../../../assets/images/keepDistance.png';
import mouthBreathDistance from '../../../../assets/images/mouthBreathDistance.png';

import {
  containerStyle,
  contentStyle,
  backButtonStyle,
  timerStyle,
  recordButtonStyle,
  stopButtonStyle,
  continueButtonStyle,
  uploadButtonStyle,
} from './style';

const BreathRecordScreen: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleBack = (): void => {
    navigate(-1);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const audioUrl = URL.createObjectURL(file);
      navigate('/upload-complete', {
        state: {
          audioFileUrl: audioUrl,
          filename: file.name,
          nextPage: '/confirmation',
        },
      });
    }
  };

  const handleContinue = () => {
    navigate('/upload-complete', {
      state: {
        audioFileUrl: '',
        filename: 'Breath Recording',
        nextPage: '/confirmation',
      },
    });
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <button onClick={handleBack} style={backButtonStyle} aria-label="Go back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="none"
            stroke="#007bff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <h2 style={{ color: '#007bff', marginBottom: '2rem', textAlign: 'center' }}>Record your breath</h2>

        <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Instructions</h3>

        <p style={{ marginBottom: '1rem' }}>
          <strong>1</strong>. Find a <strong>quiet place</strong> at least <strong>20 ft (6m)</strong> away from others. If you are feeling ill, please sit down.
        </p>
        <img src={keepDistance} alt="Keep distance" style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }} />

        <p style={{ marginBottom: '1rem' }}>
          <strong>2</strong>. Hold the bottom of your device <strong>1-2 ft (30-60 cm)</strong> away from your mouth.
        </p>
        <img src={mouthBreathDistance} alt="Device distance for breath" style={{ width: '100%', borderRadius: '8px', marginBottom: '1.5rem' }} />

        <p style={{ marginBottom: '2rem' }}>
          <strong>3</strong>. Tap record. <strong>Breathe deeply and loudly</strong> into the phone <strong>3</strong> times. Then tap stop.
        </p>

        <div style={timerStyle}>0:00</div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <button style={recordButtonStyle}>Record</button>
          <button style={stopButtonStyle}>Stop</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
          <button onClick={handleContinue} style={continueButtonStyle}>
            Continue
          </button>
          <button onClick={handleUploadClick} style={uploadButtonStyle}>
            Upload your own file
          </button>
          <input
            type="file"
            accept="audio/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: '#999' }}>
          Something wrong? <a href="#" style={{ color: '#007bff' }}>Report an error</a>
        </div>
      </div>
    </div>
  );
};

export default BreathRecordScreen;
