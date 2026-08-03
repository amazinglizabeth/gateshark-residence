import React, { useState, useRef } from 'react';

interface UploadProfilePhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPhotoSaved: (photoUrl: string) => void;
}

type ModalStep = 'initial' | 'uploading' | 'crop' | 'error' | 'success';

export const UploadProfilePhotoModal: React.FC<UploadProfilePhotoModalProps> = ({
  isOpen,
  onClose,
  onPhotoSaved,
}) => {
  const [step, setStep] = useState<ModalStep>('initial');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('File size larger than 5MB');
  const [straightenValue, setStraightenValue] = useState(50); // Slider range 0 - 100
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const resetModal = () => {
    setStep('initial');
    setUploadProgress(0);
    setPreviewImage(null);
    setStraightenValue(50);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const processFile = (file: File) => {
    // Validate File Size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      setStep('uploading');
      setUploadProgress(40);
      setTimeout(() => {
        setErrorMessage('File size larger than 5MB');
        setStep('error');
      }, 600);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setStep('uploading');
      setUploadProgress(40);
      setTimeout(() => {
        setErrorMessage('Unsupported file format. Please upload .jpg, .png, or .gif');
        setStep('error');
      }, 600);
      return;
    }

    // Start simulated upload progress
    setStep('uploading');
    setUploadProgress(10);

    const imageUrl = URL.createObjectURL(file);
    setPreviewImage(imageUrl);

    let current = 10;
    const interval = setInterval(() => {
      current += 25;
      setUploadProgress(current);
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setStep('crop');
        }, 300);
      }
    }, 200);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSavePhoto = () => {
    const finalPhoto = previewImage || '/home/avatar.png';
    onPhotoSaved(finalPhoto);
    setStep('success');

    setTimeout(() => {
      handleClose();
    }, 1500);
  };

  // Crop inner circle size calculated from slider (55% size at 0 slider, 100% size covering circle at 100)
  const cropSizePercent = 55 + (straightenValue / 100) * 45;

  return (
    <div style={styles.modalOverlay} onClick={handleClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png,.gif"
          onChange={handleFileSelect}
          style={{ display: 'none' }}
        />

        {/* STEP 1: INITIAL UPLOAD VIEW */}
        {step === 'initial' && (
          <>
            <h2 style={styles.title}>Upload Profile Photo</h2>

            <div style={styles.centerIconCircle}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div
              style={{
                ...styles.dropZone,
                borderColor: dragActive ? '#347357' : '#94a3b8',
                backgroundColor: dragActive ? '#f0fdf4' : '#ffffff',
              }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <div style={styles.dropIconWrapper}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
              </div>
              <p style={styles.dropText}>
                <span style={{ color: '#347357', fontWeight: 600 }}>Upload</span> or drag and drop file here
              </p>
            </div>

            <div style={styles.instructionsBlock}>
              <p style={styles.infoLine}>
                <strong>Accepted file types:</strong> .jpg, .jpeg, .png, .gif
              </p>
              <p style={styles.infoLine}>
                <strong>Maximum File Size:</strong> 5 MB
              </p>
              <p style={styles.noteLine}>
                <strong>Note:</strong> For best results upload a square image at least 200 x 200 pixels to avoid low-resolution uploads
              </p>
            </div>

            <div style={styles.btnRow}>
              <button style={styles.cancelBtn} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {/* STEP 2: UPLOADING STATE */}
        {step === 'uploading' && (
          <>
            <h2 style={styles.title}>Upload Profile Photo</h2>

            <div style={styles.centerIconCircle}>
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <div style={styles.dropZoneProgress}>
              <div style={styles.progressBarTrack}>
                <div style={{ ...styles.progressBarFill, width: `${uploadProgress}%` }} />
              </div>
              <p style={styles.progressStatusText}>Upload in progress</p>
            </div>

            <div style={styles.instructionsBlock}>
              <p style={styles.infoLine}>
                <strong>Accepted file types:</strong> .jpg, .jpeg, .png, .gif
              </p>
              <p style={styles.infoLine}>
                <strong>Maximum File Size:</strong> 5 MB
              </p>
              <p style={styles.noteLine}>
                <strong>Note:</strong> For best results upload a square image at least 200 x 200 pixels to avoid low-resolution uploads
              </p>
            </div>

            <div style={styles.btnRow}>
              <button style={styles.cancelBtn} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {/* STEP 3 & 4: CROP PHOTO STATE (50% SIZE AT 0, 100% SIZE COVERING CIRCLE AT 100) */}
        {step === 'crop' && (
          <>
            <h2 style={styles.title}>Crop Photo</h2>

            <div style={styles.cropPreviewContainer}>
              <div style={styles.cropCircleWrapper}>
                {/* Full Dimmed Image in Background */}
                <img
                  src={previewImage || '/home/avatar.png'}
                  alt="Crop Background Dimmed"
                  style={styles.cropBgImage}
                />

                {/* Inner Active Crop Circle with 3x3 Grid */}
                <div
                  style={{
                    ...styles.innerCropCircle,
                    width: `${cropSizePercent}%`,
                    height: `${cropSizePercent}%`,
                  }}
                >
                  <img
                    src={previewImage || '/home/avatar.png'}
                    alt="Crop Preview Bright"
                    style={{
                      ...styles.innerCropImage,
                      transform: `scale(${1 + (straightenValue / 100) * 0.4})`,
                    }}
                  />

                  {/* 3x3 Grid Overlay */}
                  <div style={styles.gridOverlay}>
                    <div style={styles.gridRow}>
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                    </div>
                    <div style={styles.gridRow}>
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                    </div>
                    <div style={styles.gridRow}>
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                      <div style={styles.gridCell} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Straighten / Zoom Slider */}
            <div style={styles.sliderControlSection}>
              <label style={styles.sliderLabel}>Straighten</label>
              <input
                type="range"
                min="0"
                max="100"
                value={straightenValue}
                onChange={(e) => setStraightenValue(Number(e.target.value))}
                style={styles.sliderInput}
              />
            </div>

            <div style={styles.twoBtnRow}>
              <button style={styles.cancelBtnSmall} onClick={handleClose}>
                Cancel
              </button>
              <button style={styles.saveBtnSmall} onClick={handleSavePhoto}>
                Save photo
              </button>
            </div>
          </>
        )}

        {/* STEP 5: UPLOAD ERROR STATE */}
        {step === 'error' && (
          <>
            <h2 style={styles.title}>Upload Profile Photo</h2>

            {/* Center Icon with Red Warning Exclamation Badge */}
            <div style={styles.centerIconCircle}>
              <div style={styles.errorIconWrapper}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.8">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <div style={styles.redBadge}>!</div>
              </div>
            </div>

            <div style={styles.dropZoneProgress}>
              <div style={styles.progressBarTrack}>
                <div style={{ ...styles.progressBarFill, width: '65%', backgroundColor: '#dc2626' }} />
              </div>
              <p style={styles.errorTextDetail}>
                <strong style={{ color: '#dc2626' }}>Upload error:</strong> {errorMessage}
              </p>
              <button
                style={styles.retryBtn}
                onClick={() => {
                  setStep('initial');
                  fileInputRef.current?.click();
                }}
              >
                🔄 Try again
              </button>
            </div>

            <div style={styles.instructionsBlock}>
              <p style={styles.infoLine}>
                <strong>Accepted file types:</strong> .jpg, .jpeg, .png, .gif
              </p>
              <p style={styles.infoLine}>
                <strong>Maximum File Size:</strong> 5 MB
              </p>
              <p style={styles.noteLine}>
                <strong>Note:</strong> For best results upload a square image at least 200 x 200 pixels to avoid low-resolution uploads
              </p>
            </div>

            <div style={styles.btnRow}>
              <button style={styles.cancelBtn} onClick={handleClose}>
                Cancel
              </button>
            </div>
          </>
        )}

        {/* STEP 6: PHOTO UPLOAD SUCCESSFUL STATE */}
        {step === 'success' && (
          <div style={styles.successContainer}>
            <div style={styles.successIconCircle}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3.5">
                <polyline points="20 6 9 17 4 12" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 style={styles.successText}>Photo Upload successful!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    padding: '20px',
    boxSizing: 'border-box',
  },
  modalCard: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '24px',
    padding: '28px 24px 32px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.25)',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 24px 0',
    letterSpacing: '-0.3px',
  },
  centerIconCircle: {
    width: '90px',
    height: '90px',
    borderRadius: '50%',
    border: '1px solid #cbd5e1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '28px',
    position: 'relative',
  },
  errorIconWrapper: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redBadge: {
    position: 'absolute',
    top: '-2px',
    right: '-2px',
    width: '22px',
    height: '22px',
    borderRadius: '50%',
    backgroundColor: '#dc2626',
    color: '#ffffff',
    fontSize: '13px',
    fontWeight: '800',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '2px solid #ffffff',
  },
  dropZone: {
    width: '100%',
    border: '1.5px dashed #94a3b8',
    borderRadius: '12px',
    padding: '28px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.2s ease',
  },
  dropZoneProgress: {
    width: '100%',
    border: '1.5px dashed #94a3b8',
    borderRadius: '12px',
    padding: '28px 16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '20px',
  },
  dropIconWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropText: {
    fontSize: '15px',
    color: '#0f172a',
    margin: 0,
    fontWeight: '500',
  },
  progressBarTrack: {
    width: '100%',
    height: '8px',
    backgroundColor: '#e2e8f0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#16a34a',
    borderRadius: '4px',
    transition: 'width 0.2s ease',
  },
  progressStatusText: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#0f172a',
    margin: 0,
  },
  errorTextDetail: {
    fontSize: '14px',
    color: '#0f172a',
    margin: 0,
  },
  retryBtn: {
    background: 'none',
    border: 'none',
    color: '#0f172a',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '4px',
  },
  instructionsBlock: {
    textAlign: 'left',
    width: '100%',
    marginBottom: '28px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  infoLine: {
    fontSize: '13px',
    color: '#334155',
    margin: 0,
    lineHeight: '1.4',
  },
  noteLine: {
    fontSize: '13px',
    color: '#334155',
    margin: '4px 0 0 0',
    lineHeight: '1.45',
  },
  btnRow: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  cancelBtn: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    height: '46px',
    padding: '0 40px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  cropPreviewContainer: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  cropCircleWrapper: {
    position: 'relative',
    width: '190px',
    height: '190px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.18)',
    backgroundColor: '#000000',
  },
  cropBgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'brightness(0.35)',
  },
  innerCropCircle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '50%',
    overflow: 'hidden',
    transition: 'width 0.1s ease-out, height 0.1s ease-out',
  },
  innerCropImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  gridOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    pointerEvents: 'none',
  },
  gridRow: {
    flex: 1,
    display: 'flex',
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
  },
  gridCell: {
    flex: 1,
    borderRight: '1px solid rgba(255, 255, 255, 0.5)',
  },
  sliderControlSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
    marginBottom: '28px',
  },
  sliderLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#0f172a',
  },
  sliderInput: {
    width: '100%',
    accentColor: '#16a34a',
    cursor: 'pointer',
  },
  twoBtnRow: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
  },
  cancelBtnSmall: {
    backgroundColor: '#dc2626',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    height: '46px',
    padding: '0 28px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  saveBtnSmall: {
    backgroundColor: '#285843',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    height: '46px',
    padding: '0 28px',
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
  },
  successContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px 20px',
    gap: '20px',
  },
  successIconCircle: {
    width: '72px',
    height: '72px',
    borderRadius: '50%',
    backgroundColor: '#15803d',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 6px 18px rgba(21, 128, 61, 0.3)',
  },
  successText: {
    fontSize: '20px',
    fontWeight: '700',
    color: '#15803d',
    margin: 0,
    letterSpacing: '-0.2px',
  },
};
