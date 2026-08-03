import React, { useState } from 'react';

interface VerificationFailedScreenProps {
  onResendEmail?: () => void;
  onContactSupport?: () => void;
}

export const VerificationFailedScreen: React.FC<VerificationFailedScreenProps> = ({
  onResendEmail,
  onContactSupport,
}) => {
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState('');

  const handleResend = () => {
    setResending(true);
    setMessage('');
    setTimeout(() => {
      setResending(false);
      setMessage('A new verification email has been sent!');
      if (onResendEmail) onResendEmail();
    }, 1000);
  };

  const handleSupport = () => {
    if (onContactSupport) {
      onContactSupport();
    } else {
      alert('Connecting to GateShark Residence Support...');
    }
  };

  return (
    <div style={styles.mobileShell}>
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
          <h1 style={styles.title}>Oops! Verification Failed</h1>
          <p style={styles.subtitle}>
            Looks like your verification link has expired or is invalid!
          </p>

          {/* Failed 404 Robot Illustration */}
          <div style={styles.illustrationWrapper}>
            <img
              src="/onboarding/verification-failed.png"
              alt="Verification Failed Robot 404"
              style={styles.illustration}
            />
          </div>

          {/* Resend Action Button */}
          <button style={styles.primaryBtn} onClick={handleResend} disabled={resending}>
            {resending ? 'Sending Email...' : 'Resend verification email'}
          </button>

          {message && <p style={styles.successMessage}>{message}</p>}

          {/* Need Help / Contact Support */}
          <div style={styles.supportSection}>
            <p style={styles.supportLabel}>Need help?</p>
            <button style={styles.supportBtn} onClick={handleSupport}>
              Contact Support
            </button>
          </div>

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
    marginBottom: '28px',
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
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#285843',
    margin: '0 0 10px 0',
    letterSpacing: '-0.3px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#334155',
    margin: '0 0 20px 0',
    lineHeight: '1.4',
    maxWidth: '320px',
  },
  illustrationWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '24px',
  },
  illustration: {
    maxWidth: '280px',
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
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
    marginBottom: '16px',
  },
  successMessage: {
    fontSize: '13px',
    color: '#347357',
    margin: '0 0 12px 0',
    fontWeight: '500',
  },
  supportSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    marginBottom: '28px',
  },
  supportLabel: {
    fontSize: '15px',
    color: '#334155',
    margin: 0,
  },
  supportBtn: {
    background: 'none',
    border: 'none',
    color: '#701A40',
    fontWeight: '700',
    fontSize: '16px',
    cursor: 'pointer',
    padding: '4px 8px',
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
