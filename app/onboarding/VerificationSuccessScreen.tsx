import React, { useState, useEffect } from 'react';

interface VerificationSuccessScreenProps {
  onGoHome?: () => void;
  toastMessage?: string;
}

export const VerificationSuccessScreen: React.FC<VerificationSuccessScreenProps> = ({
  onGoHome,
  toastMessage = 'Email verified successfully!',
}) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleGoHome = () => {
    if (onGoHome) {
      onGoHome();
    }
  };

  return (
    <div style={styles.mobileShell}>
      {/* Success Toast Banner */}
      {showToast && (
        <div style={styles.toastContainer}>
          <div style={styles.toastCard}>
            <span style={styles.toastIcon}>✓</span>
            <span style={styles.toastText}>{toastMessage}</span>
          </div>
        </div>
      )}

      <div style={styles.container}>
        {/* Header / Brand */}
        <div style={styles.topBar}>
          <div style={styles.brandWrapper}>
            <img src="/splash/gateshark-logo-green.png" alt="GateShark Emblem" style={styles.brandIcon} />
            <span style={styles.brandName}>GateShark</span>
          </div>
        </div>

        {/* Content Body */}
        <div style={styles.contentBody}>
          {/* Verified Badge */}
          <div style={styles.badgeWrapper}>
            <img
              src="/onboarding/verified-badge.png"
              alt="Verified Success Checkmark"
              style={styles.badgeImage}
            />
          </div>

          <h1 style={styles.title}>Verified!</h1>
          <p style={styles.subtitle}>
            Voila! Your email has been successfully verified
          </p>

          {/* Go Home Action Button */}
          <button style={styles.primaryBtn} onClick={handleGoHome}>
            Go Home
          </button>

          {/* Legal Footer */}
          <p style={styles.legalFooter}>
            By creating your account, you agree to our{' '}
            <a href="#terms" onClick={(e) => e.preventDefault()} style={styles.legalLink}>
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#privacy" onClick={(e) => e.preventDefault()} style={styles.legalLink}>
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  mobileShell: {
    minHeight: '100vh',
    backgroundColor: '#ffffff',
    color: '#0f172a',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    overflowY: 'auto',
    position: 'relative',
  },
  toastContainer: {
    position: 'fixed',
    top: 'calc(16px + env(safe-area-inset-top, 0px))',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 9999,
    width: 'calc(100% - 32px)',
    maxWidth: '400px',
    animation: 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
  },
  toastCard: {
    backgroundColor: '#064e3b',
    color: '#ffffff',
    padding: '12px 18px',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    boxShadow: '0 10px 25px rgba(6, 78, 59, 0.3)',
    border: '1px solid #059669',
  },
  toastIcon: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#34d399',
  },
  toastText: {
    fontSize: '14px',
    fontWeight: 600,
  },
  container: {
    width: '100%',
    maxWidth: '440px',
    minHeight: '100vh',
    padding: '20px 24px calc(32px + env(safe-area-inset-bottom, 0px))',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    textAlign: 'center',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
    marginBottom: '40px',
    width: '100%',
  },
  brandWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandIcon: {
    width: '28px',
    height: '32px',
    objectFit: 'contain',
  },
  brandName: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#1e293b',
    letterSpacing: '-0.4px',
  },
  contentBody: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    flex: 1,
  },
  badgeWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '32px',
    marginTop: '10px',
  },
  badgeImage: {
    width: '180px',
    height: '180px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#00A843',
    margin: '0 0 10px 0',
    letterSpacing: '-0.4px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#334155',
    margin: '0 0 36px 0',
    lineHeight: '1.4',
    maxWidth: '300px',
  },
  primaryBtn: {
    width: '100%',
    height: '52px',
    backgroundColor: '#347357',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  legalFooter: {
    marginTop: 'auto',
    fontSize: '12px',
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: '1.45',
  },
  legalLink: {
    color: '#64748b',
    textDecoration: 'none',
  },
};
