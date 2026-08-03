import React from 'react';

interface PasswordResetSuccessScreenProps {
  onLoginClick?: () => void;
}

export const PasswordResetSuccessScreen: React.FC<PasswordResetSuccessScreenProps> = ({
  onLoginClick,
}) => {
  return (
    <div style={styles.mobileShell}>
      <div style={styles.container}>
        <div style={styles.contentBodyCenter}>
          {/* Mobile Phone & Key Vector Illustration */}
          <div style={styles.illustrationWrapper}>
            <img src="/onboarding/reset-success.svg" alt="Password Reset Success Illustration" style={styles.illustrationImage} />
          </div>

          {/* Heading */}
          <h1 style={styles.title}>Your password has been reset successfully!</h1>

          {/* Login Action Button */}
          <button style={styles.loginBtn} onClick={onLoginClick}>
            Login
          </button>
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
  },
  container: {
    width: '100%',
    maxWidth: '440px',
    minHeight: '100vh',
    padding: '40px 24px 40px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  contentBodyCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: '40px',
  },
  illustrationWrapper: {
    marginBottom: '28px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationImage: {
    width: '100%',
    maxWidth: '240px',
    maxHeight: '220px',
    objectFit: 'contain',
  },
  title: {
    fontSize: '22px',
    fontWeight: '800',
    color: '#0f172a',
    margin: '0 0 32px 0',
    letterSpacing: '-0.3px',
    lineHeight: '1.4',
    maxWidth: '280px',
  },
  loginBtn: {
    width: '100%',
    height: '50px',
    backgroundColor: '#285843',
    color: '#ffffff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(40, 88, 67, 0.2)',
  },
};
